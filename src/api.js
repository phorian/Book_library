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

});

router.put('/books/:id', function(req,res){

});

router.delete('/books/:id', function(req,res){

});

module.exports = router;