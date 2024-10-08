const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



//register new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //check if both username and password are provided
    if(username && password) {
        //check if user does not already exist
        if (!doesExist(username)) {
            //add new user to userarray
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User registered successfully"})
        } else {
            return res.status(404).json({message: "User already registered"});
        }
    }
    //return error if username or password are missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if (books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({
          "isbn": isbn,
          "title": books[isbn]["title"],
          "reviews": books[isbn]["reviews"]
        });
      }
    });
    res.send(JSON.stringify({ booksbyauthor }, null, 4));
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if (books[isbn]["title"] === req.params.title) {
        booksbytitle.push({
          "isbn": isbn,
          "title": books[isbn]["title"],
          "reviews": books[isbn]["reviews"]
        });
      }
    });
    res.send(JSON.stringify({ booksbytitle }, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  const review = books[isbn]["reviews"];
  res.send(JSON.stringify({review}, null, 4));

});

module.exports.general = public_users;
