const express = require("express");
const  BooksModels  = require("../models/Books");
const booksRoutes = express.Router();
const authenticate = require("../Middlewares/authMiddleware");



booksRoutes.get("/myall_books", authenticate, async (req, res) => {
  try {
    const books = await BooksModels.find({ postedBy: req.user.userId });
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching your books", error: error.message });
  }
});


booksRoutes.post("/add", authenticate, async (req, res) => {
  try {
    const { title, author, coverImage, availability } = req.body;

    // Check if book already exists for this user
    const existingBook = await BooksModels.findOne({
      title,
      author,
      postedBy: req.user.userId
    });

    if (existingBook) {
      return res.status(400).json({ message: "This book is already in your list" });
    }

    const newBook = new BooksModels({
      title,
      author,
      coverImage,
      availability: availability || true,
      postedBy: req.user.userId,
      readingStatus: "not-started",
      rating: 0
    });

    await newBook.save();
    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
});

booksRoutes.put("/:id", authenticate, async (req, res) => {
  try {
    const { title, author, coverImage, availability, readingStatus, rating } = req.body;

    const book = await BooksModels.findOne({
      _id: req.params.id,
      postedBy: req.user.userId,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found or you don't have permission" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.coverImage = coverImage || book.coverImage;
    book.availability = availability !== undefined ? availability : book.availability;
    book.readingStatus = readingStatus || book.readingStatus;
    book.rating = rating !== undefined ? rating : book.rating;

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
});

booksRoutes.delete("/:id", authenticate, async (req, res) => {
  try {
    const book = await BooksModels.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.user.userId,
    });

    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or you don't have permission" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
});


booksRoutes.get("/", async (req, res) => {
  try {
    const books = await BooksModels.find().populate("postedBy", "name email");
    
    
    const groupedBooks = {};
    books.forEach(book => {
      const key = `${book.title} - ${book.author}`;
      if (!groupedBooks[key]) {
        groupedBooks[key] = book;
      }
    });

    
    const uniqueBooks = Object.values(groupedBooks);

    res.status(200).json(uniqueBooks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
});

booksRoutes.get("/:id", async (req, res) => {
  try {
    const book = await BooksModels.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: error.message });
  }
});
module.exports = { booksRoutes };
