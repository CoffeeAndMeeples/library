const myLibrary = [];

//constructor to create the Book object
//title, author, pages, read
function Book(title, author, pageCount) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pageCount;
    this.read = "Unread";
    this.id = self.crypto.randomUUID();
}
//create prototype function to toggle this.read to "Have Read"
Book.prototype.haveRead = function() {
    if (this.read === "Have Read") {
        this.read = "Unread";
    }
    else {
        this.read = "Have Read";
    }
}
// create 2 books and add them to myLibrary to help with creating the display
const fakeBook1 = new Book("Fake Book", "Jazz Person", 112);
const fakeBook2 = new Book("Real Book", "Bebop Dude", 309);
myLibrary.push(fakeBook1);
myLibrary.push(fakeBook2);


//event listener that creates variables from the form and creates a book


const myForm = document.querySelector("form");
myForm.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
  
    const formData = new FormData(myForm);
    // confirm book isn't already in myLibrary
    for (let book of myLibrary) {
        if (book.title === formData.get("title")) {
            alert("That book already exists in your library!")
            displayLibrary();
            return
        }
    }
    
    const newBook = new Book(formData.get("title"), formData.get("author"), formData.get("pageCount"), "unkown");
    myLibrary.push(newBook);
    // refresh the library table
    displayLibrary();
})

//function to create table full of books
function displayLibrary() {
    //TODO populate the library header
    const head = document.querySelector("thead");
    const body = document.querySelector(".display");
    const rows = document.querySelectorAll("tr");
    

    
    

    for (let book of myLibrary) {
        
        // check to see if book is already displayed in table
        //loop through title column of table and compare with book.title
        let populated = false;

        rows.forEach((row) => {
            if (book.title == row.firstChild.textContent) {
                populated = true;
            }
        })
        
        //const rows = body.rows;
       
    
        //if book isn't in table, make a new row
        if (populated == false) {
            const row = document.createElement("tr");
            for (let item in book) {
                if (book.hasOwnProperty(item)) {
                    data = document.createElement("td");
                    data.textContent = book[item];
                    row.appendChild(data);
                }
            }
            //add a button in the last cell to remove
            const finalCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove Book";
            //add an event listener to the button
            removeButton.addEventListener("click", function(event) {
                //get the row and the text from the title column
                let thisRow = event.target.closest("tr");
                let rowBookTitle = thisRow.firstChild.textContent;
                //remove row from table myLibrary  
                removeBook(rowBookTitle);
                //remove row from Dom
                thisRow.parentNode.removeChild(thisRow);
            })

            finalCell.appendChild(removeButton);
            row.appendChild(finalCell);
            //add a button to mark book as read
            const actualFinalCell = document.createElement("td");
            const markAsReadButton = document.createElement("button");
            markAsReadButton.textContent = "Mark as Read";
            markAsReadButton.addEventListener("click", function(event) {
                //change the Read cell in table
                let thisRow = event.target.closest("tr");
                let readCell = thisRow.children[3];
                if (readCell.textContent === "Have Read") {
                    readCell.textContent = "Unread"
                    markAsReadButton.textContent = "Mark as Read";
                    alert("Warning: That which has been read may not truly be unread!")
                }
                else {
                    readCell.textContent = "Have Read"
                    markAsReadButton.textContent = "Mark as Unread";
                }
                
                //change the read attribute of corresponding book
                for (let book of myLibrary) {
                    if (book.title === thisRow.firstChild.textContent) {
                        book.haveRead();
                    }
                }
            })
            actualFinalCell.appendChild(markAsReadButton);
            row.appendChild(actualFinalCell);
           

            // add the row to the table
            body.appendChild(row);
        }
    }
}
 function removeBook(title) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            myLibrary.splice(i, 1);
        }
    }
 }
 


//'New Book' button that brings up a form for user to input details of new book

//Initialize the page with the existing library
displayLibrary();