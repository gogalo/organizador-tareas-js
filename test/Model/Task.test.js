import { Task } from "../../js/Model/Task.js";

test('Should return and error if using constructor for create a Task instance', () => {
    const fn = () => {new Task('Lorem ipsum', 'date', 'description')};
    
    expect(fn).toThrow(TypeError);
});

test('Should create a Task instance', () => {
    const task = Task.create('Lorem ipsum', '2022-01-01', 'foo bar'); 
    
    expect(task).toBeInstanceOf(Task);
});

test('Should create a Task instance with correct content', () => {
    const task = Task.create('Lorem ipsum', '2022-01-01', 'foo bar'); 
    
    expect(task.title).toBe('Lorem ipsum');
    expect(task.date).toBe('2022-01-01');
    expect(task.description).toBe('foo bar');

});

test('Should return a correct json data when call JSON.stringify', () => {
    const task = Task.create('Lorem ipsum', '2022-01-01', 'foo bar'); 
    const expected = JSON.stringify({
        title: 'Lorem ipsum',
        date: '2022-01-01',
        description: 'foo bar'
    });
    
    const taskJson = JSON.stringify(task);

    expect(taskJson).toEqual(expected);
});