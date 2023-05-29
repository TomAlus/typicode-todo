const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const todosLimit = 10;

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

const toggleCompleted = (e) => {
  e.target.classList[0]
    ? e.target.classList.remove('done')
    : e.target.classList.add('done');

  updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
};

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const deleteTodo = (e) => {
  fetch(`${apiUrl}/${e.target.dataset.id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(() => e.target.remove())
    .catch((error) => console.log(error));
};

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodos);
  todoList.addEventListener('click', toggleCompleted);
  todoForm.addEventListener('submit', createTodo);
  todoList.addEventListener('dblclick', deleteTodo);
};

init();
