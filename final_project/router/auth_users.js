const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//check if user with the given username already exists
const isValid = (username) => {
    //filter the users array for any user with the same username
    let userwithsamename = user.filter((user) => {
        return user.username === username ;
    });
    //return true if any user with the same username is found, otherwise false
    if (userwithsamename.length >0 ) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password) => {
    //filter users array for user with same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    //return true if any valid user is found, otherwise false
    if (validusers.length > 0 ) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
const username = req.body.username;
    const password = req.body.password;

    //check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
