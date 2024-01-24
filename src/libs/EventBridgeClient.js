/* eslint-disable curly */
import { PutEventsCommand } from "@aws-sdk/client-eventbridge";
import _ from "lodash";
const { isEmpty } = _;

/**
 * @module EBClient
 */
export default class EBClient {
  constructor(client, config) {
    this.client = client;
    this.eventBusArn = config;
  }

  /**
   * Asynchronously sends an event to the EventBridge.
   *
   * @method send
   * @param {object} event - The event object to be processed.
   * @throws {Error} Throws an error if no event is provided.
   * @returns {Promise<object>} A promise that resolves with the result of the event submission.
   * @throws {Error} Throws an error if an issue occurs during the event submission.
   */
  async send(event = null) {
    if (!event) throw new Error("Nothing to process");
    const input = this.composeInput(event);

    try {
      const command = new PutEventsCommand({ Entries: [input] });
      return this.client.send(command);
    } catch (error) {
      console.error(`Error happend in EBClient send`);
      console.error(error);
      throw error;
    } finally {
      this.client.destroy();
    }
  }

  /**
   * Asynchronously sends a batch of events to the EventBridge.
   *
   * @method sendBatch
   * @param {object[]} events - An array of event objects to be processed.
   * @throws {Error} Throws an error if the array of events is empty.
   * @returns {Promise<object>} A promise that resolves with the result of the batch event submission.
   * @throws {Error} Throws an error if an issue occurs during the batch event submission.
   */
  async sendBatch(events = []) {
    if (isEmpty(events)) throw new Error("Nothing to process");
    const entries = events.map((e) => this.composeInput(e));

    try {
      const command = new PutEventsCommand({ Entries: entries });
      return this.client.send(command);
    } catch (error) {
      console.error(`Error happend in EBClient sendBatch`);
      console.error(error);
      throw error;
    } finally {
      this.client.destroy();
    }
  }

  /**
   * @private
   * @method composeInput
   * @param {string} type - Event type
   * @param {string} source - Event source
   * @param {object} data
   * @returns {object}
   */
  composeInput({ type, source, data = null }) {
    return {
      Detail: JSON.stringify(data),
      DetailType: type,
      EventBusName: this.eventBusArn,
      Source: source,
      Time: new Date(),
    };
  }
}
