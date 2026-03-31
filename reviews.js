const express = require('express');
const { reviews, books } = require('../data/books');
const { authenticateJWT } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get reviews for a book
router.get('/:isbn', (req, res) => {
    const bookReviews = reviews.filter(r => r.bookIsbn === req.params.isbn);
    res.json(bookReviews);
});

// Add a review (authenticated)
router.post('/:isbn', authenticateJWT, (req, res) => {
    const { comment, rating } = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = {
        id: uuidv4(),
        bookIsbn: book.isbn,
        userId: req.user.id,
        username: req.user.username,
        comment,
        rating
    };
    reviews.push(review);
    book.reviews.push(review.id);

    res.json({ message: "Review added", review });
});

// Update review (only owner)
router.put('/:id', authenticateJWT, (req, res) => {
    const review = reviews.find(r => r.id === req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId !== req.user.id) return res.status(403).json({ message: "Cannot edit others' reviews" });

    const { comment, rating } = req.body;
    if (comment) review.comment = comment;
    if (rating) review.rating = rating;

    res.json({ message: "Review updated", review });
});

// Delete review (only owner)
router.delete('/:id', authenticateJWT, (req, res) => {
    const index = reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Review not found" });
    if (reviews[index].userId !== req.user.id) return res.status(403).json({ message: "Cannot delete others' reviews" });

    reviews.splice(index, 1);
    res.json({ message: "Review deleted" });
});

module.exports = router;