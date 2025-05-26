const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = [];
let editIndex = null;

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const item = document.createElement('div');
        item.className = 'todo-item';

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo;
        item.appendChild(text);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => startEdit(idx);
        actions.appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeTodo(idx);
        actions.appendChild(removeBtn);

        item.appendChild(actions);
        todoList.appendChild(item);
    });
}

function addTodo() {
    const value = input.value.trim();
    if (!value) return;
    if (editIndex !== null) {
        todos[editIndex] = value;
        editIndex = null;
        addBtn.textContent = 'Add';
    } else {
        todos.push(value);
    }
    input.value = '';
    renderTodos();
}

function removeTodo(idx) {
    todos.splice(idx, 1);
    renderTodos();
}

function startEdit(idx) {
    input.value = todos[idx];
    editIndex = idx;
    addBtn.textContent = 'Update';
    input.focus();
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTodo();
});

renderTodos();
