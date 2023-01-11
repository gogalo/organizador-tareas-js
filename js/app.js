//buttons
const btnOpen = document.querySelector(".add-new");
const btnClose = document.querySelector(".close");
const addTask = document.querySelector(".add");
const box = document.querySelector(".form");
const tasksTable = document.querySelector(".tasksTable");

//inputs
const title = document.querySelector("#title"),
    datetask = document.querySelector("#datetask"),
    description = document.querySelector("#description");

//array whit all tasks    
const allTask = [];

/* class and constructor */
class Task {
    constructor (title, datetask, description){
        this.title = title
        this.datetask = datetask
        this.description = description
    }
}

const cleanInput = () => {
    title.value = "";
    datetask.value = "";
    description.value = "";
}

/* functions */

const addTaskArray = (e) => {
    e.preventDefault();
    let titleValue = title.value,
        datetaskValue = datetask.value,
        descriptionValue = description.value;

    const newTask = new Task(titleValue, datetaskValue, descriptionValue);
    allTask.push(newTask);
    localStorage.setItem('allTask', JSON.stringify(allTask));
    cleanInput();
    addTaskDOM(allTask);
}

const addTaskDOM = (allTask) => {
const tasks = allTask.map(function(item){
        return `
        <div class="task-single">
            <div>
                <p>${item.datetask}</p>
            </div>
            <div>
                <p>${item.title}</p>
                <p>${item.description}</p>
            </div>
        </div>`
    });
    console.log(tasks)
    tasksTable.innerHTML = tasks;
}

btnOpen.addEventListener('click', (e) => {
    e.preventDefault();
    box.style.display = 'block';
});

btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    box.style.display = 'none';
});

/* Add task */

addTask.addEventListener('click', addTaskArray);

/* Show task */

window.addEventListener('DOMContentLoaded', () => {
    addTaskDOM(allTask);
});