/**
 * Composes a response object with the given status code and optional body.
 *
 * @function composeRes
 * @param {number} code - The HTTP status code for the response.
 * @param {object|null} [body] - The optional body content of the response.
 * @returns {object} The composed response object.
 * @throws {TypeError} Throws a TypeError if the code parameter is not a number.
 */
export function composeRes(code, body = null) {
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

/**
 * @function validateEmail
 * @param {string} email
 * @returns {Boolean}
 */
export function validateEmail(email) {
  // Regular expression pattern for validating email
  const regex = /^[\w.+%-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

export function on(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}
