import * as project from './project.js';
import * as task from './task.js';

function saveProjectToLocalStorage() {
    const projects = project.projectList;
    const projectListInJSON = JSON.stringify(projects);
    localStorage.setItem("projectList", projectListInJSON);
};

function deleteTodo(projectIndex, taskIndex) {
    // retreieve data
    let storageProjectList = localStorage.getItem("projectList");
    let storageProjects = JSON.parse(storageProjectList);

    storageProjects[projectIndex].task.splice(taskIndex, 1);

    // store data
    const jsonProjectList = storageProjects;
    const jsonProjects = JSON.stringify(jsonProjectList);
    localStorage.setItem("projectList", jsonProjects);

    // delete from local data
    task.taskList.splice(taskIndex, 1);
};

function getLocalStorage () {
    // retreieve data
    let storageProjectList = localStorage.getItem("projectList");
    let storageProjects = JSON.parse(storageProjectList);
    return storageProjects;
};

export {
    saveProjectToLocalStorage,
    deleteTodo,
    getLocalStorage,
};