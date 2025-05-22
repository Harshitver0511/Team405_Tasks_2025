document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#addBtn");
  const input = document.querySelector("#input");
  const tasks = document.querySelector("#tasks");
  const toggle = document.querySelector("#content");

  const toggleContent = () => {
    toggle.style.display = tasks.children.length === 0 ? "block" : "none";
  };

  // Function to handle Add Task (initial state)
  function addTask() {
    const content = input.value.trim();
    if (!content) {
      return alert("Please enter a task!");
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="content">${content}</div>
      <div class="btns">
        <button class="editBtn"><i class="fa-solid fa-pen"></i></button>
        <button class="delBtn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    tasks.appendChild(li);
    input.value = ""; // Clear the input

    // Delete Task functionality
    const delBtn = li.querySelector(".delBtn");
    delBtn.addEventListener("click", () => {
      li.remove();
      toggleContent();
    });

    // Edit Task functionality
    const editBtn = li.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      // Move task content to the input for editing
      input.value = content;
      addBtn.innerHTML = `<i class="fa-solid fa-check"></i> Save Task`; // Change icon

      // Remove the "Add Task" functionality and switch to "Save Task"
      addBtn.removeEventListener("click", addTask);
      addBtn.addEventListener("click", () => {
        const newContent = input.value.trim();
        if (newContent) {
          li.querySelector(".content").textContent = newContent; // Update the task content in the same li
        }
        input.value = ""; // Clear the input field
        addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Task`; // Change back to Add Task icon

        // Return add functionality back to the button
        addBtn.removeEventListener("click", arguments.callee);
        addBtn.addEventListener("click", addTask);
      });

      toggleContent();
    });

    toggleContent(); // Check if we need to toggle the content message
  }

  // Initial Add Task button listener
  addBtn.addEventListener("click", addTask);

  // Initial toggle check (for no tasks)
  toggleContent();
});
