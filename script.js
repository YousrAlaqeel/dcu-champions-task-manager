// Select necessary DOM elements
const todoList = document.getElementById('todo-list');  // Select the task list
const inputField = document.getElementById('todo-input');  // Select the input field
const addButton = document.getElementById('add-btn');  // Select the "Add Task" button



// Function to add a new task
function addTask() {
    const taskText = inputField.value; // Get the value from the input field

    if (taskText !== "") {
        const newTask = document.createElement('li');
        newTask.innerHTML = `${taskText} <button class="delete-btn">Delete</button>`;
        todoList.appendChild(newTask);

        // Save task to localStorage
        saveTaskToLocalStorage(taskText);

        inputField.value = ""; // Clear the input field after adding the task
    }
}

function saveTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `${task} <button class="delete-btn">Delete</button>`;
        todoList.appendChild(newTask);
    });
}


// Add event listener for the "Add Task" button
addButton.addEventListener('click', addTask);

// Handle delete button click event (for dynamically added tasks)
todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
});

loadTasks();

todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        removeTaskFromLocalStorage(taskItem.textContent.replace('Delete', '').trim());
        taskItem.remove();
    }
});

function removeTaskFromLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
