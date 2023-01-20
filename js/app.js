//buttons
const btnOpen = document.querySelector(".add-new")
const btnClose = document.querySelector(".close")
const addTask = document.querySelector(".add")
const editTask = document.querySelector(".edit")
const deleteTask = document.querySelector(".delete")
const box = document.querySelector(".form")
const tasksTable = document.querySelector(".tasksTable")

//inputs
const title = document.querySelector("#title"),
    datetask = document.querySelector("#datetask"),
    description = document.querySelector("#description"),
    indexItem = document.querySelector("#index")



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

const editValuesTaskArray = () => {
    let titleValue = title.value,
        datetaskValue = datetask.value,
        descriptionValue = description.value
        indexValue = indexItem.value

    const newTask = new Task(titleValue, datetaskValue, descriptionValue)
    console.log("Editando valores")
    console.log('Este el indice a editar')
    console.log(indexValue)

    //get olds values and convert an array
    let allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 

    //update item to array
      allTaskRecover[indexValue]=newTask

    //convert the array back into a string before storing it back in local storage.
    localStorage.setItem('allTask', JSON.stringify(allTaskRecover))
      
}

const deleteTaskArray =(index) =>{

    //get olds values and convert an array
    let allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 

	console.log("indice del elemento:" +index);		
    //remove matched item index
    allTaskRecover.splice(index, 1);

    //convert the array back into a string before storing it back in local storage.
    localStorage.setItem('allTask', JSON.stringify(allTaskRecover));
    
    addTaskDOM(allTaskRecover)
}

const editTaskArray =(index) =>{
    let allTaskRecover = JSON.parse(localStorage.getItem('allTask')); 
	console.log("indice del elemento:" +index);		
    const item =allTaskRecover[index]
    console.log(item)
    box.style.display = 'block'
    addTask.style.display = 'none'
    editTask.style.display = 'block'

    title.value = item.title
    datetask.value = item.datetask
    description.value = item.description
    indexItem.value = index

}



const addTaskDOM = (allTask) => {
    console.log('Entramos en funcion addTaskDom')
    console.log(allTask)
    const tasks = allTask.map(function(item,index){
        console.log("Mostrando item")
        console.log(item)
        console.log("index ="+ index)

            return `
            <div class="task-single">
            <p onclick="deleteTaskArray(${index})" class="delete"></p>
            <p onclick="editTaskArray(${index})" class="edit"></p>
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

/*Edit task */

editTask.addEventListener('click', () => {
   // e.preventDefault()
    alert('quiero editar');
    editValuesTaskArray()
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