//todo eleman ekleme

//Eleman seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

// load items
loadItems();

eventListners();

function eventListners() {
  //submit event
  form.addEventListener("submit", addNewItem);
  //delete event
  taskList.addEventListener("click", deleteItem);
  //delete all
  btnDeleteAll.addEventListener("click", deleteAllItems);
}
function loadItems() {
  todos = getItemsFromLS();
  todos.forEach(function (item) {
    createItem(item);
  });
}
//getitems from local storage
function getItemsFromLS() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
// set ıtem ls
function setItemtoLS(newTodo) {
  todos = getItemsFromLS();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createItem(newTodo) {
  //li oluşturma
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(newTodo));

  //a oluşturma
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>;';
  li.appendChild(a);
  taskList.appendChild(li);
}
function addNewItem(e) {
  if (input.value === "") {
    // console.log("submit");
    alert("add a new item");
  }
  //createItem
  createItem(input.value);
  setItemtoLS(input.value);

  input.value = "";
  e.preventDefault();
}

//Silme işlemi

function deleteItem(e) {
  if (confirm("Silmek ister misiniz?"))
    if (e.target.className === "fas fa-times") {
      //silmek için parente gidecez burada li
      e.target.parentElement.parentElement.remove();
    }
  // console.log(e.target);
  e.preventDefault();
}

//delete All

function deleteAllItems(e) {
  if (confirm("tüm elemanları silmek ister misiniz?")) {
    taskList.childNodes.forEach(function (item) {
      if (item.nodeType === 1) {
        item.remove();
      }
    });
  }
  //taskList.innerHTML = ""; //alternatif
}
