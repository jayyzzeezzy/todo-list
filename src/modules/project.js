const projectList = [];

function addProject(project) {
    projectList.push(project);
};

function spliceProjectList(content) {
    projectList.splice(`${projectList.indexOf(content)}`, 1);
};

export {
    projectList,
    addProject,
    spliceProjectList,
};