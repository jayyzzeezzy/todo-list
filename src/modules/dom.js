import { format, isThisWeek } from "date-fns";
import * as task from './task.js';
import * as project from './project.js';

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
    task.spliceTaskList(projectIndex, taskIndex);

    // renderTasks will also clear display
    if (isHomeBtnClicked) {
        renderHome();
    }
    else if (isTodayBtnClicked) {
        renderToday();
    }
    else if (isWeekBtnClicked) {
        renderWeek();
    }
    else {
        renderTasks(task.taskList);
    }
    
};

function hideDefaultTodoView(e) {
    const projectIndex = e.target.parentNode.parentNode.dataset.projectIndex;
    const taskIndex = e.target.parentNode.parentNode.dataset.taskIndex;
    // hide default view according to the selected task index
    const _todoLeftSide = document.querySelectorAll('.todo-left-side');
    const _todoRightSide = document.querySelectorAll('.todo-right-side');
    console.log(projectIndex);
    console.log(taskIndex);

    _todoLeftSide[taskIndex].classList.add('edit-view-active');
    _todoRightSide[taskIndex].classList.add('edit-view-active');


    // show edit view accroding to the selected task index
    const _todoLeftEdit = document.querySelectorAll('.todo-left-edit');
    const _todoRightEdit = document.querySelectorAll('.todo-right-edit');
    _todoLeftEdit[taskIndex].classList.remove('default-view-active');
    _todoRightEdit[taskIndex].classList.remove('default-view-active');

    // preload edit value
    const _todoTitle = document.querySelectorAll('.todo-edit-name');
    const _todoDate = document.querySelectorAll('.edit-due-date');
    _todoTitle[taskIndex].value = task.taskList[taskIndex].title;
    _todoDate[taskIndex].value = task.taskList[taskIndex].dueDate;
};

function cancelEditTodo(e) {
    const targetIndex = e.target.parentNode.parentNode.parentNode.dataset.taskIndex;
    // show default view according to the selected task index
    const _todoLeftSide = document.querySelectorAll('.todo-left-side');
    const _todoRightSide = document.querySelectorAll('.todo-right-side');
    _todoLeftSide[targetIndex].classList.remove('edit-view-active');
    _todoRightSide[targetIndex].classList.remove('edit-view-active');

    // hide edit view according to the selected task index
    const _todoLeftEdit = document.querySelectorAll('.todo-left-edit');
    const _todoRightEdit = document.querySelectorAll('.todo-right-edit');
    _todoLeftEdit[targetIndex].classList.add('default-view-active');
    _todoRightEdit[targetIndex].classList.add('default-view-active');
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
    hideAddTaskBtn();
    changeButtonState('home');
    console.log(currentProjectIndex);

    const projects = project.getLocalStorage();
    const todos = task.resetTaskList();
    projects.forEach((project) => {
        project.task.forEach(todo => {
            task.taskList.push(todo);
        });
    });

    renderTasks(todos);
};

// NavBar - today button
const todayBtn = document.querySelector('.todayBtn');
todayBtn.addEventListener('click', renderToday);

function renderToday() {
    hideAddTaskBtn();
    changeButtonState('today');
    console.log(currentProjectIndex);

    const todayDate = format(new Date(), "yyyy-MM-dd");
    const projects = project.getLocalStorage();
    const todos = task.resetTaskList();
    projects.forEach(project => {
        project.task.forEach(todo => {
            if (todo.dueDate == todayDate) {
                todos.push(todo);
            }
        })
    });

    renderTasks(todos);
};

// NavBar - week button
const weekBtn = document.querySelector('.weekBtn');
weekBtn.addEventListener('click', renderWeek);

function renderWeek() {
    hideAddTaskBtn();
    changeButtonState('week');
    console.log(currentProjectIndex);

    const projects = project.getLocalStorage();
    const todos = task.resetTaskList();
    projects.forEach(project => {
        project.task.forEach(todo => {
            if (isThisWeek(todo.dueDate)) {
                todos.push(todo);
            }
        })
    });

    renderTasks(todos);
};

export {
    clearProjectDisplay,
    renderProjects,
    renderTasks,
    renderHome,
};