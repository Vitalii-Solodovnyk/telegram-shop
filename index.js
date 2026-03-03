const input = document.getElementById("myInput");

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

  titleText.textContent = book.name;
  priceText.textContent = book.price + "₴";

  li.append(titleText);
  li.append(priceText);

  ul.append(li);
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
});

input.addEventListener("input", (event) => {
  let searchText = input.value;
  console.log(searchText);
  let filterBooks = books.filter((book) => book.name.includes(searchText));
  ul.innerHTML = "";
  filterBooks.forEach(createBook);
});
//books = books.filter(word => word.id === (bookshasll.id))
