const input = document.getElementById("myInput");

const select = document.getElementById("categorySelect");

const clearButton = document.getElementById("clearButton");

const tg = window.Telegram.WebApp;

const ul = document.getElementById("myUl");

const titleInput = document.getElementById("titleInput");

const priceInput = document.getElementById("priceInput");

const button = document.getElementById("Button");

let books = [];

let cart = [];

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
  let buyButton = document.createElement("button");
  buyButton.textContent = "Add to cart";
  buyButton.addEventListener("click", (event) => {
    cart.push(book);
    telegram();
  });

  titleText.textContent = book.name;
  priceText.textContent = book.price + "₴";

  li.append(titleText);
  li.append(priceText);
  li.append(deleteButton);
  li.append(buyButton);

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
  let selectCategory = select.value;
  const bookObj = {
    id: Date.now(),
    price: price,
    name: title,
    category: selectCategory,
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

clearButton.addEventListener("click", (event) => {
  cart = [];
  telegram();
});

function telegram() {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice = totalPrice + Number(item.price);
  });
  if (cart.length > 0) {
    tg.MainButton.show();
    tg.MainButton.setText(`Buy ` + totalPrice + `₴`);
  } else {
    tg.MainButton.hide();
  }
}
//books = books.filter(word => word.id === (bookshasll.id))
