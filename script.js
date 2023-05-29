const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const todosLimit = 5;

let todoForm = document.getElementById('todo-form');
let todoList = document.getElementById('todo-list');
let todoInput = document.getElementById('todo-input');

const getTodos = () => {
  fetch(`${apiUrl}?_limit=${todosLimit}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => addTodoToDOM(todo));
    })
    .catch((error) => console.log(error));
};

const addTodoToDOM = (todo) => {
  const div = document.createElement('div');
  div.setAttribute('data-id', todo.id);
  div.appendChild(document.createTextNode(todo.title));

  if (todo.completed) {
    div.classList.add('done');
  }

  todoList.appendChild(div);
};

const createTodo = (e) => {
  e.preventDefault();

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      addTodoToDOM(data);
      todoInput.value = '';
    })
    .catch((error) => console.log(error));
};

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodos);
  todoForm.addEventListener('submit', createTodo);
};

init();
