import eventbridge from "./eventbridge.js";
import sendgrid from "./sendgrid.js";

export { eventbridge, sendgrid };

export const WEBHOOK_EVENT_TYPE = process.env.WEBHOOK_EVENT_TYPE;
export const WEBHOOK_SOURCE = process.env.WEBHOOK_SOURCE;
export const EMAIL_ORIGIN = process.env.EMAIL_ORIGIN;
