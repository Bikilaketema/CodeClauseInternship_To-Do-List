// Get references to the elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Add event listener for the "keydown" event on the input field
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
});

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    addTaskToList(task);
  });
}

function addTask() {
    const taskText = taskInput.value.trim();
  
    if (taskText === '') {
      alert('Please enter a task before adding.'); // Show an alert for empty input
      return;
    }
  
    addTaskToList({ text: taskText }); // Pass the task as an object with the text property
    saveTasksToLocalStorage();
  
    // Clear the input field after adding the task
    taskInput.value = '';
  }
  
  function addTaskToList(task) {
    const li = document.createElement('li');
  
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
  
    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = task.text;
  
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      editTask(li, task);
    });
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTask(li);
    });
  
    taskContainer.appendChild(taskTextElement);
    taskContainer.appendChild(editBtn);
    taskContainer.appendChild(deleteBtn);
    li.appendChild(taskContainer);
    taskList.appendChild(li);
  }

function editTask(li, task) {
  const editedTaskText = prompt('Edit the task:', task.text);

  if (editedTaskText !== null) {
    task.text = editedTaskText;
    li.querySelector('.task-text').textContent = editedTaskText;
    saveTasksToLocalStorage();
  }
}

function deleteTask(li) {
  li.remove();
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map((li) => {
    const taskText = li.querySelector('.task-text').textContent;
    return { text: taskText };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
