const input = document.getElementById('task-input');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('task-list');

let taskBeingEdited = null; // Track the task being edited

// Load tasks from localStorage
window.addEventListener('DOMContentLoaded', loadTasks);

// Add or update task on button click
addBtn.addEventListener('click', () => {
  const inputText = input.value.trim();

  if (!inputText) return; // Do nothing if input is empty

  if (taskBeingEdited) {
    // If editing, update the task
    taskBeingEdited.querySelector('span').textContent = inputText;

    const index = taskBeingEdited.getAttribute('data-index');
    const tasks = getTasks();
    tasks[index].text = inputText;
    saveTasks(tasks);

    resetEditMode(); // Reset to add mode
  } else {
    // If adding a new task
    addTask(inputText);
  }
});

// Add task through Enter key
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});

// Function to add task; defined edit and delete buttons
function addTask(taskText, index = null, completed = false) {
  const li = document.createElement('li');

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    textSpan.classList.toggle('completed', checkbox.checked);

    const tasks = getTasks();
    tasks[li.getAttribute('data-index')].completed = checkbox.checked;
    saveTasks(tasks);
  });

  const textSpan = document.createElement('span');
  textSpan.textContent = taskText;
  if (completed) textSpan.classList.add('completed');

  taskContent.appendChild(checkbox);
  taskContent.appendChild(textSpan);

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group');

  const editBtn = document.createElement('button');
  editBtn.textContent = '✎';
  editBtn.classList.add('btn', 'edit-btn');
  editBtn.addEventListener('click', () => {
    input.value = textSpan.textContent;
    input.focus();
    addBtn.textContent = 'Update';
    taskBeingEdited = li;
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '×'; 
  deleteBtn.classList.add('btn', 'delete-btn');
  deleteBtn.addEventListener('click', () => {
    const index = li.getAttribute('data-index');
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
    if (taskBeingEdited === li) resetEditMode();
  });

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(taskContent);
  li.appendChild(btnGroup);

  const taskIndex = index !== null ? index : getTasks().length;
  li.setAttribute('data-index', taskIndex);
  taskList.appendChild(li);

  // Save task
  if (index === null) {
    const tasks = getTasks();
    tasks.push({ text: taskText, completed: checkbox.checked });
    saveTasks(tasks);
  }

  input.value = ''; // Clear input
}

// Reset to default "add" mode
function resetEditMode() {
  taskBeingEdited = null;
  input.value = '';
  addBtn.textContent = 'Add';
}

// Retrieve tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks array to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear and re-render task list from storage
function renderTasks() {
  taskList.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    addTask(task.text, index, task.completed);
  });
}

// Load tasks on page load
function loadTasks() {
  renderTasks();
}
