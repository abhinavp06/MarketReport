/* eslint-disable @typescript-eslint/ban-types */
import rescue from './rescue';

const swallow =
  (type: string) =>
  (fail: Function) =>
  (fn: Function) =>
  async (...args: any) => {
    try {
      return await fn(...args);
    } catch (error) {
      rescue(error as Error, type);
      return fail(error);
    }
  };

export default swallow;
