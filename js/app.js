//buttons
const btnOpen = document.querySelector(".add-new")
const btnClose = document.querySelector(".close")
const addTask = document.querySelector(".add")
const box = document.querySelector(".form")
const tasksTable = document.querySelector(".tasksTable")

//inputs
const title = document.querySelector("#title"),
    datetask = document.querySelector("#datetask"),
    description = document.querySelector("#description")



/* class and constructor */
class Task {
    constructor (title, datetask, description){
        this.title = title
        this.datetask = datetask
        this.description = description
    }
}

const cleanInput = () => {
    title.value = ""
    datetask.value = ""
    description.value = ""
}


/* functions */

const addTaskArray = (e) => {
    e.preventDefault()
    let titleValue = title.value,
        datetaskValue = datetask.value,
        descriptionValue = description.value

    const newTask = new Task(titleValue, datetaskValue, descriptionValue)

    //I create the array
    let allTaskRecover = [];

    if(localStorage.getItem('allTask')){
        //get olds values and convert an array
        allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 
        }
    
    //add item to array
    allTaskRecover.push(newTask)
    localStorage.setItem('allTask', JSON.stringify(allTaskRecover))
    
    cleanInput()
    addTaskDOM(allTaskRecover)
}

const addTaskDOM = (allTask) => {
    console.log('Entramos en funcion addTaskDom')
console.log(allTask)
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
    tasksTable.innerHTML = tasks
}

btnOpen.addEventListener('click', (e) => {
    e.preventDefault()
    box.style.display = 'block'
});

btnClose.addEventListener('click', (e) => {
    e.preventDefault()
    box.style.display = 'none'
});

/* Add task */

addTask.addEventListener('click', addTaskArray);

/* Show task */


window.addEventListener('DOMContentLoaded', () => {
    
    //if it exists array whit all tasks, save in allTaskStr and covert string in array with JSON.parse
    if(localStorage.getItem('allTask')){
        console.log('ya existe el array de tareas')
        const allTaskStr= localStorage.getItem("allTask")
        const allTask = JSON.parse(allTaskStr);
        console.log(allTask)
        addTaskDOM(allTask)
        
    }
    
});