document.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector("#addBtn");
  let input = document.querySelector("#input");
  let tasks = document.querySelector("#tasks");
  let toggle = document.querySelector("#content");

  const toggleContent = () => {
    if (tasks.children.length === 0) {
      toggle.style.display = "block";
    } else {
      toggle.style.display = "none";
    }
  };

  const addTask = ()=>{

  
  
    let content = input.value.trim();
    if (!content) {
      return alert("Please enter a task!");
    }
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="content">${content}</div>
        <div class="btns">
        <button class="editBtn"><i class="fa-solid fa-pen"></i></button>
        <button class="delBtn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

    tasks.appendChild(li);
    input.value = "";

    let delBtn = li.querySelector(".delBtn");
    delBtn.addEventListener("click", () => {
      li.remove();

      toggleContent();
    });

    let editBtn = li.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      input.value = content;
      addBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
 addBtn.removeEventListener("click", addTask);
      addBtn.addEventListener("click", () => {
        
        const newContent = input.value.trim();
        if (newContent) {
          li.querySelector(".content").textContent = newContent;}
          input.value = "";
          addBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  addBtn.removeEventListener("click", arguments.callee);
        addBtn.addEventListener("click", addTask);          
        
      });

      toggleContent();
    });
  


    toggleContent();

  }
  addBtn.addEventListener("click",addTask)
toggleContent()
});
