const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String, required: true },
  availability: { type: Boolean, required: true, default: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  readingStatus: {
    type: String,
    enum: ["not-started", "reading", "completed"],
    default: "not-started"
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
});

const BooksModels = mongoose.model("book", BookSchema);

module.exports = BooksModels;
