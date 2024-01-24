import * as dom from './dom.js';
import * as project from './project.js';

let taskList = [];

function getTaskFromProject(projectIndex) {
    taskList = project.projectList[projectIndex].task;
};

function getTaskListFromStorage(projectIndex) {
    // retreieve data
    let storageProjectList = localStorage.getItem("projectList");
    let storageProjects = JSON.parse(storageProjectList);
    taskList = storageProjects[projectIndex].task;
    return taskList;
};

function getTaskListLength() {
    return taskList.length;
};


function CreateTask(title, dueDate, projectIndex) {
    if (dueDate == '') {
        dueDate = 'No due date';
    };

    return {
        title,
        dueDate,
        projectIndex,
    };
};

function addTask(name, dueDate, projectIndex) {
    const task = CreateTask(name, dueDate, projectIndex);
    taskList.push(task);
    project.updateProjectList(projectIndex, taskList);
    console.log(taskList);
    dom.renderTodoList(taskList);
};


function updateTodo(taskIndex, newName, newDate) {
    taskList[taskIndex].title = newName;
    taskList[taskIndex].dueDate = newDate;
    dom.renderTodoList(taskList);
    console.log(taskList);
};

export {
    taskList,
    CreateTask,
    addTask,
    updateTodo,
    getTaskFromProject,
    getTaskListLength,
    getTaskListFromStorage,
};