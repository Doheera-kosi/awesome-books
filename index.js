// Const/variable Declaration And Initialization
const bookName = document.querySelector('#name');
const bookAuthor = document.querySelector('#author');
const newBook = document.querySelector('.newBook');
const display = document.querySelector('.elements');
const note = document.querySelector('#note');
let dataArr = [
  {
    id: new Date().getTime().toString(),
    book: 'Great Expectations',
    author: 'Charles Dickins',
  },
];

// Setting Data into LocalStorage Function
function locStorage() {
  localStorage.setItem('bookList', JSON.stringify(dataArr));
}

// Getting Data from LocalStorage to persist on the browser
if (localStorage.getItem('bookList') === null) {
  locStorage();
} else if (JSON.parse(localStorage.getItem('bookList')).length === 0) {
  locStorage();
}

// Validating Input Fields Function
const fieldValidation = () => {
  if (bookName.value === '' || bookAuthor.value === '') {
    note.innerHTML = 'Please fields can not be blank';
  } else {
    note.innerHTML = '';
  }
};

// Function to Add New Book to Collections
function addBook() {
  if (bookName.value !== '' && bookAuthor.value !== '') {
    dataArr.unshift({
      id: new Date().getTime().toString(),
      book: bookName.value,
      author: bookAuthor.value,
    });
    locStorage();
  } else {
    // Calling form Validation Function
    fieldValidation();
  }
}

// Adding Items from Data fields Functoin
function addItems() {
  let bookHtml = '';
  const booksArray = JSON.parse(localStorage.getItem('bookList'));
  if (booksArray !== null) {
    dataArr = booksArray;
    booksArray.forEach((item) => {
      bookHtml += `
      <div class='b-container'>
        <div class=title-author>
          <label class='book-name'>" ${item.book} "</label>
          <div> by </div>
          <label class='book-author'>${item.author}</label>
        </div>
        <button type='button' id=${item.id} onclick='removeBook(this.id)'>Remove <i class='fas fa-trash-alt'></i> </button>
      </div>
      <hr>
      `;
      // Clearing input fields when Add Button is fired
      bookName.value = '';
      bookAuthor.value = '';
    });
    display.innerHTML = bookHtml;
  }
}
// Returning the Function to work
addItems();

// Function to Remove Book from collection
function removeBook(id) {
  dataArr = dataArr.filter((e) => e.id !== id);
  locStorage();
  addItems();
}
removeBook();

// Button OnClick Event Handler
newBook.addEventListener('click', () => {
  addBook();
  addItems();
});
