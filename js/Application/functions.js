import { LocalStorageRepository } from "../Infrastructure/Repository/LocalStorageRepository.js";
import { Task } from "../Model/Task.js";
import { tasksTable, addTask, editTask, box } from "./buttons.js";

import { title, datetask, description, index } from "./inputs.js";

const repository = new LocalStorageRepository();

const loadTasks = () => {
    const tasks = repository.getTasks();
    addTaskDOM(tasks);
}

const cleanInput = () => {
    title.value = "";
    datetask.value = "";
    description.value = "";
}

const addTaskArray = (e) => {
    e.preventDefault();
    const task = Task.create(title.value, datetask.value, description.value);
    const tasks = repository.add(task);
    
    cleanInput();
    addTaskDOM(tasks);
}

const editValuesTaskArray = (e) => {
    e.preventDefault();
    const task = Task.create(title.value, datetask.value, description.value);
    const tasks = repository.edit(index.value, task);

    addTaskDOM(tasks);
}

const deleteTaskArray = (index) => {
    const tasks = repository.delete(index);

    cleanInput();
    hideTaskForm();
    addTaskDOM(tasks);
}

const editTaskArray = (index) => {
    const indexItem = document.querySelector("#index"); 
    const item = repository.get(index);

    title.value = item.title;
    datetask.value = item.date;
    description.value = item.description;
    indexItem.value = index; 
       
    showTaskForm();
    showTaskFormEditButton();
}

const addTaskDOM = (allTask) => {
    const tasks = allTask.map(function(item,index){
            return `
            <div class="task-single" data-index="${index}">
                <p class="task-delete"></p>
                <p class="task-edit"></p>
                <div>
                    <p>${item.date}</p>
                </div>
                <div>
                    <p>${item.title}</p>
                    <p>${item.description}</p>
                </div>
            </div>`
    });
    
    tasksTable.innerHTML = tasks

    bindDeleteAndEditActions();
}

const bindDeleteAndEditActions = ()  => {
    const editTaskButtons = document.querySelectorAll(".task-edit");
    const deleteTasksButtons = document.querySelectorAll(".task-delete");

    editTaskButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            editTaskArray(index);
        });
    });

    deleteTasksButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            deleteTaskArray(index);
        });
    });
}

const showTaskForm = () => {
    box.style.display = 'block';
}

const hideTaskForm = () => {
    box.style.display = 'none';
}

const showTaskFormAddButton = () => {
    editTask.style.display = 'none';
    addTask.style.display = 'block';
}

const showTaskFormEditButton = () => {
    addTask.style.display = 'none';
    editTask.style.display = 'block';
}

export {
    loadTasks,
    cleanInput,
    addTaskArray,
    editValuesTaskArray,
    deleteTaskArray,
    editTaskArray,
    addTaskDOM,
    showTaskForm,
    hideTaskForm,
    showTaskFormAddButton,
    showTaskFormEditButton
}