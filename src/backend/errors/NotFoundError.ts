import { ErrorForClient } from "../middlewares/clientErrorHandler.middleware";

/**
 * Class definition for NotFoundError
 */
export class NotFoundError extends ErrorForClient {
  /**
   * Constuctor of NotFoundError Object
   *
   * This error is meant to be thrown when a request is made to an "not existing" resource.
   * @param message Message to be sent to the client of the request. Default is "Not Found!".
   */
  constructor(message?: string) {
    super(404, message ?? "Not Found");
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
