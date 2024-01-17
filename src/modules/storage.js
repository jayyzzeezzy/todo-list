import * as project from './project.js';

function saveProjectToLocalStorage() {
    const projects = project.projectList;
    const projectListInJSON = JSON.stringify(projects);
    localStorage.setItem("projectList", projectListInJSON);
};


export {
    saveProjectToLocalStorage,
};