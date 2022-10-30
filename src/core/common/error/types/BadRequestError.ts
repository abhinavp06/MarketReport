export default class BadRequestError extends Error {
  id: string;
  status: number;
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.id = BadRequestError.name;
    this.status = 400;
    this.code = code;
  }
}
