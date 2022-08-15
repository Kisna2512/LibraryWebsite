console.log("Welcome to the JavaScript");
ShowBooks();
//Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}
//Display Constructor
function Display() {}

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e, book) {
  let addBook = document.getElementById("bookName");
  let addAuthor = document.getElementById("author");

  let table = localStorage.getItem("table");
  let BookType = document.getElementById("Type");

  if (table == null) {
    tableObj = [];
  } else {
    tableObj = JSON.parse(table);
  }

  let myObj = {
    Bookname: addBook.value,
    BookAuthor: addAuthor.value,
    BookType: BookType.value,
  };
  tableObj.push(myObj);
  localStorage.setItem("table", JSON.stringify(tableObj));
  addBook = "";
  addAuthor = "";
  BookType = "";
});

Display.prototype.add = function (book) {
  console.log("Adding to UI");
  ShowBooks();
};

function ShowBooks() {
  let tableBody = document.getElementById("tableBody");
  let table = localStorage.getItem("table");
  if (table == null) {
    tableObj = [];
  } else {
    tableObj = JSON.parse(table);
  }

  let html = "";
  tableObj.forEach(function (element, index) {
    html += `<tr class="tableCart">
                        <td>${element.Bookname}</td>
                        <td>${element.BookAuthor}</td>
                        <td>${element.BookType}</td>
                        
                       <td> <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Book</button></td>
                    </tr>
            `;
  });

  let tableElm = document.getElementById("tableBody");
  if (tableObj.length != 0) {
    tableElm.innerHTML = html;
  } else {
    tableElm.innerHTML = `Nothing to show! Use "Add a Book" section above to add Books.`;
  }
}

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length == 0 || book.type.length == 0) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displaymessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>Message: </strong>${displaymessage}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
};

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your Book is Added Succesully");
  } else {
    display.show("danger ", "Your Book Cannot Added");
  }

  display.clear();
  console.log(book);
  console.log("You Have Submitted the form");

  e.preventDefault();
}

function deleteNote(index) {
  //   console.log("I am deleting", index);

  let table = localStorage.getItem("table");
  if (table == null) {
    tableObj = [];
  } else {
    tableObj = JSON.parse(table);
  }

  tableObj.splice(index, 1);
  localStorage.setItem("table", JSON.stringify(tableObj));
  ShowBooks();
}

// let search = document.getElementById("searchTxt");

// search.addEventListener("input", function () {
//   let inputVal = search.value.toLowerCase();
//   // console.log('Input event fired!', inputVal);
//   let noteCards = document.getElementsByClassName("tableCart");
//   Array.from(noteCards).forEach(function (element) {
//     let cardTxt = element.getElementsByTagName("p")[0].innerText;
//     if (cardTxt.includes(inputVal)) {
//       element.style.display = "block";
//     } else {
//       element.style.display = "none";
//     }
//     // console.log(cardTxt);
//   });
// });

const searchInput = document.addEventListener("searchTxt");
searchInput.addEventListener("input", (e) => {
  console.log("Searching...");

  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
  } else {
  }
});
