export declare const Status: {
    readonly ACTIVE: "ACTIVE";
    readonly REPLIED: "REPLIED";
    readonly RESPONDED_BACK: "RESPONDED_BACK";
    readonly FAILED: "FAILED";
    readonly STOPPED: "STOPPED";
    readonly BOUNCED: "BOUNCED";
};
export type Status = (typeof Status)[keyof typeof Status];
export declare const EmailLogStatus: {
    readonly SCHEDULED: "SCHEDULED";
    readonly PROCESSING: "PROCESSING";
    readonly SENT: "SENT";
    readonly FAILED: "FAILED";
};
export type EmailLogStatus = (typeof EmailLogStatus)[keyof typeof EmailLogStatus];
export declare const CampaignStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly DRAFT: "DRAFT";
    readonly PAUSED: "PAUSED";
    readonly COMPLETED: "COMPLETED";
};
export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];
//# sourceMappingURL=enums.d.ts.map