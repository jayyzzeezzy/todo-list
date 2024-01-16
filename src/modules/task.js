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

function spliceTaskList(index) {
    if (index > -1) {
        taskList.splice(index, 1);
    }
    console.log(taskList);
};

function updateTodo(taskIndex, newName, newDate) {
    taskList[taskIndex].title = newName;
    taskList[taskIndex].dueDate = newDate;
    dom.renderTasks();
    console.log(taskList);
};

export {
    taskList,
    CreateTask,
    addTask,
    spliceTaskList,
    updateTodo,
};