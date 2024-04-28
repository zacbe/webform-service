import sgMail from "@sendgrid/mail";

/**
 * @module SGClient
 */
export default class SGClient {
  constructor(config) {
    this.apiKey = config.apikey;
  }

  /**
   * Process emails based on notification_type using SG client
   *
   * @async
   * @method send
   * @param {object} event
   * @returns {Promise<import("@sendgrid/mail").ClientResponse}
   */
  async send(event) {
    const { target, origin, form } = event;

    try {
      sgMail.setApiKey(this.apiKey);
      const msg = {
        to: target,
        from: origin,
        subject: "Sending with SendGrid is Fun",
        text: JSON.stringify(form),
      };

      return sgMail.send(msg);
    } catch (error) {
      console.error(`Error happend in SendGridClient send`);
      console.error(error);
      throw error;
    }
  }
}
