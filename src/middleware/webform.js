// import core
import middy from "@middy/core";

// import middlewares
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpUrlEncodeBodyParser from "@middy/http-urlencode-body-parser";

export const middleware = (fn) => {
  return middy(fn)
    .use(httpHeaderNormalizer())
    .use(httpUrlEncodeBodyParser())
    .use(httpErrorHandler());
};
