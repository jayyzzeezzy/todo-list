import { format } from "date-fns";
import * as task from './task.js';
import * as project from './project.js';

// pop up project form
const addProjectBtn = document.querySelector('.addProjectBtn');
const displayAddProject = document.querySelector('#display-add-project');
addProjectBtn.addEventListener('click', () => showProjectForm());
function showProjectForm() {
    addProjectBtn.classList.add('hide-btn-active');
    displayAddProject.classList.remove('hide-input');
};

// project form - cancel action
const projectCancelBtn = document.querySelector('.project-cancel-btn');
projectCancelBtn.addEventListener('click', () => hideProjectForm());
function hideProjectForm() {
    displayAddProject.classList.add('hide-input');
    addProjectBtn.classList.remove('hide-btn-active');
};

// project form - add action
const projectAddBtn = document.querySelector('.project-add-btn');
projectAddBtn.addEventListener('click', () => addProjectForm());
function addProjectForm() {
    hideProjectForm();

    const projectInput = document.querySelector('.add-project-input');
    if (!projectInput.value) {
        alert('Please enter a name');
        return
    }

    project.addProject(projectInput.value);
    projectInput.value = '';
};

// DOM logic that borrows functions from the project module
function clearProjectDisplay() {
    const projectListContainer = document.querySelector('#project-list');
    projectListContainer.textContent = '';
};

function renderProjects() {
    clearProjectDisplay();

    const projectListContainer = document.querySelector('#project-list');
    project.projectList.forEach((project, index) => {
        projectListContainer.innerHTML += `
            <div class="project-select" data-project-index="${index}">
                ${project.title}
                <i class="fa-regular fa-trash-can delete-project-button" aria-hidden="true"></i>
            </div>
        `;
    });

    listenForProjectClick();
};

function listenForProjectClick() {
    const projectButtons = document.querySelectorAll('.project-select');
    projectButtons.forEach((button) => {
        // pass button to event handler -> handleProjectClick
        button.addEventListener('click', handleProjectClick);
    });
};

function handleProjectClick(e) {
    // this refers to button from projectButtons
    const projectTitle = this.textContent;
    const projectIndex = this.getAttribute('data-project-index');
    console.log(projectTitle);
    console.log(projectIndex);
    if (e.target.classList.contains('delete-project-button')) {
        deleteProjectFromDom(projectIndex);
        return
    };
    
};

function deleteProjectFromDom(index) {
    project.spliceProjectList(index);

    // renderProjects includes the clearProjectDisplay function
    renderProjects();
};

// pop up task form
const addTaskBtn = document.querySelector('.add-task-btn');
const displayAddTask = document.querySelector('#display-add-task');
addTaskBtn.addEventListener('click', showTaskForm);
function showTaskForm() {
    addTaskBtn.classList.add('hide-btn-active');
    displayAddTask.classList.remove('hide-input');
};

// task form - cancel action
const taskCancelBtn = document.querySelector('.task-cancel-btn');
taskCancelBtn.addEventListener('click', hideTaskForm);
function hideTaskForm() {
    displayAddTask.classList.add('hide-input');
    addTaskBtn.classList.remove('hide-btn-active');
};

// task form - add action
const taskAddBtn = document.querySelector('.task-add-btn');
taskAddBtn.addEventListener('click', addTaskForm);
function addTaskForm() {
    hideTaskForm();

    const taskInput = document.querySelector('.add-task-input');
    const dateInput = document.querySelector('.task-due-date');
    if (!taskInput.value) {
        alert('Please enter a name');
        return
    }

    task.addTask(taskInput.value, dateInput.value);
    taskInput.value = '';
    dateInput.value = '';
};

// borrow functions from the task module
function clearTaskDisplay() {
    const todoListContainer = document.querySelector('.todo-list');
    todoListContainer.textContent = '';
};

function renderTasks() {
    clearTaskDisplay();

    const todoListContainer = document.querySelector('.todo-list');
    task.taskList.forEach((task, index) => {
        todoListContainer.innerHTML += `
            <div class="todo-item" data-task-index="${index}">
                <div class="todo-left-side">
                    <i class="far fa-circle"></i>
                    <p class="todo-title">${task.title}</P>
                </div>

                <div class="todo-left-edit default-view-active">
                    <input type="text" class="todo-edit-name">
                </div>

                <div class="todo-right-side">
                    <p class="todo-due-date">${task.dueDate}</p>
                    <i class="fa-regular fa-pen-to-square edit-task-button"></i>
                    <i class="fa-regular fa-trash-can delete-task-button" aria-hidden="true"></i>
                </div>

                <div class="todo-right-edit default-view-active">
                    <input class="edit-due-date" type="date">
                    <div class="edit-button-container">
                        <button class="confirm-edit">Confirm</button>
                        <button class="cancel-edit">Cancel</button>
                    </div>
                </div>
            </div>
        `;
    });

    listenForTaskClick();
};

function listenForTaskClick() {
    const taskButtons = document.querySelectorAll('.todo-item');
    taskButtons.forEach((button) => {
        // pass button to handleTaskClick
        button.addEventListener('click', handleTaskClick);
    });

    const taskDelete = document.querySelectorAll('.delete-task-button');
    taskDelete.forEach(btn => {btn.addEventListener('click', deleteTaskFromDom)});
};

function handleTaskClick(e) {
    const taskIndex = this.getAttribute('data-task-index');
    // select button's children's children's node -> .todo-title
    const taskTitle = this.children[0].children[1].textContent;
    console.log(taskIndex);
    console.log(taskTitle);

    // hide default view
    if (e.target.classList.contains('edit-task-button')) {
        hideDefaultTodoView();
        return
    };

    // task edit - cancel action
    if (e.target.classList.contains('cancel-edit')) {
        hideEditTodoView();
    };
    
    // task edit - confirm action
    if (e.target.classList.contains('confirm-edit')) {
        // TODO
    };
};

function deleteTaskFromDom(e) {
    const taskIndex = e.target.parentNode.parentNode.dataset.taskIndex;
    task.spliceTaskList(taskIndex);

    // renderTasks will also clear display
    renderTasks();
};

function hideDefaultTodoView() {
    // hide default view
    const todoLeftSide = document.querySelector('.todo-left-side');
    const todoRightSide = document.querySelector('.todo-right-side');
    todoLeftSide.classList.add('edit-view-active');
    todoRightSide.classList.add('edit-view-active');

    // show edit view
    const todoLeftEdit = document.querySelector('.todo-left-edit');
    const todoRightEdit = document.querySelector('.todo-right-edit');
    todoLeftEdit.classList.remove('default-view-active');
    todoRightEdit.classList.remove('default-view-active');
};

function hideEditTodoView() {
    // show default view
    const todoLeftSide = document.querySelector('.todo-left-side');
    const todoRightSide = document.querySelector('.todo-right-side');
    todoLeftSide.classList.remove('edit-view-active');
    todoRightSide.classList.remove('edit-view-active');

    // hide edit view
    const todoLeftEdit = document.querySelector('.todo-left-edit');
    const todoRightEdit = document.querySelector('.todo-right-edit');
    todoLeftEdit.classList.add('default-view-active');
    todoRightEdit.classList.add('default-view-active');
};

export {
    clearProjectDisplay,
    renderProjects,
    renderTasks,
};