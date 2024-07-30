import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookCover,
} from "../controllers/bookController";
import upload from "../config/multerConfig";

const router = Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.patch("/cover-image/:id", upload.single("coverImage"), updateBookCover);

export default router;
