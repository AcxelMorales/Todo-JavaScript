import Todo from "../classes/todo.class";
import { todoList } from "../index";

const divTodoList = document.querySelector(".todo-list");
const input = document.querySelector(".new-todo");
const btnClear = document.querySelector(".clear-completed");
const filters = document.querySelector(".filters");
const aTags = document.querySelectorAll(".filtro");

export const createTodoHTML = (todo) => {
  const todoHTML = `
    <li class='${todo.completed ? "completed" : ""}' data-id='${todo.id}'>
        <div class='view'>
            <input class='toggle' type='checkbox' ${
              todo.completed ? "checked" : ""
            }>
            <label>${todo.task}</label>
            <button class='destroy'></button>
        </div>
        <input class='edit' value='Create a TodoMVC template'>
    </li>`;

  const div = document.createElement("div");
  div.innerHTML = todoHTML;
  divTodoList.append(div.firstElementChild);

  return div;
};

input.addEventListener("keyup", (evt) => {
  if (evt.keyCode === 13 && input.value.length > 0) {
    const todo = new Todo(input.value);
    todoList.addTodo(todo);
    createTodoHTML(todo);

    input.value = null;
  }
});

divTodoList.addEventListener("click", (evt) => {
  const elementName = evt.target.localName;
  const todoElement = evt.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute("data-id");

  if (elementName.includes("input")) {
    todoList.toggleTodo(todoId);
    todoElement.classList.toggle("completed");
  } else if (elementName.includes("button")) {
    todoList.deleteTodo(todoId);
    divTodoList.removeChild(todoElement);
  }
});

btnClear.addEventListener("click", () => {
  todoList.clearCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const e = divTodoList.children[i];

    if (e.classList.contains("completed")) {
      divTodoList.removeChild(e);
    }
  }
});

filters.addEventListener("click", (evt) => {
  const filter = evt.target.text;

  if (!filter) return;

  aTags.forEach((tag) => tag.classList.remove("selected"));
  evt.target.classList.add("selected");

  for (const e of divTodoList.children) {
    e.classList.remove("hidden");
    const completed = e.classList.contains("completed");

    switch (filter) {
      case "Pendientes":
        if (completed) e.classList.add("hidden");
        break;
      case "Completados":
        if (!completed) e.classList.add("hidden");
        break;
    }
  }
});
