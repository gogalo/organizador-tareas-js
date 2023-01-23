export class Task {

    static #isInternalConstructing = false;
    #title;
    #date;
    #description;

    constructor(title, date, description) {
        if (!Task.#isInternalConstructing) {
            throw new TypeError("Use static create method instead of new for create a Task instance");
        }

        this.#title = title;
        this.#date = date;
        this.#description = description;
    }

    static create(title, date, description) {
        Task.#isInternalConstructing = true;
        const instance = new Task(title, date, description);
        Task.#isInternalConstructing = false;

        return instance;
    }

    get title() {
        return this.#title;
    }

    get date() {
        return this.#date;
    }

    get description() {
        return this.#description;
    }

    toJSON() {
        return {
          title: this.title,
          date: this.date,
          description: this.description, 
        }
    }
}