export class UnsupportedMediaTypeError extends Error {
  constructor(mediaType: string) {
    super(`Unsupported media type: ${mediaType}`);
    this.name = 'UnsupportedMediaTypeError';
    Object.setPrototypeOf(this, UnsupportedMediaTypeError.prototype);
  }
}
