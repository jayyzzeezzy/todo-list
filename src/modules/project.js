import * as dom from './dom.js';
import * as storage from './storage.js';

let projectList = [];

let localProjects = localStorage.getItem("projectList");
if (!localProjects) {
    console.log('No locally stored projects');
}
else {
    projectList = JSON.parse(localProjects);
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
        storage.saveProjectToLocalStorage();
    }
    console.log(projectList);
};

function updateProjectList(index, list) {
    projectList[index].task = list;
    storage.saveProjectToLocalStorage();
};

export {
    projectList,
    CreateProject,
    addProject,
    spliceProjectList,
    updateProjectList,
};