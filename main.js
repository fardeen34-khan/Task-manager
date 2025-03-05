class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskInput = document.getElementById('taskInput');
    this.taskList = document.getElementById('taskList');
    this.addButton = document.getElementById('addButton');

    this.addButton.addEventListener('click', () => this.addTask());
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    this.renderTasks();
  }

  addTask() {
    const taskText = this.taskInput.value.trim();
    if (taskText === '') return;

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
    this.taskInput.value = '';
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  renderTasks() {
    this.taskList.innerHTML = '';
    
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => this.toggleTask(task.id));

      const taskText = document.createElement('span');
      taskText.className = 'task-text';
      taskText.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      this.taskList.appendChild(li);
    });
  }
}

// Initialize the Task Manager
new TaskManager();