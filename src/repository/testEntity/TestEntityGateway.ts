import Test from 'src/core/common/test/models/Test';
import TestGateway from 'src/core/common/test/TestGateway';

export default class TestEntityGateway implements TestGateway {
  getAllTests(): Promise<Test[]> {
    console.log('Implement method here.');
    return null;
  }
}
