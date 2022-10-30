export default class NotFoundError extends Error {
  id: string;
  status: number;
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.id = NotFoundError.name;
    this.status = 404;
    this.code = code;
  }
}
