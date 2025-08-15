const { generateManyBook } = require('../fakes/book.fake');
const BooksService = require('./books.service');

const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('Book Service', () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe('Test getBooks', () => {
    test('it should return an array of books', async () => {
      const fakeBooks = generateManyBook(10);
      mockGetAll.mockResolvedValue(fakeBooks);
      const books = await service.getBooks({});
      // eslint-disable-next-line no-console
      console.log(books);
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('it should return an array of books', async () => {
      const fakeBooks = generateManyBook(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      const books = await service.getBooks({});
      // eslint-disable-next-line no-console
      console.log(books);
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
