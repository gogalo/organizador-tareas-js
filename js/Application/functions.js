import { Task } from "../Model/Task.js";
import { tasksTable, addTask, editTask, box } from "./buttons.js";


const loadTasks = () => {
    if(localStorage.getItem('allTask')) {
        const allTaskStr = localStorage.getItem("allTask");
        const allTask = JSON.parse(allTaskStr);
        
        addTaskDOM(allTask);
    }
}

const cleanInput = () => {
    title.value = "";
    datetask.value = "";
    description.value = "";
}

const addTaskArray = (e) => {
    e.preventDefault()
    let titleValue = title.value;
    let datetaskValue = datetask.value;
    let descriptionValue = description.value;

    const newTask = Task.create(titleValue, datetaskValue, descriptionValue);

    //I create the array
    let allTaskRecover = [];

    if(localStorage.getItem('allTask')) {
        //get olds values and convert an array
        allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 
    }
    
    //add item to array
    allTaskRecover.push(newTask);
    localStorage.setItem('allTask', JSON.stringify(allTaskRecover));
    
    cleanInput();
    addTaskDOM(allTaskRecover);
}

const editValuesTaskArray = (indexItem) => {
    let titleValue = title.value;
    let datetaskValue = datetask.value;
    let descriptionValue = description.value;
    let indexValue = indexItem.value;
    
    const newTask = Task.create(titleValue, datetaskValue, descriptionValue);

    //get olds values and convert an array
    let allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 

    //update item to array
    allTaskRecover[indexValue] = newTask;

    //convert the array back into a string before storing it back in local storage.
    localStorage.setItem('allTask', JSON.stringify(allTaskRecover));  
}

const deleteTaskArray = (index) => {

    //get olds values and convert an array
    let allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 

	//remove matched item index
    allTaskRecover.splice(index, 1);

    //convert the array back into a string before storing it back in local storage.
    localStorage.setItem('allTask', JSON.stringify(allTaskRecover));

    cleanInput();
    hideTaskForm();
    addTaskDOM(allTaskRecover);
}

const editTaskArray = (index) => {
    let allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 
	const item = allTaskRecover[index];
    const editTask = document.querySelector(".edit");
    const indexItem = document.querySelector("#index");
    
    showTaskForm();
    showTaskFormEditButton();

    title.value = item.title;
    datetask.value = item.datetask;
    description.value = item.description;
    indexItem.value = index;
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

    //bind delete and edit actions
    const editTaskButtons = document.querySelectorAll(".task-edit");
    const deleteTasksButtons = document.querySelectorAll(".task-delete");

    editTaskButtons.forEach((button, index) => {
        console.log('edit foreach index', index);
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