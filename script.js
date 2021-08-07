'use strict';

//Book Parent Object
let myLibraryArray = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const hasRead = this.read ? 'has been read' : 'not read yet';
  return `${this.title}, by ${this.author}, ${this.pages} pages, ${hasRead}.`;
};

//create book object and append to myLibraryArray
const getBookData = () => {
  const textInputs = document.querySelectorAll('.textInput');
  const checkRead = document.querySelector('#checkRead').checked;
  let inputsArray = [];
  textInputs.forEach((input) => {
    inputsArray.push(input.value);
  });
  inputsArray.push(checkRead);
  return inputsArray;
};

const createNewBookObj = () => {
  const bookData = getBookData();
  const newBook = new Book(bookData[0], bookData[1], bookData[2], bookData[3]);
  return newBook;
};

const addNewBookToMyLibrary = () => {
  myLibraryArray.push(createNewBookObj());
};

//create and display book info
const changeBookReadState = () => {};
const deleteBook = () => {};
const createBookElement = (bookObject) => {
  const booksWrapper = document.querySelector('#booksWrapper');
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('bookDiv');
  bookDiv.textContent = bookObject.info();
  booksWrapper.appendChild(bookDiv);
};

const displayBook = () => {
  myLibraryArray.forEach((bookObject) => {
    createBookElement(bookObject);
  });
};

const refreshDisplay = () => {
  const allBook = document.querySelectorAll('.bookDiv');
  allBook.forEach((book) => {
    book.remove();
  });
};

const btnSubmit = document.querySelector('#btnSubmit');
const bookForm = document.querySelector('form');

btnSubmit.addEventListener('click', () => {
  addNewBookToMyLibrary();
  bookForm.reset();
  refreshDisplay();
  displayBook();
});

displayBook();
