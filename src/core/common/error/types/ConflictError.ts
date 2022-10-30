export default class ConflictError extends Error {
  id: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.id = ConflictError.name;
    this.status = 409;
  }
}
