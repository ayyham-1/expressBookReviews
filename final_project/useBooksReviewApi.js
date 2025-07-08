const axios = require('axios');

async function getBooksList() {
  const data = (await axios.get('http://localhost:5000/')).data;
  console.log(data, "\n\n");
}

getBooksList();


async function getBooksByISBN(isbn) {
  const data = (await axios.get(`http://localhost:5000/isbn/${isbn}`)).data;
  console.log(data, "\n\n");
}

getBooksByISBN(2);

async function getBooksByAuthor(author) {
  const data = (await axios.get(`http://localhost:5000/author/${author}`)).data;
  console.log(data, "\n\n");
}
 getBooksByAuthor("Unknown");
 
async function getBooksByTitle(title) {
  const data = (await axios.get(`http://localhost:5000/title/${title}`)).data;
  console.log(data, "\n\n");
}

getBooksByTitle("The Epic Of Gilgamesh")