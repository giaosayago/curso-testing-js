const request = require('supertest');
const createApp = require('../src/app');
const Test = require('supertest/lib/test');

describe('E2E Test for Hello Endpoint', () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /api/hello', () => {
    test('should return Hello World', () => request(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.text).toBe('Hello World!');
      }));
  });
});
