// nodes
const form = document.body.querySelector(".entry-field");
const booksContainer = document.body.querySelector(".library__items");

const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBookData = Object.fromEntries(formData);
    newBookData.id = myLibrary.length + 1;
    myLibrary.push(newBookData);
    console.log(myLibrary);
    e.target.reset();
    renderBooks();
  });
}

function renderBooks() {
  booksContainer.innerHTML = "";
  for (const book of myLibrary) {
    const { id, name, author, status } = book;
    booksContainer.insertAdjacentHTML(
      "beforeend",
      `
    <tr class="library__item">
      <td>${name}</td>
      <td>${author}</td>
      <td><span class="read-status">${
        status === "1" ? "read" : "unread"
      }</span></td>
      <td><button class="button button--remove" data-id=${id}>delete</button></td>
    </tr>
    `
    );
  }
}

addBookToLibrary();
