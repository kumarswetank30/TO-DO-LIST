const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const PendingCount = document.getElementById('pending-count');
const CompletedCount = document.getElementById('completed-count');
const filterButtons = document.querySelectorAll('.filter-btn');



  let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

form.addEventListener('submit',function(e){
    e.preventDefault();

    const taskText = input.value.trim();

        if(!taskText) {alert ("Please enter a task");
        return;
        }
    const newtask = {
        id:Date.now(),
        text:taskText,
        completed:false,
    };

    tasks.push(newtask);
    saveTasks()

    renderTask(newtask);
    input.value = ''; 
})

function renderTask(task){
    updateCount()
    const li = document.createElement('li')
    li.classList.add('task-item')
    li.innerHTML = `
        <label class="task-info">
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${task.text}</span>
        </label>

        <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>`;
        li.querySelector('.delete-btn').addEventListener('click',function(){
            tasks = tasks.filter(t => t.id !== task.id)
            saveTasks()
            li.remove()
            updateCount()
        })
        const checkbox =li.querySelector('.task-checkbox')
        checkbox.checked = task.completed;
        checkbox.addEventListener('change',function(){
            task.completed = checkbox.checked
            saveTasks()
            updateCount()
        })
    taskList.appendChild(li);
}

function updateCount(){
    const pending = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    PendingCount.textContent = pending;
    CompletedCount.textContent = completed;
}

filterButtons.forEach(button =>{
    button.addEventListener ('click',function() {
    const selectedFilter = button.dataset.filter;
    console.log(selectedFilter)
    filterButtons.forEach(btn => {
        btn.classList.remove('active')
       
    })
     button.classList.add('active')
     taskList.innerHTML = '';
     let filteredTasks;
     if(selectedFilter==='all'){
        filteredTasks = tasks
     }else if(selectedFilter === 'pending'){
        filteredTasks = tasks.filter(t => !t.completed)
     } else if(selectedFilter === 'completed'){
        filteredTasks = tasks.filter(t => t.completed)}
       filteredTasks.forEach(task => {
            renderTask(task)
        })
    })
})

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

tasks.forEach(task => {
    renderTask(task)
})
updateCount()

