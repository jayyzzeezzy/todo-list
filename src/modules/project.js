import * as dom from './dom.js';
import * as storage from './storage.js';
import * as task from './task.js';

let projectList = [];

function getLocalStorage() {
    let localProjects = localStorage.getItem("projectList");
    if (!localProjects) {
        addProject('Default Project');
        task.addTask('Default Todo', '2060-01-01', 0);
    }
    else {
        projectList = JSON.parse(localProjects);
    };
    return projectList;
};

// project function factory
function CreateProject(title) {
    const task = [];
    return {
        title,
        task
    };
};

function addProject(title) {
    const project = CreateProject(title);
    projectList.push(project);
    console.log(projectList);
    storage.saveProjectToLocalStorage();
    dom.renderProjects();
};

function spliceProjectList(index) {
    if (index > -1) {
        projectList.splice(index, 1);
    }
    storage.saveProjectToLocalStorage();
    console.log(projectList);
};

function updateProjectList(index, list) {
    projectList[index].task = list;
    storage.saveProjectToLocalStorage();
};

function updateTaskArray(projectIndex, taskIndex, newName, newDate) {
    projectList[projectIndex].task[taskIndex].title = newName;
    projectList[projectIndex].task[taskIndex].dueDate = newDate;
    storage.saveProjectToLocalStorage();
};

export {
    projectList,
    CreateProject,
    addProject,
    spliceProjectList,
    updateProjectList,
    getLocalStorage,
    updateTaskArray,
};