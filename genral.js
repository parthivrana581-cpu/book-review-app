const axios = require('axios');

const BASE_URL = "http://localhost:5000/api";

// ✅ 1. Get all books
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        console.log("All Books:");
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching all books:", error.message);
    }
}

// ✅ 2. Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/books/${isbn}`);
        console.log(`Book with ISBN ${isbn}:`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching book by ISBN:", error.message);
    }
}

// ✅ 3. Get books by Author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/books/author/${author}`);
        console.log(`Books by Author (${author}):`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching books by author:", error.message);
    }
}

// ✅ 4. Get books by Title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/books/title/${title}`);
        console.log(`Books with Title (${title}):`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching books by title:", error.message);
    }
}

// ✅ Run all functions
async function runAll() {
    await getAllBooks();
    await getBookByISBN(1);
    await getBooksByAuthor("Author1");
    await getBooksByTitle("Book1");
}

runAll();