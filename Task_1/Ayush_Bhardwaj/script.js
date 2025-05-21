let tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];
window.onload = function () {
    tasksList.forEach((task, index) => appendTask(task, index));
};
function addTask() {
    let task = document.getElementById("taskInput").value;
    let taskDate = document.getElementById("taskDate").value;
    console.log(taskDate);
    if (task === "" || taskDate === "") {
        alert("Please fill in both fields.");
        return;
    }
    let showDate = taskDate;
    {
        const [yyyy, mm, dd] = taskDate.split("-");
        showDate = `${dd}-${mm}-${yyyy}`;
    }
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    let taskObj = {
        task: task,
        date: showDate,
        realDate: taskDate,
        curdate: formattedDate.toString(),
    };

    tasksList.push(taskObj);
    appendTask(taskObj, tasksList.length - 1);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

function appendTask(task, index) {

    let li = document.createElement("li");
    li.className = "grid-row tasks"
    li.innerHTML = `
                <span>${task.task}</span>
                <span>${task.curdate}</span>
                <span>${task.date}</span>
                <span>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </span>`;
    document.getElementById("taskList").appendChild(li);
}
function editTask(task) {
    let edit = document.getElementById("editPanel");
    edit.classList.toggle("none");
    document.querySelector(".main-content").classList.toggle("none");
    document.getElementById("editTaskInput").value = tasksList[task].task;
    document.getElementById("editTaskDate").value = tasksList[task].realDate;
    edit.setAttribute("data-index", task);

}
function saveEdit() {
    let edit = document.getElementById("editPanel");
    edit.classList.toggle("none");
    document.querySelector(".main-content").classList.toggle("none");
    let tname = document.getElementById("editTaskInput").value;
    let tdate = document.getElementById("editTaskDate").value;
    let index = edit.getAttribute("data-index");
    if (tname === "" || tdate === "") {
        alert("Please fill in both fields.");
        return;
    }
    let showDate = tdate;
    {
        const [yyyy, mm, dd] = tdate.split("-");
        showDate = `${dd}-${mm}-${yyyy}`;
    }
    tasksList[index].task = tname;
    tasksList[index].date = showDate;
    tasksList[index].realDate = tdate;
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    let allTasks = document.querySelectorAll(".tasks");
    allTasks[index].innerHTML = `
                <span>${tname}</span>
                <span>${tasksList[index].curdate}</span>
                <span>${showDate}</span>
                <span>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </span>
    `;

}
function cancelEdit() {
    document.getElementById("editPanel").classList.toggle("none");
    document.querySelector(".main-content").classList.toggle("none");
}
function deleteTask(index) {
    let confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) {
        return;
    }
    tasksList.splice(index, 1);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    document.querySelectorAll(".tasks")[index].remove();

    for (let i = index; i < tasksList.length; i++) {
        document.querySelectorAll(".edit-btn")[i].setAttribute("onclick", `editTask(${i})`);
        document.querySelectorAll(".delete-btn")[i].setAttribute("onclick", `deleteTask(${i})`);
    }
}