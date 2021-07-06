require("dotenv").config();
// Import express
const express = require("express");
const mongoose = require("mongoose");


// Import database
const database = require("./database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialization
const booky = express();

// Configuration
booky.use(express.json());

// Establish database connection
mongoose
.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("Connection established !!"));

/*
Route           /get/allBooks
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/get/allBooks" , (req, res) => {
    const getAllBooks = BookModel.find();
    return res.json({Books : getAllBooks});
});


/*
Route           /book
Description     Get book based on isbn
Access          Public
Parameter       isbn
Methods         GET
*/
booky.get("/book/:isbn" , (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        );
        if(getSpecificBook.length ===0){
            return res.json({
                error: `No book found for isbn ${req.params.isbn}`,
            });
        }
        return res.json({Book : getSpecificBook});
});


/*
Route           /book/ctgry
Description     Get book based on category
Access          Public
Parameter       category
Methods         GET
*/
booky.get("/book/ctgry/:Category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.Category)
        );
        if(getSpecificBook.length ===0){
            return res.json({
                error: `No book found for category ${req.params.category}`,
            });
        }
        return res.json({Books : getSpecificBook});
});


/*
Route           /book/lang
Description     Get book based on language
Access          Public
Parameter       Language
Methods         GET
*/
booky.get("/book/lang/:Language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.Language
    );
    if(getSpecificBook.length ===0){
        return res.json({
            error: `No book found for language ${req.params.Language}`,
        });
    }
    return res.json({Books : getSpecificBook});
});


/*
Route           /allAuthors
Description     Get all authors
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/allAuthors" , (req,res) => {
    return res.json({Author : database.authors});
})


/*
Route           /authors/id
Description     Get specific authors based on id
Access          Public
Parameter       Id
Methods         GET
*/
booky.get("/author/id/:Id", (req,res) => {
    const getspecificAuthor = database.authors.filter(
        (author) => author.id === parseInt(req.params.Id)
        );
        if(getspecificAuthor.length === 0){
            return res.json({
                error: `No author found for id ${req.params.Id}`,
            });
        }
        return res.json({Authors : getspecificAuthor});
});


/*
Route           /author/book/:isbn
Description     Get authors based on books
Access          Public
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req,res) => {
    const getspecificAuthor = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getspecificAuthor.length === 0){
        return res.json({
            error: `No author found for book ${req.params.isbn}`,
        });
    }
    return res.json({Authors : getspecificAuthor});
});


/*
Route           /allPublications
Description     Get all publications
Access          Public
Parameter       None
Methods         GET
*/
booky.get("/allPublications" , (req,res) =>{
     return res.json({Publications: database.publications});
});


/*
Route           /publications/id
Description     Get specific publications based on id
Access          Public
Parameter       Id
Methods         GET
*/
booky.get("/publications/id/:Id" , (req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.id === parseInt(req.params.Id)
    );
    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for id ${req.params.Id}`,
        });
    }
    return res.json({Publications : getSpecificPublication});
});


/*
Route           /publications/id
Description     Get list of publications based on book
Access          Public
Parameter       Id
Methods         GET
*/
booky.get("/publication/book/:isbn" , (req,res) => {
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for book ${req.params.isbn}`,
        });
    }
    return res.json({Publications : getSpecificPublication});
});


/*
Route           /add/book
Description     Add new book
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/add/book" , (req,res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({Books : database.books});
});


/*
Route           /add/author
Description     Add new author
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/add/author" , (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({Authors : database.authors});
});


/*
Route           /add/publication
Description     Add new publication
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/add/publication" , (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({Publications : database.publications});
});


/*
Route           /book/update/title
Description     update book title
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn" , (req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({Books : database.books});
});


/*
Route           /update/book/author
Description     update new author for a book
Access          Public
Parameter       isbn, authorId
Methods         PUT
*/
booky.put("/update/book/author/:isbn/:authorId" , (req,res) => {

    //update book database
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            return book.authors.push(parseInt(req.params.authorId));
        }
    });

    //update author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({
        Books : database.books,
        Authors : database.authors}
        );
});


/*
Route           /update/author/name
Description     Update author name
Access          Public
Parameter       Id
Methods         PUT
*/
booky.put("/update/author/name/:Id" , (req,res) => {
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.Id)){
            author.name = req.body.newAuthorName
        }
    });
    return res.json({Authors : database.authors});
});


/*
Route           /update/publition/name
Description     Update publication name
Access          Public
Parameter       Id
Methods         PUT
*/
booky.put("/update/publition/name/:Id" , (req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.Id)){
            publication.name = req.body.newPublitionName
        }
    });
    return res.json({Publications : database.publications});
});


/*
Route           /update/publition/book
Description     update books to publications
Access          Public
Parameter       isbn, publitionId
Methods         PUT
*/
booky.put("/update/publition/book/:isbn/:publitionId" , (req,res) => {

    // update publition database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.publitionId)){
            return publication.books.push(req.params.isbn);
        }
    });

    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.params.publitionId;
            return;
        }
    });
    return res.json({
        Books : database.books,
        Publications : database.publications});
});


/*
Route           /delete/book
Description     delete a book
Access          Public
Parameter       isbn
Methods         DELETE
*/
booky.delete("/delete/book/:isbn" , (req, res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({Books : database.books});
});


/*
Route           /delete/book/author
Description     delete an author from a book
Access          Public
Parameter       isbn, authorId
Methods         DELETE
*/
booky.delete("/delete/book/author/:isbn/:authorId" , (req,res) => {

    // update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter(
                (author) => author !== parseInt(req.params.authorId));

        book.authors = newAuthorList;
        return;
        }
    });

    // update author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBookList = author.books.filter(
                (book) => book !== req.params.isbn);
        
        author.books = newBookList;
        return;
        }
    })
    return res.json({
        Books : database.books,
        Authors : database.authors
    });
});


/*
Route           /delete/author
Description     delete an author 
Access          Public
Parameter       Id
Methods         DELETE
*/
booky.delete("/delete/author/:Id" , (req,res) => {
    const updatedAuthor = database.authors.filter(
        (author) => author.id !== parseInt(req.params.Id));
        database.authors = updatedAuthor;
        return res.json({Authors : database.authors});

});


/*
Route           /delete/publication
Description     Delete the publication 
Access          Public
Parameter       Id
Methods         DELETE
*/
booky.delete("/delete/publication/:Id", (req, res) => {
    const updatedPublication = database.publications.filter(
        (publication) => publication.id !== parseInt(req.params.Id));
        database.publications = updatedPublication;
        return res.json({Publications : database.publications});
});


/*
Route           /delete/book/publication
Description     Delete a book from publication 
Access          Public
Parameter       isbn, publicationId
Methods         DELETE
*/
booky.delete("/delete/book/publication/:isbn/:publicationId", (req, res) => {

    // update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.publicationId)){
            const newBooksList = publication.books.filter(
                (book) => book !== req.params.isbn
            );
            publication.books = newBooksList;
            return;
        }
    });

    // update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = 0;
            return;
        }
    });
    return res.json({
        Books : database.books,
        Publications: database.publications,
    });
});

booky.listen(3000, () => console.log("Hey, Server is running 😎"));