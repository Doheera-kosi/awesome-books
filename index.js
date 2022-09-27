const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const books = document.querySelector('#books');
const book = document.querySelector('#book');
const note = document.querySelector('#note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('button clicked');

  dataVal();
})

const data = [
  { 
    id: '1',
    title: 'A Better India: A Better World',
    author: 'Narayana Murthy'
  },
  {
    id: '2',
    title: 'A Passage to India',
    author: 'E. M. Foster'
  },
  {
    id: '3',
    title: 'Great Expectations',
    author: 'Charles Dickens'
  }
];

const recieveFieldsData = () => {
  data['title'] =  title.value
  data['author'] =  author.value
  console.log(data);

  // callingg addNew Function here
  addNewBook();
}

const dataVal = () => {
  if(title.value === '' || author.value === '' ) {
    note.innerHTML = 'Please fields can not be blank'
    console.log('failure');
  } else {
    console.log('success');
    note.innerHTML = '';
    recieveFieldsData();
  }
}

const addNewBook = () => {
  books.innerHTML += `
  <div id='book'>
    <label for="title">${data.title}</label><br>
    <label for="author">${data.author}</label>
    <br><br>
    <div>
      Remove
      <span>
        <i onClick="deleteBook(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
    <hr>
  </div>
  `;
  title.value = '';
  author.value = '';
};

const deleteBook = (e) => {
  e.parentElement.parentElement.parentElement.remove();
}

const renderData = () => {
  data.forEach((data) => {
    books.innerHTML += `
    <div id='book'>
      <label for="title">${data.title}</label><br>
      <label for="author">${data.author}</label>
      <br><br>
      <div>
        Remove
        <span>
          <i onClick="deleteBook(this)" class="fas fa-trash-alt"></i>
        </span>
      </div>
      <hr>
    </div>
    `;
  })
}
window.onload = () => {
  renderData()
}

window.localStorage.setItem('data', JSON.stringify(data))
const newObject = window.localStorage.getItem("data", JSON.stringify('data'));
console.log(JSON.parse(newObject));