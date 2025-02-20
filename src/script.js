// nodes
const form = document.body.querySelector(".entry-field");
const inputList = Array.from(form.querySelectorAll(".form-input"));
const booksContainer = document.body.querySelector(".library__items");
const deleteBtn = document.body.querySelector(".button--delete");
const errorMessage = document.body.querySelector(".error-message");

class Book {
  constructor(id, name, author, pages, status) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  toggleStatus() {
    this.status = this.status === "read" ? "unread" : "read";
  }

  render() {
    const { id, name, author, pages, status } = this;
    booksContainer.insertAdjacentHTML(
      "beforeend",
      `
      <tr class="library__item" data-id=${id}>
        <td>${name}</td>
        <td>${author}</td>
        <td>${pages}</td>
        <td><button class="button button--status">${status}</button></td>
        <td><button class="button button--remove">delete</button></td>
      </tr>
    `
    );
  }

  addHandlers(updateStorage) {
    const removeCurrentBtn = document.querySelector(
      `[data-id='${this.id}'] .button--remove`
    );
    const statusCurrentBtn = document.querySelector(
      `[data-id='${this.id}'] .button--status`
    );
    removeCurrentBtn.addEventListener("click", () => {
      const currentBook = removeCurrentBtn.closest(".library__item");
      currentBook.remove();
      updateStorage("remove", this.id);
    });
    statusCurrentBtn.addEventListener("click", () => {
      statusCurrentBtn.textContent =
        statusCurrentBtn.textContent === "read" ? "unread" : "read";
      updateStorage("toggle", this.id);
    });
  }
}

class Library {
  constructor() {
    this.storage = [];
    this.isValid = false;
  }

  updateLocalStorage() {
    localStorage.storage = JSON.stringify(this.storage);
  }

  deleteLocalStorage() {
    localStorage.storage = JSON.stringify([]);
  }

  updateErrorMessage(message = "") {
    errorMessage.textContent = message;
  }

  updateStorage(action, id) {
    if (action === "remove") {
      this.storage = this.storage.filter((item) => item.id !== id);
    }
    if (action === "toggle") {
      this.storage = this.storage.map((item) => {
        if (item.id === id) {
          item.toggleStatus();
        }
        return item;
      });
    }
    this.updateLocalStorage();
  }

  addBook(event) {
    const formData = new FormData(event.target);
    const newBookData = Object.fromEntries(formData);
    newBookData.id = this.storage.length + 1;
    const { id, name, author, pages, status } = newBookData;
    this.updateErrorMessage("");
    const book = new Book(id, name, author, pages, status);
    this.storage.push(book);
    event.target.reset();
    book.render();
    book.addHandlers(this.updateStorage.bind(this));
    this.updateLocalStorage();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.addBook(event);
    console.log(inputList);
    inputList.forEach((input) => {
      input.classList.remove("valid");
    });
  }

  checkValidity(event) {
    const formNode = event.target.form;
    const inputNode = event.target;
    const isValidForm = formNode.checkValidity();
    if (inputNode.value === "") {
      this.updateErrorMessage("");
      inputNode.classList.remove("invalid");
      inputNode.classList.remove("valid");
    } else if (inputNode.checkValidity()) {
      this.updateErrorMessage("");
      inputNode.classList.remove("invalid");
      inputNode.classList.add("valid");
    } else {
      this.updateErrorMessage(inputNode.dataset.errorMessage);
      inputNode.classList.add("invalid");
      inputNode.classList.remove("valid");
    }

    formNode.querySelector(".button").disabled = !isValidForm;
  }

  addHandlers() {
    deleteBtn.addEventListener("click", () => {
      form.reset();
      this.storage = [];
      booksContainer.innerHTML = "";
      this.deleteLocalStorage();
    });
    form.addEventListener("input", (event) => this.checkValidity(event));
    form.addEventListener("submit", (event) => this.handleFormSubmit(event));
  }

  init() {
    const localData = localStorage.storage;
    if (localData) {
      this.storage = JSON.parse(localData).map((item) => {
        const { id, name, author, pages, status } = item;
        const book = new Book(id, name, author, pages, status);
        book.render();
        book.addHandlers(this.updateStorage.bind(this));
        return book;
      });
    }
    if (!localData) {
      localStorage.storage = JSON.stringify([]);
    }
    this.addHandlers();
  }
}

const newLibrary = new Library();

newLibrary.init();
