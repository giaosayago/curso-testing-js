const mockGetAll = jest.fn();

const request = require('supertest');
const createApp = require('../src/app');
const { generateManyBook } = require('../src/fakes/book.fake');

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('E2E Test for books', () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3002);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /api/v1/books', () => {
    test('should return collection of books', () => {
      const fakeBooks = generateManyBook(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toBe(3);
        });
    });
  });
});
