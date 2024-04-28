// import core
import middy from "@middy/core";

// import middlewares
import httpErrorHandler from "@middy/http-error-handler";
import eventNormalizerMiddleware from "@middy/event-normalizer";
import sqsPartialBatchFailure from "@middy/sqs-partial-batch-failure";

export const middleware = (fn) => {
  return middy(fn)
    .use(eventNormalizerMiddleware())
    .use(sqsPartialBatchFailure())
    .use(httpErrorHandler());
};
