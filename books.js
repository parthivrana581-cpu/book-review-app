const express = require('express');
const { books } = require('../data/books');

const router = express.Router();

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Search book by ISBN
router.get('/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// Search books by title or author
router.get('/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const result = books.filter(b =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query)
    );
    res.json(result);
});

module.exports = router;