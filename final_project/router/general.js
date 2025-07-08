const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const data = req.body;
  let isEmpty = '';
  Object.keys(data).map((key) => {
    if(!data[key] || data[key] === " ") {
      isEmpty = key;
      return;
    }
  });
  if(isEmpty) return res.status(401).json({message: `no ${isEmpty} provided!!`});
  
  if(!isValid) return res.status(401).json({message: `username is alredy taken!`});
  
  users.push(data);
  return res.status(201).json({message: "user registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({message: "success", books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json({message: "success", book: books[isbn]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let books_list = [];
  Object.keys(books).forEach((key) => {
    if(books[key].author === author) books_list.push(books[key]);
  });;
  return res.status(200).json({message: "success", books: books_list });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  
  let books_list = [];
  Object.keys(books).forEach((key) => {
    if(books[key].title === title) books_list.push(books[key]);
  });;
  return res.status(200).json({message: "success", books: books_list });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json({message: "success", book_title: books[isbn].title, reviews: books[isbn].reviews
  });
});

module.exports.general = public_users;
