import * as project from './project.js';
import * as task from './task.js';

// DOM Manipulation
export const domController = (function() {
    const addProjectBtn = document.querySelector('.addProjectBtn');
    const addProjectField = document.querySelector('#display-add-project');
    const projectCancelBtn = document.querySelector('.project-cancel-btn');
    const projectAddBtn = document.querySelector('.project-add-btn');

    // show add project field
    addProjectBtn.addEventListener('click', () => handleAddProject());
    function handleAddProject() {
        // hide button
        addProjectBtn.classList.add('hide-btn-active');
        // show input field
        addProjectField.classList.remove('hide-input');
    };

    // cancel add project action
    projectCancelBtn.addEventListener('click', () => cancelAddProject());
    function cancelAddProject() {
        // hide input
        addProjectField.classList.add('hide-input');
        // show button
        addProjectBtn.classList.remove('hide-btn-active');
    };

    // add to project list
    projectAddBtn.addEventListener('click', () => handleProjectAdd());
    function handleProjectAdd() {
        // hide input field
        addProjectField.classList.add('hide-input');
        // show button
        addProjectBtn.classList.remove('hide-btn-active');

        // send input value to project list
        const projectInput = document.querySelector('.add-project-input');
        project.addProject(projectInput.value);
        // reset input
        projectInput.value = '';
        renderProjects();
        makeProjectEventListener();
    };

    const addTaskBtn = document.querySelector('.add-task-btn');
    const addTaskField = document.querySelector('#display-add-task');
    const taskCancelBtn = document.querySelector('.task-cancel-btn');

    // show add task field
    addTaskBtn.addEventListener('click', () => handleAddTask());
    function handleAddTask() {
        // hide button
        addTaskBtn.classList.add('hide-btn-active');
        // show input field
        addTaskField.classList.remove('hide-input');
    };

    // cancel add task action
    taskCancelBtn.addEventListener('click', () => cancelAddTask());
    function cancelAddTask() {
        // hide input field
        addTaskField.classList.add('hide-input');
        // show button
        addTaskBtn.classList.remove('hide-btn-active');
    };    

    // add to task list
    const taskAddBtn = document.querySelector('.task-add-btn');
    taskAddBtn.addEventListener('click', () => addToTaskList());
    function addToTaskList() {
        console.log('success');
    };

    // display each project
    function renderProjects() {
        const projectListContainer = document.querySelector('#project-list');
        projectListContainer.textContent = '';
        project.projectList.forEach((project, index) => {
            const projectTab = document.createElement('button');
            projectTab.classList.add('project-tab');
            projectTab.setAttribute('data-project-index', index);
            projectTab.textContent = `${project}`;

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-regular', 'fa-trash-can');
            
            projectTab.appendChild(deleteIcon);
            projectListContainer.appendChild(projectTab);
        });
    };

    function makeProjectEventListener() {
        // delete icon
        const projectDeleteIcon = document.querySelectorAll('.fa-trash-can');
        projectDeleteIcon.forEach((icon) => icon.addEventListener('click', () => handleDeleteProject(icon.parentNode)));
    };

    function handleDeleteProject(node) {
        // delete from DOM
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        // delete from project module
        project.spliceProjectList(node.textContent);
        console.log(project.projectList);
    };
})();