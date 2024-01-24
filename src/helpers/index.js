/**
 * Composes a response object with the given status code and optional body.
 *
 * @param {number} code - The HTTP status code for the response.
 * @param {object|null} [body] - The optional body content of the response.
 * @returns {object} The composed response object.
 * @throws {TypeError} Throws a TypeError if the code parameter is not a number.
 */
function composeRes(code, body = null) {
  let responseBody = body;

  if (body instanceof Error) {
    responseBody = {
      message: body.message,
      stack: body.stack,
    };
  }

  return {
    statusCode: code,
    ...(responseBody ? { body: JSON.stringify(responseBody) } : {}),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export { composeRes };
