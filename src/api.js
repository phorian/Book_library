const router = require('express').Router();
const books = require('./books');

let booksDir = books;

router.get('/books', function (req, res) {
    res.send(booksDir);
});

router.get('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDir.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.send(book);
});

router.post('/books', function (req, res) {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories,
    } = req.body;

    //Check if book exists
    const bookExist = booksDir.find(b => b.isbn === isbn);
    if (bookExist) return res.send('Book already exist');

    //create book
    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories,
    };
    booksDir.push(book);
    res.send(book);
});

router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories,
    } = req.body;

    //Check if book exist
    const booKexist = booksDir.find(b => b.isbn === id);
    if (!booKexist) return res.send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...booKexist,
        title: updateField(title, booKexist.title),
        pageCount: updateField(pageCount, booKexist.pageCount),
        publishedDate: updateField(publishedDate, booKexist.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, booKexist.thumbnailUrl),
        shortDescription: updateField(shortDescription, booKexist.shortDescription),
        longDescription: updateField(longDescription, booKexist.longDescription),
        status: updateField(status, booKexist.status),
        authors: updateField(authors, booKexist.authors),
        categories: updateField(categories, booKexist.categories),
    };

    const bookIndex = booksDir.findIndex(b => b.isbn === id);
    booksDir.splice(bookIndex, 1, updatedBook);

    res.send(updatedBook);
});

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDir.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    booksDir = booksDir.filter(b => b.isbn !== id);

    res.send('Success');
});

module.exports = router;