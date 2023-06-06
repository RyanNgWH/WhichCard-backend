/**
 * Methods for handling errors
 *
 * @format
 */

import ApplicationError from './application/applicationError';

// Error with message and code
type ErrorWithMessageAndCode = {
  message: string;
  code: number;
};

/**
 * Checks if the error has a message and code
 * @param error Error to check
 * @returns Whether the error has a message
 */
function isErrorWithMessageAndCode(
  error: unknown,
): error is ErrorWithMessageAndCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error &&
    typeof (error as Record<string, unknown>).message === 'string' &&
    typeof (error as Record<string, unknown>).code === 'number'
  );
}

/**
 * Convert an error to an application error
 * @param maybeError Error to convert
 * @returns Application error
 */
function toApplicationError(maybeError: unknown): ApplicationError {
  if (isErrorWithMessageAndCode(maybeError))
    return new ApplicationError(maybeError.message, maybeError.code);

  try {
    return new ApplicationError(JSON.stringify(maybeError), 500);
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new ApplicationError(String(maybeError), 500);
  }
}

export default toApplicationError;
