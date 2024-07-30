import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import path from "path";

beforeAll(async () => {
  const MONGODB_URI = process.env.MONGODB_URI as string;

  jest.setTimeout(30000);
  await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Book Management API", () => {
  let bookId: string;

  it("should create a new book", async () => {
    const res = await request(app).post("/books").send({
      title: "Test Book",
      author: "Test Author",
      publishedDate: "2023-07-15",
      ISBN: "1234567890123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    bookId = res.body._id;
  });

  it("should get all books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a single book by ID", async () => {
    const res = await request(app).get(`/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body._id).toEqual(bookId);
  });

  it("should update a book", async () => {
    const res = await request(app).put(`/books/${bookId}`).send({
      title: "Updated Test Book",
      author: "Updated Test Author",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toEqual("Updated Test Book");
  });

  it("should update book cover image", async () => {
    const imagePath = path.resolve(
      __dirname,
      "..",
      "uploads",
      "test-image.jpg"
    );
    const res = await request(app)
      .patch(`/books/cover-image/${bookId}`)
      .attach("coverImage", imagePath);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("coverImage");
  });
  it("should delete a book", async () => {
    const res = await request(app).delete(`/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Book deleted successfully");
  });
});
