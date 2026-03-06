const input = document.getElementById("myInput");

const tg = window.telegram.WebApp;

const ul = document.getElementById("myUl");

const titleInput = document.getElementById("titleInput");

const priceInput = document.getElementById("priceInput");

const button = document.getElementById("Button");

let books = [];

let bookshall = localStorage.getItem("myBooks");

if (bookshall !== null) {
  books = JSON.parse(bookshall);
  books.forEach(createBook);
} else {
  console.log("Error");
}

function createBook(book) {
  const li = document.createElement("li");
  let titleText = document.createElement("h3");
  let priceText = document.createElement("p");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "X";

  titleText.textContent = book.name;
  priceText.textContent = book.price + "₴";

  li.append(titleText);
  li.append(priceText);
  li.append(deleteButton);

  ul.append(li);
  deleteButton.addEventListener("click", (event) => {
    li.remove();
    books = books.filter((b) => b.id !== book.id);
    localStorage.setItem("myBooks", JSON.stringify(books));
    telegram();
  });
}

button.addEventListener("click", (event) => {
  let title = titleInput.value;
  let price = priceInput.value;
  const bookObj = {
    id: Date.now(),
    price: price,
    name: title,
  };
  books.push(bookObj);

  createBook(bookObj);

  localStorage.setItem("myBooks", JSON.stringify(books));
  telegram();
});

input.addEventListener("input", (event) => {
  let searchText = input.value;
  console.log(searchText);
  let filterBooks = books.filter((book) => book.name.includes(searchText));
  ul.innerHTML = "";
  filterBooks.forEach(createBook);
});

function telegram() {
  if (books.length > 0) {
    tg.MainButton.show();
    tg.MainButton.setText("Buy");
  } else {
    tg.MainButton.hide();
  }
}
//books = books.filter(word => word.id === (bookshasll.id))
