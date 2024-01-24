import querystring from "querystring";
import { EventBridgeClient } from "@aws-sdk/client-eventbridge";
import { composeRes } from "../../helpers/index.js";
import {
  eventbridge,
  WEBHOOK_EVENT_TYPE,
  WEBHOOK_SOURCE,
} from "../../config/index.js";
import { EBClient } from "../../libs/index.js";

const client = new EventBridgeClient(eventbridge.region);

/**
 * @typedef {import('../../libs/index').EBClient}
 */
export async function webhook(event) {
  const { body = null } = event || {};
  const parsedBody = querystring.parse(body);

  try {
    const { name, email, subject, message } = parsedBody;
    const form = { name, email, subject, message };
    const eb = new EBClient(client, eventbridge.eventBusArn);

    const webhookEvent = {
      type: WEBHOOK_EVENT_TYPE,
      source: WEBHOOK_SOURCE,
      data: form,
    };

    await eb.send(webhookEvent);

    return composeRes(204);
  } catch (error) {
    return composeRes(400, error);
  }
}
