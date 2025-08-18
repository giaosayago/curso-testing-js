const request = require('supertest');
const { MongoClient } = require('mongodb');
const createApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('E2E Test for books', () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3002);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
  });

  describe('GET /api/v1/books', () => {
    test('should return collection of books', async () => {
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Test Book2',
          author: 'Test Author2',
          year: 2022,
        },
        {
          name: 'Test Book1',
          author: 'Test Author',
          year: 2021,
        },
      ]);

      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toBe(seedData.insertedCount);
        });
    });
  });
});
