import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Account: "Account";
    readonly Session: "Session";
    readonly VerificationToken: "VerificationToken";
    readonly Campaign: "Campaign";
    readonly Company: "Company";
    readonly Contact: "Contact";
    readonly Template: "Template";
    readonly CampaignTemplate: "CampaignTemplate";
    readonly Preferences: "Preferences";
    readonly EmailLog: "EmailLog";
    readonly EmailSettings: "EmailSettings";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly emailVerified: "emailVerified";
    readonly image: "image";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly provider: "provider";
    readonly providerAccountId: "providerAccountId";
    readonly refresh_token: "refresh_token";
    readonly access_token: "access_token";
    readonly expires_at: "expires_at";
    readonly token_type: "token_type";
    readonly scope: "scope";
    readonly id_token: "id_token";
    readonly session_state: "session_state";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly sessionToken: "sessionToken";
    readonly userId: "userId";
    readonly expires: "expires";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const VerificationTokenScalarFieldEnum: {
    readonly identifier: "identifier";
    readonly token: "token";
    readonly expires: "expires";
};
export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];
export declare const CampaignScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly status: "status";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum];
export declare const CompanyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const ContactScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly userId: "userId";
    readonly companyId: "companyId";
    readonly campaignId: "campaignId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum];
export declare const TemplateScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly subject: "subject";
    readonly body: "body";
    readonly attachments: "attachments";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum];
export declare const CampaignTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly campaignId: "campaignId";
    readonly templateId: "templateId";
    readonly sequence: "sequence";
    readonly delay: "delay";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CampaignTemplateScalarFieldEnum = (typeof CampaignTemplateScalarFieldEnum)[keyof typeof CampaignTemplateScalarFieldEnum];
export declare const PreferencesScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly stopAllCompanyMailsOnReply: "stopAllCompanyMailsOnReply";
    readonly timezone: "timezone";
    readonly mailSendingTime: "mailSendingTime";
    readonly sendOnWeekends: "sendOnWeekends";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PreferencesScalarFieldEnum = (typeof PreferencesScalarFieldEnum)[keyof typeof PreferencesScalarFieldEnum];
export declare const EmailLogScalarFieldEnum: {
    readonly id: "id";
    readonly campaignId: "campaignId";
    readonly templateId: "templateId";
    readonly contactId: "contactId";
    readonly sequence: "sequence";
    readonly status: "status";
    readonly scheduledAt: "scheduledAt";
    readonly sentAt: "sentAt";
    readonly messageId: "messageId";
    readonly errorMessage: "errorMessage";
    readonly retryCount: "retryCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmailLogScalarFieldEnum = (typeof EmailLogScalarFieldEnum)[keyof typeof EmailLogScalarFieldEnum];
export declare const EmailSettingsScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly fromName: "fromName";
    readonly fromEmail: "fromEmail";
    readonly smtpHost: "smtpHost";
    readonly smtpPort: "smtpPort";
    readonly smtpUser: "smtpUser";
    readonly smtpPassword: "smtpPassword";
    readonly imapHost: "imapHost";
    readonly imapPort: "imapPort";
    readonly imapUser: "imapUser";
    readonly imapPassword: "imapPassword";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmailSettingsScalarFieldEnum = (typeof EmailSettingsScalarFieldEnum)[keyof typeof EmailSettingsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map