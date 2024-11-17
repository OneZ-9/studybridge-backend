export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // to only send error masseges to client if they are operational errors

    //  To find where error happend
    Error.captureStackTrace(this, this.constructor);
  }
}
