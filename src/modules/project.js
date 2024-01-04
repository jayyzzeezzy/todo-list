const projectList = [];

function addProject(project) {
    projectList.push(project);
    console.log(projectList);
};

export {
    projectList,
    addProject
};