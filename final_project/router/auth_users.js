const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
const olderUsername = users.find((user) => user.username === data.username);
return olderUsername? false: true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const user = users.find(user => user.username = data.username);
  //checking if user is exist (not null)
  if(!user) return false;
  //checking if password is incorect
  if (user.password !== data.password) return false;
  
  return true;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const data = req.body;
  
/*
  //getting user from db
  const user = users.find(user => user.username = data.username);
  //checking if user is exist (not null)
  if(!user) return res.status(404).json({message: `no user with username : ${data.username}`});
  //checking if password is incorect
  if (user.password !== data.password) return res.status(401).json({message: "incorect password!"});
  
  */
  if(!authenticatedUser) return res.status(401).json({message: "user not authenticated!"});
  //generating jwt token
  const token = jwt.sign({username: data.username}, "secrit")
  return res.status(200).json({message: "success", token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  
  books[isbn].reviews[req.session.user] = review;
  
  return res.status(201).json({message: "review added successfully"});
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  delete books[isbn].reviews[req.session.user];
  return res.status(201).json({message: "review deleted successfully"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
