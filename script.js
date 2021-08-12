'use strict';
//checkpoint
//get local storage from myLibraryArray and re-assign it to myLibraryArray
const storedArray = () => JSON.parse(localStorage.getItem('array'));
let myLibraryArray = storedArray() || [];
const saveToLocalStorage = () => {
  localStorage.setItem('array', JSON.stringify(myLibraryArray));
};

//new Book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//JSON doesn't support functions
const info = function (bookObject) {
  let hasRead = bookObject.read ? 'has been read' : 'not read yet';
  return `${bookObject.title.toUpperCase()}, by ${bookObject.author}, ${
    bookObject.pages
  } pages, ${hasRead}.`;
};

//get book data from user inputs and assign them to inputsArray
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

//create new Book object based on getBookData()
const createNewBookObj = () => {
  const bookData = getBookData();
  const newBook = new Book(bookData[0], bookData[1], bookData[2], bookData[3]);
  return newBook;
};

//add newly added book into myLibraryArray
const addNewBookToMyLibrary = () => {
  myLibraryArray.push(createNewBookObj());
};

//create and generate 'book element' to display, applying class, adding dataset to each book element
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
  bookDiv.textContent = info(bookObject);
  buttonDiv.appendChild(bookReadButton);
  buttonDiv.appendChild(bookDelButton);
  bookDiv.appendChild(buttonDiv);
  booksWrapper.appendChild(bookDiv);
  updateBookIndex();
  updateReadBook();
  deleteBook();
};

//updating book index if new book added / deleted
const updateBookIndex = () => {
  let bookIndex = 0;
  const books = document.querySelectorAll('.bookCard');
  books.forEach((book) => {
    book.setAttribute('data-book', `${bookIndex}`);
    bookIndex++;
  });
};

//get book dataset for updateReadBook and deleteBook
const bookDataVal = (button) => {
  return button.parentElement.parentElement.getAttribute('data-book');
};

//change read state of selected book based on bookDataVal (dataset)
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
        button.parentElement.parentElement.firstChild.textContent = info(
          myLibraryArray[dataRead]
        );
      });
    }
    button.textContent = 'Read';
  });
};

//delete selected book from myLibraryArray and from displayed books
const deleteBook = () => {
  const actionDel = document.querySelectorAll('.btnDel');
  actionDel.forEach((button) => {
    if (!button.textContent) {
      button.addEventListener('click', () => {
        const dataBook = bookDataVal(button);
        myLibraryArray.splice(dataBook, 1);
        button.parentElement.parentElement.remove();
        updateBookIndex();
        saveToLocalStorage();
      });
    }
    button.textContent = 'Delete';
  });
};

//render all books element
const displayBook = () => {
  myLibraryArray.forEach((bookObject) => {
    createBookElement(bookObject);
  });
};

//delete all books to prevent duplicate book after new addition
const refreshDisplay = () => {
  const allBook = document.querySelectorAll('.bookCard');
  allBook.forEach((book) => {
    book.remove();
  });
};

//check if form input field is empty or not, cannot proceed if empty.
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
    saveToLocalStorage();
    displayBook();
  } else {
    alert('Please fill the empty fields.');
  }
});

displayBook();
