import * as dom from './dom.js';
import * as project from './project.js';

let taskList = [];

function getTaskFromProject(projectIndex) {
    taskList = project.projectList[projectIndex].task;
};

function getTaskListLength() {
    return taskList.length;
};

function resetTaskList() {
    taskList = [];
    return taskList;
};


function CreateTask(title, dueDate, projectIndex, taskIndex) {
    if (dueDate == '') {
        dueDate = 'No due date';
    };

    return {
        title,
        dueDate,
        projectIndex,
        taskIndex,
    };
};

function addTask(name, dueDate, projectIndex, taskIndex) {
    const task = CreateTask(name, dueDate, projectIndex, taskIndex);
    taskList.push(task);
    project.updateProjectList(projectIndex, taskList);
    console.log(taskList);
    dom.renderTasks(taskList);
};

function spliceTaskList(projectIndex, taskIndex) {
    getTaskFromProject(projectIndex)
    taskList.splice(taskIndex, 1);
    project.updateProjectList(projectIndex, taskList);

    console.log(taskList);
};

function updateTodo(taskIndex, newName, newDate) {
    taskList[taskIndex].title = newName;
    taskList[taskIndex].dueDate = newDate;
    dom.renderTasks(taskList);
    console.log(taskList);
};

export {
    taskList,
    CreateTask,
    addTask,
    spliceTaskList,
    updateTodo,
    getTaskFromProject,
    resetTaskList,
    getTaskListLength,
};