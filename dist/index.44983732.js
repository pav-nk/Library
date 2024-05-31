// nodes
const form = document.body.querySelector(".entry-field");
const booksContainer = document.body.querySelector(".library__items");
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
function addBookToLibrary() {
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBookData = Object.fromEntries(formData);
        newBookData.id = myLibrary.length + 1;
        const { id, name, author, status } = newBookData;
        const newBook = new Book(id, name, author, status);
        myLibrary.push(newBook);
        console.log(myLibrary);
        e.target.reset();
        renderBooks();
    });
}
function renderBooks() {
    booksContainer.innerHTML = "";
    for (const book of myLibrary){
        const { id, name, author, status } = book;
        booksContainer.insertAdjacentHTML("beforeend", `
    <tr class="library__item">
      <td>${name}</td>
      <td>${author}</td>
      <td><button class="button button--status">${status}</button></td>
      <td><button class="button button--remove" data-id=${id}>delete</button></td>
    </tr>
    `);
    }
    addListeners();
}
function addListeners() {
    const deleteButtons = Array.from(document.querySelectorAll(".button--remove"));
    deleteButtons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            console.log(button);
            const currentId = button.dataset.id;
            myLibrary = myLibrary.filter((book)=>book.id !== +currentId);
            renderBooks();
        });
    });
}
addBookToLibrary();

//# sourceMappingURL=index.44983732.js.map
