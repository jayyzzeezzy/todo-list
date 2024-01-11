import * as dom from './dom.js';

const taskList = [];

function CreateTask(title, dueDate) {
    if (dueDate == '') {
        dueDate = 'No due date';
    };

    return {
        title,
        dueDate,
    };
};

function addTask(name, dueDate) {
    const task = CreateTask(name, dueDate);
    taskList.push(task);
    console.log(taskList);
    dom.renderTasks();
};

export {
    taskList,
    CreateTask,
    addTask,
};