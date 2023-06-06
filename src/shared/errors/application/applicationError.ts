/**
 * Base error class for the application to extend from
 *
 * @format
 */

// Interface for status codes and their corresponding status messages
interface IStatusCodes {
  [code: number]: string;
}

// Status codes and their corresponding status messages
const statusCodes: IStatusCodes = {
  500: 'Internal Server Error',
  422: 'Unprocessable Entity',
};

class ApplicationError extends Error {
  // Error code
  code: number;

  // Error status
  status: string;

  /**
   * Application error
   * @param message Error message
   * @param code Error code
   */
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.status = statusCodes[code];
  }
}

export default ApplicationError;
