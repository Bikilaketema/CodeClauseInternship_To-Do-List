// Get reference to the task list
const taskList = document.getElementById('ttaskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
});

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks.length === 0) {
    // Show "No available tasks" when tasks list is empty
    headerText.textContent = "No available tasks";
  } else {
  tasks.forEach((task) => {
    addTaskToList(task);
  });
}}

function addTaskToList(task) {
  const li = document.createElement('li');
  li.textContent = task.text; // Use task.text to access the task's text property
  taskList.appendChild(li);
}


