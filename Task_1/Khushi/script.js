const input = document.getElementById("input");
const Btn = document.getElementById("Btn");
const todoList = document.getElementById("todoList");

let listEdit = null; //to edit the todos

// Function for Add button
const Addbtn = () =>{
    if(input.value === ""){
        alert("Add Something to your to-do list");
    }
    // Editing the todo
    else if(Btn.innerHTML === "Edit"){
        listEdit.querySelector("p").innerText = input.value;
        listEdit = null;
        Btn.innerHTML = 'Add';
        input.value = "";
        saveTodos();
    }
    // adding a new todo
    else{
    let list = document.createElement("li");
    let task = document.createElement("p");
    task.innerHTML = input.value;

    todoList.appendChild(list);
    list.appendChild(task);
    
    // Creating buttons to edit and delete the todos
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn","editBtn");
    list.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("btn","deleteBtn");
    list.appendChild(deleteBtn);

    input.value="";
    saveTodos();
    }
    
}

todoList.addEventListener("click", function(event){
    let target = event.target;

    if(target.innerHTML === "Edit"){
        listEdit = target.parentElement; // storing the current task's list item
        input.value = listEdit.querySelector("p").innerText; // setting input value
        Btn.innerHTML = "Edit"; // To change main button text
        input.focus(); //To move the cursor to the input
    }
    else if(target.innerHTML === "Delete"){
        const parent = target.parentElement;
        if (listEdit == parent) {
            listEdit = null;
            Btn.innerText = "Add";
            input.value = "";
        }
        parent.remove();
        saveTodos(); //
    }
});

// To save the todos
function saveTodos(){
    localStorage.setItem("data",todoList.innerHTML);
}

// To get the todos 
function getTodos(){
    todoList.innerHTML = localStorage.getItem("data");
}

Btn.addEventListener("click", Addbtn);
getTodos();