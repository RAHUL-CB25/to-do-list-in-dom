var todoInput = document.getElementById("todoInput");
var addBtn = document.getElementById("addBtn");

var todoList = document.getElementById("todoList");
var completedList = document.getElementById("completedList");
var draggedItem = null;

function addTodo() {
  var taskText = todoInput.value.trim();
  if (taskText === "") {
    return;
  }
  createTodo(taskText);
  todoInput.value = "";
}

function createTodo(taskText) {
  var li = document.createElement("li");
  li.draggable = true;
  var task = document.createElement("span");
  task.textContent = taskText;

  var completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.addEventListener("click", function () {
    completeTodo(li, task);
  });

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteTodo(li);
  });

  li.className = "flex items-center justify-between bg-blue-50 border p-4";
  task.className = "text-gray-800 font-medium flex-1";
  completeBtn.className = "bg-green-500 text-white px-3 py-1 mx-1";
  deleteBtn.className = "bg-red-500 text-white px-3 py-1 mx-1";

  li.appendChild(task);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);

  li.addEventListener("dragstart", function () {
    draggedItem = li;
  });

  li.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  li.addEventListener("drop", function () {
    if (draggedItem !== li) {
      todoList.insertBefore(draggedItem, li);
    }
  });
}

function completeTodo(li, task) {
  task.classList.add("line-through");
  completedList.appendChild(li);
}

function deleteTodo(li) {
  li.remove();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
