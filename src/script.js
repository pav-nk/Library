// nodes
const form = document.body.querySelector(".entry-field");
const booksContainer = document.body.querySelector(".library__items");
const deleteLibraryButton = document.body.querySelector(".button--delete");

let myLibrary = [];

function Book(id, name, author, status) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.status = status;
  this.toggleStatus = function () {
    this.status = this.status === "read" ? "unread" : "read";
  };
}

function addBookToLibrary(event) {
  const formData = new FormData(event.target);
  const newBookData = Object.fromEntries(formData);
  newBookData.id = myLibrary.length + 1;
  const { id, name, author, status } = newBookData;
  const newBook = new Book(id, name, author, status);
  myLibrary.push(newBook);
  event.target.reset();
  renderBook(newBook);
  addDeleteBookEvent(id);
  addToggleStatusBookEvent(id);
  addEventDeleteLibrary();
}

function renderBook(newBook) {
  const { id, name, author, status } = newBook;
  booksContainer.insertAdjacentHTML(
    "beforeend",
    `
      <tr class="library__item" data-id=${id}>
        <td>${name}</td>
        <td>${author}</td>
        <td><button class="button button--status">${status}</button></td>
        <td><button class="button button--remove">delete</button></td>
      </tr>
    `
  );
}

function addDeleteBookEvent(id) {
  const removeCurrentBtn = document.querySelector(
    `[data-id='${id}'] .button--remove`
  );
  console.log(removeCurrentBtn);
  removeCurrentBtn.addEventListener("click", () => {
    const currentBook = removeCurrentBtn.closest(".library__item");
    currentBook.remove();
    myLibrary = myLibrary.filter((item) => item.id !== id);
  });
}

function addToggleStatusBookEvent(id) {
  const statusCurrentBtn = document.querySelector(
    `[data-id='${id}'] .button--status`
  );
  statusCurrentBtn.addEventListener("click", () => {
    statusCurrentBtn.textContent =
      statusCurrentBtn.textContent === "read" ? "unread" : "read";
    myLibrary = myLibrary.map((item) => {
      if (item.id === id) {
        item.toggleStatus();
      }
      return item;
    });
  });
}

function addEventDeleteLibrary() {
  deleteLibraryButton.addEventListener("click", () => {
    form.reset();
    myLibrary = [];
    booksContainer.innerHTML = "";
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary(event);
});
