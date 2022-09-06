import { ErrorForClient } from "../middlewares/clientErrorHandler.middleware";

/**
 * Class that define ApiError Object
 */
export class ApiError extends ErrorForClient {
  /**
   * Constuctor of ApiError Object
   *
   * @param code The staus code that will be injecteed in the HTTP response
   * @param message The message injectd in the body of the HTTP response.
   */
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized() {
    return new ApiError(401, "Forbidden access, you must be authorized.");
  }
}
