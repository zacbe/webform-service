import createHttpError from "http-errors";
import { EventBridgeClient } from "@aws-sdk/client-eventbridge";
import { composeRes } from "../../helpers/index.js";
import { EBClient } from "../../libs/index.js";
import { webformMiddleware as middleware } from "../../middleware/index.js";
import { validateEmail } from "../../helpers/index.js";
import {
  eventbridge,
  WEBHOOK_EVENT_TYPE,
  WEBHOOK_SOURCE,
  EMAIL_ORIGIN,
} from "../../config/index.js";

const client = new EventBridgeClient(eventbridge.region);

/**
 * @typedef {import('../../libs/index').EBClient}
 */
async function baseHandler(event) {
  try {
    const {
      body,
      pathParameters: { target },
    } = event;

    if (!validateEmail(target)) {
      console.info("Invalid email format:", target);
      throw new Error("invalid email");
    }

    const eb = new EBClient(client, eventbridge.eventBusArn);

    const webhookEvent = {
      type: WEBHOOK_EVENT_TYPE,
      source: WEBHOOK_SOURCE,
      data: { target, origin: EMAIL_ORIGIN, form: body },
    };

    await eb.send(webhookEvent);

    return composeRes(200, { message: "Succesful" });
  } catch (e) {
    throw createHttpError(400, e);
  }
}

const handler = middleware(baseHandler);
export { handler };
