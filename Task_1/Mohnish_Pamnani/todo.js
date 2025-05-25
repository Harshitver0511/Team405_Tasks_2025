const addBtn = document.getElementById("addTask");
const showdiv = document.getElementById("showTodo");
const newTask = document.getElementById("task");
let taskno = 0;
let tasks = false;
let currentEditTask = null;

// Adding new Task
addBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    
    if (newTask.value != '') {
        if (addBtn.innerText === "Add") {
            taskno++;
            const div = document.createElement("div");
            div.classList.add(`todo`, `task${taskno}`);
            div.innerHTML = `
                <ul> 
                    <li> 
                        <p class="text${taskno}">${newTask.value}</p> 
                        <button class="editBtn" id="edittask${taskno}">Edit</button> 
                        <button class="removeBtn" id="removetask${taskno}">Remove</button>
                    </li>
                </ul>`;
            showdiv.append(div);
            newTask.value = '';
            
            // Add event listener for the new remove button
            const removeBtn = document.querySelector(`#removetask${taskno}`);
            removeBtn.addEventListener("click", () => {
                deleteTask(removeBtn.id);
            });
            
            // Add event listener for the new edit button
            const editBtn = document.querySelector(`#edittask${taskno}`);
            editBtn.addEventListener("click", () => {
                editTask(editBtn.id);
            });
        } else {
            // Edit the task being edited
            const taskText = document.querySelector(`.text${currentEditTask}`);
            taskText.innerText = newTask.value;
            newTask.value = '';
            addBtn.innerText = "Add";
            currentEditTask = null;
        }
    }
});

// Deleting Existing Task
const deleteTask = (rno) => {
    const todono = rno.replace("removetask", '');
    const tododiv = document.querySelector(`.task${todono}`);
    if (tododiv) {
        tododiv.remove();
    }
}

// Editing Existing Task
const editTask = (eno) => {
    currentEditTask = eno.replace("edittask", '');
    const taskText = document.querySelector(`.text${currentEditTask}`).innerText;
    newTask.value = taskText;
    newTask.focus();
    addBtn.innerText = "Edit";
}