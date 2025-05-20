let inputTask = document.getElementById("inputTask");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todos");

let editing = null;  // flag to track the editing task

/* Adding the todo as a list item with an edit button and a delete button */

addBtn.addEventListener("click",function(){
    if(inputTask.value.trim() == ""){
        alert("Please enter a To-Do");
    }


    else if(editing){
        editing.querySelector("span").innerText = inputTask.value;
        editing = null;
        addBtn.innerText = 'Add';
        inputTask.value = "";
        saveData();
    }

    else{
      
        let li = document.createElement("li");

        let todoContent = document.createElement("span");
        todoContent.innerText = inputTask.value;
        li.appendChild(todoContent);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("editBtn");
        li.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.classList.add("deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputTask.value = "";
        saveData();
    }

});

/* Adding Edit and remove functionality */

todoList.addEventListener("click",function(event){
    let target = event.target;

    // Adding strike-through on clicking on the task
    if(target.tagName == "SPAN" ){
        target.classList.toggle("strikeThrough");
    }


    // EDIT FUNCTIONALITY
    else if(target.classList.contains("editBtn")){
        editing = target.parentElement;
        let taskInput = editing.querySelector("span");

        addBtn.innerText = "Edit";
        inputTask.value = taskInput.innerText;
        inputTask.focus(); 
        saveData();                           
    }

    // DELETE FUNCTIONALITY
    else if(target.classList.contains("deleteBtn")){
        const parent = target.parentElement;
        if (editing == parent) {
            // Cancel editing if the task being edited is deleted
            editing = null;
            addBtn.innerText = "Add";
            inputTask.value = "";
            inputTask.setAttribute("readonly", "true");
        }
        parent.remove();
    }
});


// Saving the data on local storage of user 
function saveData(){
    localStorage.setItem("data",todoList.innerHTML);
}

//Retrieving data everytime the user opens the page
function getData(){
    todoList.innerHTML = localStorage.getItem("data");
}

getData();