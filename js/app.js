import { 
    btnOpen,
    btnClose,
    addTask
} from './Application/buttons.js';

import {
    loadTasks,
    addTaskArray,
    showTaskForm,
    hideTaskForm,
    cleanInput,
    showTaskFormAddButton
} from './Application/functions.js';


window.addEventListener('DOMContentLoaded', () => {
    
    loadTasks();

    btnOpen.addEventListener('click', (e) => {
        e.preventDefault();
        cleanInput();
        showTaskFormAddButton();
        showTaskForm();
    });
    
    btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        hideTaskForm();
    });
    
    addTask.addEventListener('click', addTaskArray);

});