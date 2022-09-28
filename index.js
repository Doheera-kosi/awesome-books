const bookName = document.querySelector('#title');
const author = document.querySelector('#author');
const elements = document.querySelector('#elements');
const form = document.querySelector('#form');
const msg = document.querySelector('#msg');

const navList = document.querySelector('#nav-list');
const navAdd = document.querySelector('#nav-add');
const navContact = document.querySelector('#nav-contact');
const sectionList = document.querySelector('#list');
const sectionAdd = document.querySelector('#add-book');
const sectionContact = document.querySelector('#contact');


function pushItems() {
  let bookHtml = '';
  const booksArray = JSON.parse(localStorage.getItem('bookList'));
  if (booksArray !== null) {
    booksArray.forEach((item, index) => {
      bookHtml += `
      <li class='list_item' style="background-color: ${index % 2 && 'rgb(225, 223, 223)'}">
        <p class="book-name"> "${item.title}" by ${item.author}</p> <br>
        <button type="button" id=${item.id} onclick="collection.removeBook(this.id)">Remove <i class="fas fa-plus-circle"></i></button>
      </li>
      `;
    });
    elements.innerHTML = bookHtml;
  };
};

class Collection {
  constructor() {
    this.arr = JSON.parse(localStorage.getItem('bookList'))
  };

  getBooks() {
    if (localStorage.getItem('bookList') === null) {
      this.arr = [];
    } else {
      this.arr = JSON.parse(localStorage.getItem('bookList'));
    }
  }

  UpdateLocalStorage() {
    localStorage.setItem('bookList', JSON.stringify(this.arr));
  }

  addBook() {
    const bookObject = {
      id: new Date().getTime().toString(),
      title: bookName.value,
      author: author.value,
    };
    this.arr.push(bookObject);
    this.UpdateLocalStorage();
    pushItems();
    fieldValidation();
  }

  setUpArray() {
    this.arr = JSON.parse(localStorage.getItem('bookList'));
  }

  removeBook(id) {
    this.arr = this.arr.filter((e) => e.id !== id);
    this.UpdateLocalStorage();
    pushItems();
  }
}

const collection = new Collection();

// Validating Input Fields Function
const fieldValidation = () => {
  if (bookName.value === '' || author.value === '') {
    msg.innerHTML = 'Please fields can not be blank';
  } else {
    msg.innerHTML = 'Success!';
  }
};

window.onload = () => {
  collection.getBooks();
}

const addBtn = document.querySelector('.addBtn');

addBtn.addEventListener('click', () => {
  collection.getBooks();
  collection.addBook();
  form.reset();
});

function timeDate() {
  setInterval(() => {
    time.innerHTML = new Date();
  }, 100);
}

window.addEventListener('load', timeDate)

navList.addEventListener('click', () => {
  sectionList.style.display = 'block';
  sectionAdd.style.display = 'none';
  sectionContact.style.display = ' none';
  pushItems();
});

navAdd.addEventListener('click', () => {
  sectionList.style.display = 'none';
  sectionAdd.style.display = 'block';
  sectionContact.style.display = ' none';
})

navContact.addEventListener('click', () => {
  sectionList.style.display = 'none';
  sectionAdd.style.display = 'none';
  sectionContact.style.display = ' flex';
})