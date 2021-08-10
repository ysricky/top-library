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
  return `${this.title.toUpperCase()}, by ${this.author}, ${
    this.pages
  } pages, ${hasRead}.`;
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

const createBookElement = (bookObject) => {
  const booksWrapper = document.querySelector('#booksWrapper');
  const bookDiv = document.createElement('div');
  const bookDelButton = document.createElement('button');
  const bookReadButton = document.createElement('button');
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('buttonDiv');
  bookDelButton.classList.add('btnDel');
  bookReadButton.classList.add('btnRead');
  bookDiv.classList.add('bookCard');
  bookDiv.textContent = bookObject.info();
  buttonDiv.appendChild(bookReadButton);
  buttonDiv.appendChild(bookDelButton);
  bookDiv.appendChild(buttonDiv);
  booksWrapper.appendChild(bookDiv);
  updateBookIndex();
  updateReadBook();
  deleteBook();
};

const updateBookIndex = () => {
  let bookIndex = 0;
  const books = document.querySelectorAll('.bookCard');
  books.forEach((book) => {
    book.setAttribute('data-book', `${bookIndex}`);
    bookIndex++;
  });
};

const bookDataVal = (button) => {
  return button.parentElement.parentElement.getAttribute('data-book');
};

const updateReadBook = () => {
  const actionRead = document.querySelectorAll('.btnRead');
  actionRead.forEach((button) => {
    if (!button.textContent) {
      button.addEventListener('click', () => {
        const dataRead = bookDataVal(button);
        if (myLibraryArray[dataRead]['read'] === true) {
          myLibraryArray[dataRead]['read'] = false;
        } else {
          myLibraryArray[dataRead]['read'] = true;
        }
        button.parentElement.parentElement.firstChild.textContent =
          myLibraryArray[dataRead].info();
      });
    }
    button.textContent = 'Read';
  });
};

const deleteBook = () => {
  const actionDel = document.querySelectorAll('.btnDel');
  actionDel.forEach((button) => {
    if (!button.textContent) {
      button.addEventListener('click', () => {
        const dataBook = bookDataVal(button);
        myLibraryArray.splice(dataBook, 1);
        button.parentElement.parentElement.remove();
        updateBookIndex();
      });
    }
    button.textContent = 'Delete';
  });
};

const displayBook = () => {
  myLibraryArray.forEach((bookObject) => {
    createBookElement(bookObject);
  });
};

const refreshDisplay = () => {
  const allBook = document.querySelectorAll('.bookCard');
  allBook.forEach((book) => {
    book.remove();
  });
};

const validateForm = () => {
  const bookNameField = document.forms['book-field']['book-name-field'].value;
  const bookAuthorField =
    document.forms['book-field']['book-author-field'].value;
  const bookPageField = document.forms['book-field']['book-page-field'].value;
  return bookNameField !== '' && bookAuthorField !== '' && bookPageField !== ''
    ? true
    : false;
};

const btnSubmit = document.querySelector('#btnSubmit');
const bookForm = document.querySelector('form');

btnSubmit.addEventListener('click', () => {
  if (validateForm()) {
    addNewBookToMyLibrary();
    bookForm.reset();
    refreshDisplay();
    displayBook();
  } else {
    alert('Please fill the empty fields.');
  }
});

displayBook();
