
function add() {
    const input = document.getElementById("input");
    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task"><span class="text">${taskText} </span>
      
       <span><button class="one" onclick="deleteTask(this)">Done✅</button></span>
      
      </div>
    `;

    document.getElementById("tasklist").appendChild(li);
    input.value = "";
  }

  function deleteTask(button) {
    const li = button.closest("li");
    li.remove();
  }