let tasks_arr = JSON.parse(localStorage.getItem("tasks_arr")) || [];
let totalTasks = tasks_arr.length;

// check icon
function myfunction(clickedButton) {
  const check_colour = window.getComputedStyle(clickedButton).color;
  const parentBox = clickedButton.closest(".lists-box");
  const text = parentBox.querySelector("p");

  if (check_colour === "rgb(0, 128, 0)") {
    clickedButton.style.color = "black";
    parentBox.style.color = "black";
    text.style.textDecoration = "none";
  } else {
    clickedButton.style.color = "green";
    parentBox.style.color = "green";
    text.style.textDecoration = "line-through";
  }
}

// task box
function create_element(taskText) {
  const newElement = document.createElement("div");
  newElement.classList.add("lists-box");

  const fileIcon = document.createElement("i");
  fileIcon.className = "fa-solid fa-file fa";
  newElement.appendChild(fileIcon);

  const paraTag = document.createElement("p");
  paraTag.className = "task-text";
  paraTag.innerText = taskText;
  newElement.appendChild(paraTag);

  const checkIcon = document.createElement("i");
  checkIcon.className = "fa-solid fa-circle-check fa";
  checkIcon.setAttribute("onclick", "myfunction(this)");
  newElement.appendChild(checkIcon);

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash fa";
  deleteIcon.setAttribute("onclick", "delete_one(event)");
  newElement.appendChild(deleteIcon);

  document.getElementById("tasks").appendChild(newElement);
}

// Save task to local storage
function save_task() {
  localStorage.setItem("tasks_arr", JSON.stringify(tasks_arr));
}

// Add new task bu user
function add_task(event) {
  event.preventDefault();
  let task = document.getElementById("task-add-box").value.trim();
  if (!task) return;

  let obj = { text: task };
  tasks_arr.push(obj);
  save_task();

  totalTasks++;
  create_element(task);

  document.getElementById("task-add-box").value = "";
  document.getElementById("task").innerText = "Total Tasks: " + totalTasks;
}

// Delete single task
function delete_one(event) {
  const taskText = event.target.parentElement.querySelector("p").textContent;
  event.target.parentElement.remove();

  tasks_arr = tasks_arr.filter((task) => task.text !== taskText);
  save_task();

  totalTasks--;
  document.getElementById("task").innerText = "Total Tasks: " + totalTasks;
}

// Delete all tasks
function delete_all() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    localStorage.clear();
    document.getElementById("task-list").innerHTML = "";
    tasks_arr = []; 
    totalTasks = 0;
    document.getElementById("task").innerText = "Total Tasks: 0";
  }
}

// render all saved tasks
window.addEventListener("load", () => {
  if (tasks_arr.length > 0) {
    for (let i = 0; i < tasks_arr.length; i++) {
      create_element(tasks_arr[i].text);
    }
  }
  document.getElementById("task").innerText = "Total Tasks: " + totalTasks;
});

document.getElementById("task-form").addEventListener("submit", add_task);
