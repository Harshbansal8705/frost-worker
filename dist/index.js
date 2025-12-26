import prisma from './lib/prisma.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
async function processEmailQueue() {
    console.log('[Worker] Checking for scheduled emails...');
    try {
        const logs = await prisma.emailLog.findMany({
            where: {
                status: 'SCHEDULED',
                scheduledAt: {
                    lte: new Date(),
                },
            },
            include: {
                campaign: {
                    include: {
                        user: {
                            include: {
                                emailSettings: true,
                            },
                        },
                    },
                },
                template: true,
                contact: {
                    include: {
                        company: true
                    }
                },
            },
        });
        if (logs.length === 0) {
            console.log('No emails to send.');
            return;
        }
        console.log(`[Worker] Found ${logs.length} emails to send.`);
        for (const log of logs) {
            await processSingleLog(log);
        }
    }
    catch (error) {
        console.error('[Worker] Error processing queue:', error);
    }
}
async function processSingleLog(log) {
    const { campaign, template, contact, sequence } = log;
    const user = campaign.user;
    const emailSettings = user.emailSettings;
    if (!emailSettings) {
        console.error(`[Worker] No email settings for user ${user.id}. Marking log ${log.id} as FAILED.`);
        await prisma.emailLog.update({
            where: { id: log.id },
            data: { status: 'FAILED', errorMessage: 'No email settings found for user.' },
        });
        return;
    }
    if (!template) {
        console.error(`[Worker] Template deleted or missing for log ${log.id}. Marking as FAILED.`);
        await prisma.emailLog.update({
            where: { id: log.id },
            data: { status: 'FAILED', errorMessage: 'Template not found.' },
        });
        return;
    }
    if (!contact) {
        console.error(`[Worker] Contact missing for log ${log.id}. Marking as FAILED.`);
        await prisma.emailLog.update({
            where: { id: log.id },
            data: { status: 'FAILED', errorMessage: 'Contact not found.' },
        });
        return;
    }
    // Update status to PROCESSING
    await prisma.emailLog.update({
        where: { id: log.id },
        data: { status: 'PROCESSING' }
    });
    // Prepare email content
    const subject = replaceVariables(template.subject, contact);
    const body = replaceVariables(template.body, contact);
    // Setup transporter
    const transporter = nodemailer.createTransport({
        host: emailSettings.smtpHost,
        port: emailSettings.smtpPort,
        secure: emailSettings.smtpPort === 465, // typical secure port
        auth: {
            user: emailSettings.smtpUser,
            pass: emailSettings.smtpPassword || undefined,
        },
    });
    try {
        const info = await transporter.sendMail({
            from: `"${emailSettings.fromName || user.name}" <${emailSettings.fromEmail || user.email}>`,
            to: contact.email,
            subject: subject,
            html: body,
        });
        console.log(`[Worker] Email sent: ${info.messageId} (Log ID: ${log.id})`);
        // Update log to SENT
        await prisma.emailLog.update({
            where: { id: log.id },
            data: {
                status: 'SENT',
                sentAt: new Date(),
                messageId: info.messageId,
            },
        });
        // Schedule next email in sequence
        await scheduleNextEmail(campaign.id, contact.id, sequence);
    }
    catch (error) {
        console.error(`[Worker] Failed to send email (Log ID: ${log.id}):`, error);
        await prisma.emailLog.update({
            where: { id: log.id },
            data: {
                status: 'FAILED',
                errorMessage: error.message || 'Unknown error',
                retryCount: { increment: 1 },
            },
        });
    }
}
async function scheduleNextEmail(campaignId, contactId, currentSequence) {
    const nextSequence = currentSequence + 1;
    // Find the template for the next sequence
    const nextCampaignTemplate = await prisma.campaignTemplate.findFirst({
        where: {
            campaignId: campaignId,
            sequence: nextSequence
        }
    });
    if (!nextCampaignTemplate) {
        return;
    }
    const delayDays = nextCampaignTemplate.delay || 1;
    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + delayDays);
    console.log(`[Worker] Scheduling next email (Seq: ${nextSequence}) for Contact ${contactId} at ${scheduledAt.toISOString()}`);
    await prisma.emailLog.create({
        data: {
            campaignId: campaignId,
            templateId: nextCampaignTemplate.templateId,
            contactId: contactId,
            sequence: nextSequence,
            status: 'SCHEDULED',
            scheduledAt: scheduledAt,
        }
    });
}
function replaceVariables(text, contact) {
    let result = text;
    result = result.replace(/{{\s*firstName\s*}}/g, contact.name.split(' ')[0]);
    result = result.replace(/{{\s*name\s*}}/g, contact.name);
    result = result.replace(/{{\s*email\s*}}/g, contact.email);
    if (contact.company) {
        result = result.replace(/{{\s*company\s*}}/g, contact.company.name);
        result = result.replace(/{{\s*companyName\s*}}/g, contact.company.name);
    }
    return result;
}
async function main() {
    console.log('[Worker] Service started.');
    while (true) {
        await processEmailQueue();
        // Check every 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }
}
main().catch((e) => {
    console.error('[Worker] Fatal error:', e);
    process.exit(1);
});
//# sourceMappingURL=index.js.map