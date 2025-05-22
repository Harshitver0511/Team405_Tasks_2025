function addTask() {
    const checkbox = document.createElement('input');
    const li = document.createElement('li');
    const input = document.getElementById('inp');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    checkbox.type = 'checkbox';
    checkbox.onchange = () => {
      if (checkbox.checked) {
        span.style.textDecoration = 'line-through';
      } else {
        span.style.textDecoration = 'none';
      }
    };

    const span = document.createElement('span');
    span.textContent = taskText;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => li.remove();

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-item';
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(span);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskContainer);
    li.appendChild(actions);
    document.getElementById('taskList').appendChild(li);

    input.value = '';
  }

  function editTask(span) {
    const newTask = prompt('Edit your task:', span.textContent);
    if (newTask !== null) {
      span.textContent = newTask.trim();
    }
  }
