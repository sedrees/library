/* -- General Functionality -- */

!localStorage.getItem('library') ? myLibrary = [] : myLibrary = JSON.parse(localStorage.getItem("library"));

const bookContainer = document.querySelector("#books");

function Book(title, author, read, pages, published, genre1, genre2) {
    this.id = new Date();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.genre1 = genre1;
    this.genre2 = genre2
    this.read = read;
}

function addBook(book) {
    myLibrary.push(book);
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function deleteBook(bookId) {
    let idx = myLibrary.indexOf(bookId);
    myLibrary.splice(idx, 1);
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function displayBook(book) {
    let container = document.createElement('div');
    container.classList.add('book', 'column');
    let inner = document.createElement('div');
    inner.classList.add('ui', 'segment');

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "\u00d7";
    deleteBtn.classList.add('ui', 'inverted', 'icon', 'button', 'red', 'deleteBtn');
    deleteBtn.onclick = function() {
        this.parentElement.parentElement.remove();
        deleteBook();
    }
    inner.appendChild(deleteBtn);

    let genreContainer = document.createElement('div');
    genreContainer.classList.add('genres');

    let firstGenre = document.createElement('div');
    firstGenre.classList.add('genre', book.genre1);
    firstGenre.setAttribute('role', 'img');
    genreContainer.appendChild(firstGenre);

    if (book.genre2) {
        let secondGenre = document.createElement('div');
        secondGenre.classList.add('genre', book.genre2);
        secondGenre.setAttribute('role', 'img');
        genreContainer.appendChild(secondGenre);
    }

    inner.appendChild(genreContainer);

    let title = document.createElement('h2');
    title.textContent = book.title;
    inner.appendChild(title);

    let author = document.createElement('h3');
    author.textContent = book.author;
    inner.appendChild(author);

    let published = document.createElement('h4');
    published.textContent = book.published;
    published.classList.add('published');
    inner.appendChild(published);

    let length = document.createElement('h4');
    length.textContent = book.pages+" pages";
    inner.appendChild(length);
    
    let toggler = document.createElement('div');
    toggler.classList.add('ui', 'checkbox');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox', 'name', 'readState');
    let label = document.createElement('label');
    input.onclick = function() {
        if (!book.read) {
            let idx = myLibrary.find(item => item.id == book.id);
            idx["read"] = 1;
            label.textContent = "Read";
            localStorage.setItem("library", JSON.stringify(myLibrary));
        }
    }
    if (book.read) {
        label.textContent = "Read";
        input.setAttribute('checked', true);
    } else { label.textContent = "Unread" }

    toggler.appendChild(input);
    toggler.appendChild(label);
    inner.appendChild(toggler);

    container.appendChild(inner);
    bookContainer.appendChild(container);
}

function loadBooks() {
    for(let i=0;i<myLibrary.length;i++) {
        displayBook(myLibrary[i]);
    }
}

/* -- Process Add Book -- */
const bookForm = document.querySelector("#addBook");

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let bookFormData = new FormData(bookForm);
    const newBook = new Book();
    newBook.title = bookFormData.get("title");
    newBook.author = bookFormData.get("author");
    newBook.pages = bookFormData.get("pages");
    newBook.published = bookFormData.get("published");
    newBook.genre1 = bookFormData.get("genre1");
    if (bookFormData.get("genre2")) {newBook.genre2 = bookFormData.get("genre2")};
    bookFormData.get("read") ? newBook.read = 1 : newBook.read = 0;
    addBook(newBook);
    displayBook(newBook);
    modal.style.display = "none";
})

/* -- Modal -- */
let modalBtn = document.querySelector("#add");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close");

modalBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(e) {
    if(e.target == modal) {
        modal.style.display = "none";
    }
}

/* -- Default Display Books -- */
const fromBloodAndAsh = new Book("From Blood and Ash", "Jennifer Armentrout", 0, 625, 2020, "fantasy", "romance");
const theLastEmperox = new Book("The Last Emperox", "John Scalzi", 0, 320, 2020, "scifi");
const whenNoOneIsWatching = new Book("When No One Is Watching", "Alyssa Cole", 0, 352, 2020, "thriller", "mystery");
const theHennaArtist = new Book("The Henna Artist", "Alka Joshi", 0, 384, 2020, "historical");

if (myLibrary.length < 1) {
    addBook(fromBloodAndAsh);
    addBook(theLastEmperox);
    addBook(whenNoOneIsWatching);
    addBook(theHennaArtist);
}

loadBooks();