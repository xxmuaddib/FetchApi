import FetchApi from './FetchApi';

export default class Example {
  async getSampleRequest() {
    const testProperty1 = 1;
    const testProperty2 = 2;
    try {
      const result = await FetchApi.get(`testPath?testProperty1=${testProperty1}&testProperty2=${testProperty2}`);
      // Do something with result.
    } catch (e) {
      // Do something with catch
    }
  }
  async postSampleRequest() {
    const testProperty1 = 1;
    const testProperty2 = 2;
    try {
      const result = await FetchApi.post('testPath', {testProperty1, testProperty2});
      // Do something with result.
    } catch (e) {
      // Do something with catch
    }
  }
}