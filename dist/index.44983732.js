// nodes
const form = document.body.querySelector(".entry-field");
const booksContainer = document.body.querySelector(".library__items");
const deleteLibraryButton = document.body.querySelector(".button--delete");
const errorMessage = document.body.querySelector(".error-message");
let myLibrary = [];
function Book(id, name, author, status) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.status = status;
    this.toggleStatus = function() {
        this.status = this.status === "read" ? "unread" : "read";
    };
}
function addBookToLibrary(event) {
    const formData = new FormData(event.target);
    const newBookData = Object.fromEntries(formData);
    newBookData.id = myLibrary.length + 1;
    const { id, name, author, status } = newBookData;
    console.log(name, author);
    if (name === "" || author === "") {
        errorMessage.textContent = "Error: fill in all fields of the form";
        return;
    }
    errorMessage.textContent = "";
    const newBook = new Book(id, name, author, status);
    myLibrary.push(newBook);
    event.target.reset();
    renderBook(newBook);
    addDeleteBookEvent(id);
    addToggleStatusBookEvent(id);
    updateLocalStorage();
}
function renderBook(newBook) {
    const { id, name, author, status } = newBook;
    booksContainer.insertAdjacentHTML("beforeend", `
      <tr class="library__item" data-id=${id}>
        <td>${name}</td>
        <td>${author}</td>
        <td><button class="button button--status">${status}</button></td>
        <td><button class="button button--remove">delete</button></td>
      </tr>
    `);
}
function addDeleteBookEvent(id) {
    const removeCurrentBtn = document.querySelector(`[data-id='${id}'] .button--remove`);
    removeCurrentBtn.addEventListener("click", ()=>{
        const currentBook = removeCurrentBtn.closest(".library__item");
        currentBook.remove();
        myLibrary = myLibrary.filter((item)=>item.id !== id);
        updateLocalStorage();
    });
}
function addToggleStatusBookEvent(id) {
    const statusCurrentBtn = document.querySelector(`[data-id='${id}'] .button--status`);
    statusCurrentBtn.addEventListener("click", ()=>{
        statusCurrentBtn.textContent = statusCurrentBtn.textContent === "read" ? "unread" : "read";
        myLibrary = myLibrary.map((item)=>{
            if (item.id === id) item.toggleStatus();
            return item;
        });
        updateLocalStorage();
    });
}
function updateLocalStorage() {
    localStorage.myLibrary = JSON.stringify(myLibrary);
}
function deleteLocalStorage() {
    localStorage.myLibrary = JSON.stringify([]);
}
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    addBookToLibrary(event);
});
deleteLibraryButton.addEventListener("click", ()=>{
    form.reset();
    myLibrary = [];
    booksContainer.innerHTML = "";
    deleteLocalStorage();
});
function initApp() {
    const localData = localStorage.myLibrary;
    if (localData) {
        myLibrary = JSON.parse(localStorage.myLibrary);
        for (let item of myLibrary)renderBook(item);
    }
    if (!localData) localStorage.myLibrary = JSON.stringify([]);
}
initApp();

//# sourceMappingURL=index.44983732.js.map
