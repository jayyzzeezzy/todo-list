import * as dom from './dom.js';
import * as project from './project.js';

let taskList = [];

function getTaskFromProject(projectIndex) {
    taskList = project.projectList[projectIndex].task;
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

export {
    taskList,
    CreateTask,
    addTask,
    getTaskFromProject,
};