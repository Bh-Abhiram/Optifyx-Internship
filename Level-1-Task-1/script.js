let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const message = document.getElementById("message");

function showMessage(text, duration = 1500) {
  message.textContent = text;
  message.classList.remove("hidden");
  setTimeout(() => message.classList.add("hidden"), duration);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="removeTask(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
    showMessage("✅ Task added!");
  } else {
    showMessage("⚠️ Please enter something!", 2000);
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showMessage("🗑️ Task removed!");
}

// Add event listeners
document.getElementById("add-btn").addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
