const router = require('express').Router();
const books = require('./books');

let booksDir = books;

router.get('/books', function(req,res){
    res.send(booksDir);
});

router.get('/books/:id', function(req,res){
    const {id} = req.params;

    const book = booksDir.find(b => b.isbn === id);
    if(!book) return res.status(404).send('Book does not exist');

    res.send(book);
});

router.post('/books', function(req,res){
    const{
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
    const bookExist = booksDir.find(b => b.isbn ===isbn);
    if(bookExist) return res.send('Book already exist'); 

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

router.put('/books/:id', function(req,res){

});

router.delete('/books/:id', function(req,res){

});

module.exports = router;