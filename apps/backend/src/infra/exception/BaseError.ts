export class BaseError extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  public toJSON(): {
    statusCode?: number;
    message: string;
  } {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
