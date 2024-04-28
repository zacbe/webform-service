import { SGClient } from "../../libs/index.js";
import { sqsWorkerMiddleware as middleware } from "../../middleware/index.js";
import { sendgrid as config } from "../../config/index.js";

const sg = new SGClient(config);

async function baseHandler(event) {
  const { Records } = event;
  const batch = Records.map((record) => {
    return sg.send(record.body.detail);
  });

  return Promise.allSettled(batch);
}

const handler = middleware(baseHandler);
export { handler };
