import { format, isThisWeek } from "date-fns";
import * as task from './task.js';
import * as project from './project.js';
import * as storage from './storage.js';

let currentProjectIndex = 0;
let currentTaskIndex = 0;

let isHomeBtnClicked = false;
let isTodayBtnClicked = false;
let isWeekBtnClicked = false;

function changeButtonState(string) {
    switch (string) {
        case 'home':
            isHomeBtnClicked = true;
            isTodayBtnClicked = false;
            isWeekBtnClicked = false;
            break;
        case 'today':
            isHomeBtnClicked = false;
            isTodayBtnClicked = true;
            isWeekBtnClicked = false;
            break;
        case 'week':
            isHomeBtnClicked = false;
            isTodayBtnClicked = false;
            isWeekBtnClicked = true;
            break;
        default:
            isHomeBtnClicked = false;
            isTodayBtnClicked = false;
            isWeekBtnClicked = false;
    };
};

function changeCurrentProjectIndex(index) {
    currentProjectIndex = index;
};

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

    currentTaskIndex = 0;
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
    showAddTaskBtn();

    // this refers to button from projectButtons
    const projectTitle = this.textContent;
    const projectIndex = this.getAttribute('data-project-index');
    changeCurrentProjectIndex(projectIndex);
    console.log(currentProjectIndex);
    task.getTaskFromProject(currentProjectIndex);
    
    changeButtonState();
    console.log(isHomeBtnClicked, isTodayBtnClicked, isWeekBtnClicked);
    renderTasks(task.taskList);

    console.log(projectTitle);
    console.log(projectIndex);

    if (e.target.classList.contains('delete-project-button')) {
        deleteProjectFromDom(projectIndex);
        clearTaskDisplay();
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

    task.getTaskFromProject(currentProjectIndex);
    currentTaskIndex = task.getTaskListLength();
    task.addTask(taskInput.value, dateInput.value, currentProjectIndex, currentTaskIndex);
    taskInput.value = '';
    dateInput.value = '';
};

// borrow functions from the task module
function clearTaskDisplay() {
    const todoListContainer = document.querySelector('.todo-list');
    todoListContainer.textContent = '';
};

function renderTasks(list) {
    clearTaskDisplay();

    const todoListContainer = document.querySelector('.todo-list');
    list.forEach((task) => {
        todoListContainer.innerHTML += `
            <div class="todo-item" data-project-index="${task.projectIndex}" data-task-index="${task.taskIndex}">
                <div class="todo-left-side">
                    <i class="far fa-circle complete-task-button"></i>
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

    handleTodoBtnClicks();
};

function handleTodoBtnClicks() {
    // make event listener for each functionality
    const taskDelete = document.querySelectorAll('.delete-task-button');
    taskDelete.forEach(btn => {btn.addEventListener('click', deleteTaskFromDom)});

    const taskEdit = document.querySelectorAll('.edit-task-button');
    taskEdit.forEach(btn => btn.addEventListener('click', hideDefaultTodoView));

    const taskCancel = document.querySelectorAll('.cancel-edit');
    taskCancel.forEach(btn => btn.addEventListener('click', cancelEditTodo));

    const taskConfirm = document.querySelectorAll('.confirm-edit');
    taskConfirm.forEach(btn => btn.addEventListener('click', confirmEditTodo));

    const taskComplete = document.querySelectorAll('.complete-task-button');
    taskComplete.forEach(btn => btn.addEventListener('click', deleteTaskFromDom));
};

function deleteTaskFromDom(e) {
    const projectIndex = e.target.parentNode.parentNode.dataset.projectIndex;
    const taskIndex = e.target.parentNode.parentNode.dataset.taskIndex;

    // renderTasks will also clear display
    if (isHomeBtnClicked) {
        storage.deleteTodo(projectIndex, taskIndex);
        renderHome();
    }
    else if (isTodayBtnClicked) {
        storage.deleteTodo(projectIndex, taskIndex);
        renderToday();
    }
    else if (isWeekBtnClicked) {
        storage.deleteTodo(projectIndex, taskIndex);
        renderWeek();
    }
    else {
        storage.deleteTodo(projectIndex, taskIndex);
        // retrieve data
        let storageProjectList = localStorage.getItem("projectList");
        let storageProjects = JSON.parse(storageProjectList);
        renderTasks(storageProjects[projectIndex].task);
    }
    
};

function hideDefaultTodoView(e) {
    const projectIndex = e.target.parentNode.parentNode.dataset.projectIndex;
    const taskIndex = e.target.parentNode.parentNode.dataset.taskIndex;

    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(function(todo) {
        if (todo.dataset.projectIndex === projectIndex && todo.dataset.taskIndex === taskIndex) {
            // hide default view
            todo.children[0].classList.add('edit-view-active');
            todo.children[2].classList.add('edit-view-active');

            // show edit view
            todo.children[1].classList.remove('default-view-active');
            todo.children[3].classList.remove('default-view-active');

            // preload edit value
            const storageProjects = storage.getLocalStorage();
            todo.children[1].children[0].value = storageProjects[projectIndex].task[taskIndex].title;
            todo.children[3].children[0].value = storageProjects[projectIndex].task[taskIndex].dueDate;
            
        }
    });
};

function cancelEditTodo(e) {
    const projectIndex = e.target.parentNode.parentNode.parentNode.dataset.projectIndex;
    const taskIndex = e.target.parentNode.parentNode.parentNode.dataset.taskIndex;

    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(function(todo) {
        if (todo.dataset.projectIndex === projectIndex && todo.dataset.taskIndex === taskIndex) {
            // show default view
            todo.children[0].classList.remove('edit-view-active');
            todo.children[2].classList.remove('edit-view-active');

            // hide edit view
            todo.children[1].classList.add('default-view-active');
            todo.children[3].classList.add('default-view-active');
        }
        
    });
};

function confirmEditTodo(e) {
    const targetIndex = e.target.parentNode.parentNode.parentNode.dataset.taskIndex;
    const _todoUpdateName = document.querySelectorAll('.todo-edit-name');
    const _todoUpdateDate = document.querySelectorAll('.edit-due-date');
    task.updateTodo(
        targetIndex, 
        _todoUpdateName[targetIndex].value, 
        _todoUpdateDate[targetIndex].value
    );
};

// navbar function and logic
function hideAddTaskBtn() {
    const addProjectBtn = document.querySelector('.add-task-btn');
    addProjectBtn.classList.add('hide-btn-active');
};

function showAddTaskBtn() {
    const addProjectBtn = document.querySelector('.add-task-btn');
    addProjectBtn.classList.remove('hide-btn-active');
};



// NavBar - home button
const homeBtn = document.querySelector('.homeBtn');
homeBtn.addEventListener('click', renderHome);

function renderHome() {
    clearTaskDisplay();
    hideAddTaskBtn();
    changeButtonState('home');
    console.log(currentProjectIndex);

    const projects = project.getLocalStorage();
    const todoListContainer = document.querySelector('.todo-list');
    projects.forEach((project, projectIndex) => {
        project.task.forEach((todo, todoIndex) => {
            todoListContainer.innerHTML += `
                <div class="todo-item" data-project-index="${projectIndex}" data-task-index="${todoIndex}">
                    <div class="todo-left-side">
                        <i class="far fa-circle complete-task-button"></i>
                        <p class="todo-title">${todo.title}</P>
                    </div>

                    <div class="todo-left-edit default-view-active">
                        <input type="text" class="todo-edit-name">
                    </div>

                    <div class="todo-right-side">
                        <p class="todo-due-date">${todo.dueDate}</p>
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
    });

    // renderTasks(todos);
    handleTodoBtnClicks();

};

// NavBar - today button
const todayBtn = document.querySelector('.todayBtn');
todayBtn.addEventListener('click', renderToday);

function renderToday() {
    clearTaskDisplay();
    hideAddTaskBtn();
    changeButtonState('today');
    console.log(currentProjectIndex);

    const todayDate = format(new Date(), "yyyy-MM-dd");
    const projects = project.getLocalStorage();
    const todoListContainer = document.querySelector('.todo-list');
    projects.forEach((project, projectIndex) => {
        project.task.forEach((todo, todoIndex) => {
            if (todo.dueDate === todayDate) {
                todoListContainer.innerHTML += `
                    <div class="todo-item" data-project-index="${projectIndex}" data-task-index="${todoIndex}">
                        <div class="todo-left-side">
                            <i class="far fa-circle complete-task-button"></i>
                            <p class="todo-title">${todo.title}</P>
                        </div>

                        <div class="todo-left-edit default-view-active">
                            <input type="text" class="todo-edit-name">
                        </div>

                        <div class="todo-right-side">
                            <p class="todo-due-date">${todo.dueDate}</p>
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
            }
            
        });
    });

    handleTodoBtnClicks();

    // projects.forEach(project => {
    //     project.task.forEach(todo => {
    //         if (todo.dueDate == todayDate) {
    //             todos.push(todo);
    //         }
    //     })
    // });
};

// NavBar - week button
const weekBtn = document.querySelector('.weekBtn');
weekBtn.addEventListener('click', renderWeek);

function renderWeek() {
    clearTaskDisplay();
    hideAddTaskBtn();
    changeButtonState('week');
    console.log(currentProjectIndex);

    const projects = project.getLocalStorage();
    const todoListContainer = document.querySelector('.todo-list');
    projects.forEach((project, projectIndex) => {
        project.task.forEach((todo, todoIndex) => {
            if (isThisWeek(todo.dueDate)) {
                todoListContainer.innerHTML += `
                    <div class="todo-item" data-project-index="${projectIndex}" data-task-index="${todoIndex}">
                        <div class="todo-left-side">
                            <i class="far fa-circle complete-task-button"></i>
                            <p class="todo-title">${todo.title}</P>
                        </div>

                        <div class="todo-left-edit default-view-active">
                            <input type="text" class="todo-edit-name">
                        </div>

                        <div class="todo-right-side">
                            <p class="todo-due-date">${todo.dueDate}</p>
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
            }
            
        });
    });

    handleTodoBtnClicks();

    // projects.forEach(project => {
    //     project.task.forEach(todo => {
    //         if (isThisWeek(todo.dueDate)) {
    //             todos.push(todo);
    //         }
    //     })
    // });
};

export {
    clearProjectDisplay,
    renderProjects,
    renderTasks,
    renderHome,
};