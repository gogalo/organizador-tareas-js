export class LocalStorageRepository {

    STORAGE_NAME = 'allTask';
    tasks;
    
    constructor() {
        this.getTasks();
    }
    
    getTasks() {
        this.tasks = this.#parse(localStorage.getItem(this.STORAGE_NAME));
        
        return this.tasks;
    }

    get(index) {
        return this.tasks[index];
    }

    add(task) {
        this.tasks.push(task);
        this.#save();

        return this.tasks;
    }

    edit(index, task) {
        this.tasks[index] = task;
        this.#save();

        return this.tasks;
    }

    delete(index) {
        this.tasks.splice(index, 1);
        this.#save();

        return this.tasks;
    }

    #save() {
        localStorage.setItem(this.STORAGE_NAME, this.#stringify(this.tasks));
    }

    #parse(data) {
        return JSON.parse(data);
    }

    #stringify(data) {
        return JSON.stringify(data);
    }

}