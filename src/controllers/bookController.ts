import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Book from "../models/book";

// Validation middleware for creating a book
const validateCreateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("publishedDate")
    .isDate()
    .withMessage("Published date must be a valid date"),
  body("ISBN")
    .notEmpty()
    .withMessage("ISBN is required")
    .isLength({ min: 10, max: 13 })
    .withMessage("ISBN must be between 10 and 13 characters"),
];

// Validation middleware for updating a book
const validateUpdateBook = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("author").optional().notEmpty().withMessage("Author cannot be empty"),
  body("publishedDate")
    .optional()
    .isDate()
    .withMessage("Published date must be a valid date"),
  body("ISBN")
    .optional()
    .notEmpty()
    .withMessage("ISBN cannot be empty")
    .isLength({ min: 10, max: 13 })
    .withMessage("ISBN must be between 10 and 13 characters"),
];

// Middleware to check validation results
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new book
export const createBook = [
  ...validateCreateBook,
  validate,
  async (req: Request, res: Response) => {
    try {
      const { title, author, publishedDate, ISBN } = req.body;
      const book = new Book({ title, author, publishedDate, ISBN });
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
];

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a book
export const updateBook = [
  ...validateUpdateBook,
  validate,
  async (req: Request, res: Response) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
];

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update book cover image
export const updateBookCover = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (req.file) {
      book.coverImage = req.file.path;
      await book.save();
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
