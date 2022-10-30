import Test from './models/Test';

export default interface TestGateway {
  getAllTests(): Promise<Test[]>;
}
