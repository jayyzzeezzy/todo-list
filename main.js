/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearProjectDisplay: () => (/* binding */ clearProjectDisplay),
/* harmony export */   renderProjects: () => (/* binding */ renderProjects),
/* harmony export */   renderTasks: () => (/* binding */ renderTasks)
/* harmony export */ });
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/modules/task.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");




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

    _project_js__WEBPACK_IMPORTED_MODULE_1__.addProject(projectInput.value);
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
    _project_js__WEBPACK_IMPORTED_MODULE_1__.projectList.forEach((project, index) => {
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
    _task_js__WEBPACK_IMPORTED_MODULE_0__.getTaskFromProject(projectIndex);
    renderTasks();

    console.log(projectTitle);
    console.log(projectIndex);
    
    if (e.target.classList.contains('delete-project-button')) {
        deleteProjectFromDom(projectIndex);
        return
    };
    
};

function deleteProjectFromDom(index) {
    _project_js__WEBPACK_IMPORTED_MODULE_1__.spliceProjectList(index);

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

    _task_js__WEBPACK_IMPORTED_MODULE_0__.addTask(taskInput.value, dateInput.value);
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
    _task_js__WEBPACK_IMPORTED_MODULE_0__.taskList.forEach((task, index) => {
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
};

function deleteTaskFromDom(e) {
    const targetIndex = e.target.parentNode.parentNode.dataset.taskIndex;
    _task_js__WEBPACK_IMPORTED_MODULE_0__.spliceTaskList(targetIndex);

    // renderTasks will also clear display
    renderTasks();
};

function hideDefaultTodoView(e) {
    const targetIndex = e.target.parentNode.parentNode.dataset.taskIndex;
    // hide default view according to the selected task index
    const _todoLeftSide = document.querySelectorAll('.todo-left-side');
    const _todoRightSide = document.querySelectorAll('.todo-right-side');
    _todoLeftSide[targetIndex].classList.add('edit-view-active');
    _todoRightSide[targetIndex].classList.add('edit-view-active');


    // show edit view accroding to the selected task index
    const _todoLeftEdit = document.querySelectorAll('.todo-left-edit');
    const _todoRightEdit = document.querySelectorAll('.todo-right-edit');
    _todoLeftEdit[targetIndex].classList.remove('default-view-active');
    _todoRightEdit[targetIndex].classList.remove('default-view-active');

    // preload edit value
    const _todoTitle = document.querySelectorAll('.todo-edit-name');
    const _todoDate = document.querySelectorAll('.edit-due-date');
    _todoTitle[targetIndex].value = _task_js__WEBPACK_IMPORTED_MODULE_0__.taskList[targetIndex].title;
    _todoDate[targetIndex].value = _task_js__WEBPACK_IMPORTED_MODULE_0__.taskList[targetIndex].dueDate;
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
    _task_js__WEBPACK_IMPORTED_MODULE_0__.updateTodo(
        targetIndex, 
        _todoUpdateName[targetIndex].value, 
        _todoUpdateDate[targetIndex].value
    );
};



/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateProject: () => (/* binding */ CreateProject),
/* harmony export */   addProject: () => (/* binding */ addProject),
/* harmony export */   projectList: () => (/* binding */ projectList),
/* harmony export */   spliceProjectList: () => (/* binding */ spliceProjectList)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");



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
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.saveProjectToLocalStorage();
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.renderProjects();
};

function spliceProjectList(index) {
    if (index > -1) {
        projectList.splice(index, 1);
        _storage_js__WEBPACK_IMPORTED_MODULE_1__.saveProjectToLocalStorage();
    }
    console.log(projectList);
};



/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   saveProjectToLocalStorage: () => (/* binding */ saveProjectToLocalStorage)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");


function saveProjectToLocalStorage() {
    const projects = _project_js__WEBPACK_IMPORTED_MODULE_0__.projectList;
    const projectListInJSON = JSON.stringify(projects);
    localStorage.setItem("projectList", projectListInJSON);
};




/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateTask: () => (/* binding */ CreateTask),
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   getTaskFromProject: () => (/* binding */ getTaskFromProject),
/* harmony export */   spliceTaskList: () => (/* binding */ spliceTaskList),
/* harmony export */   taskList: () => (/* binding */ taskList),
/* harmony export */   updateTodo: () => (/* binding */ updateTodo)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");



let taskList = [];

function getTaskFromProject(projectIndex) {
    taskList = _project_js__WEBPACK_IMPORTED_MODULE_1__.projectList[projectIndex].task;
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.renderTasks();
};

function CreateTask(title, dueDate) {
    if (dueDate == '') {
        dueDate = 'No due date';
    };

    return {
        title,
        dueDate,
    };
};

function addTask(name, dueDate) {
    const task = CreateTask(name, dueDate);
    taskList.push(task);
    console.log(taskList);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.renderTasks();
};

function spliceTaskList(index) {
    if (index > -1) {
        taskList.splice(index, 1);
    }
    console.log(taskList);
};

function updateTodo(taskIndex, newName, newDate) {
    taskList[taskIndex].title = newName;
    taskList[taskIndex].dueDate = newDate;
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.renderTasks();
    console.log(taskList);
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom.js */ "./src/modules/dom.js");


_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.renderProjects();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBZTtBQUNuQjtBQUNBOzs7Ozs7OztVQ3hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QywyREFBa0IsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgKiBhcyB0YXNrIGZyb20gJy4vdGFzay5qcyc7XG5pbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbi8vIHBvcCB1cCBwcm9qZWN0IGZvcm1cbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdEJ0bicpO1xuY29uc3QgZGlzcGxheUFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzcGxheS1hZGQtcHJvamVjdCcpO1xuYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNob3dQcm9qZWN0Rm9ybSgpKTtcbmZ1bmN0aW9uIHNob3dQcm9qZWN0Rm9ybSgpIHtcbiAgICBhZGRQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUtYnRuLWFjdGl2ZScpO1xuICAgIGRpc3BsYXlBZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtaW5wdXQnKTtcbn07XG5cbi8vIHByb2plY3QgZm9ybSAtIGNhbmNlbCBhY3Rpb25cbmNvbnN0IHByb2plY3RDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jYW5jZWwtYnRuJyk7XG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZVByb2plY3RGb3JtKCkpO1xuZnVuY3Rpb24gaGlkZVByb2plY3RGb3JtKCkge1xuICAgIGRpc3BsYXlBZGRQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICBhZGRQcm9qZWN0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtYnRuLWFjdGl2ZScpO1xufTtcblxuLy8gcHJvamVjdCBmb3JtIC0gYWRkIGFjdGlvblxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWFkZC1idG4nKTtcbnByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBhZGRQcm9qZWN0Rm9ybSgpKTtcbmZ1bmN0aW9uIGFkZFByb2plY3RGb3JtKCkge1xuICAgIGhpZGVQcm9qZWN0Rm9ybSgpO1xuXG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0Jyk7XG4gICAgaWYgKCFwcm9qZWN0SW5wdXQudmFsdWUpIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIG5hbWUnKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgcHJvamVjdElucHV0LnZhbHVlID0gJyc7XG59O1xuXG4vLyBET00gbG9naWMgdGhhdCBib3Jyb3dzIGZ1bmN0aW9ucyBmcm9tIHRoZSBwcm9qZWN0IG1vZHVsZVxuZnVuY3Rpb24gY2xlYXJQcm9qZWN0RGlzcGxheSgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdENvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xufTtcblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgY2xlYXJQcm9qZWN0RGlzcGxheSgpO1xuXG4gICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgcHJvamVjdC5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgICBwcm9qZWN0TGlzdENvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3Qtc2VsZWN0XCIgZGF0YS1wcm9qZWN0LWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgICAgICAke3Byb2plY3QudGl0bGV9XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXRyYXNoLWNhbiBkZWxldGUtcHJvamVjdC1idXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGxpc3RlbkZvclByb2plY3RDbGljaygpO1xufTtcblxuZnVuY3Rpb24gbGlzdGVuRm9yUHJvamVjdENsaWNrKCkge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3Qtc2VsZWN0Jyk7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIC8vIHBhc3MgYnV0dG9uIHRvIGV2ZW50IGhhbmRsZXIgLT4gaGFuZGxlUHJvamVjdENsaWNrXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVByb2plY3RDbGljayk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVQcm9qZWN0Q2xpY2soZSkge1xuICAgIC8vIHRoaXMgcmVmZXJzIHRvIGJ1dHRvbiBmcm9tIHByb2plY3RCdXR0b25zXG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gdGhpcy50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jyk7XG4gICAgdGFzay5nZXRUYXNrRnJvbVByb2plY3QocHJvamVjdEluZGV4KTtcbiAgICByZW5kZXJUYXNrcygpO1xuXG4gICAgY29uc29sZS5sb2cocHJvamVjdFRpdGxlKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0SW5kZXgpO1xuICAgIFxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpKSB7XG4gICAgICAgIGRlbGV0ZVByb2plY3RGcm9tRG9tKHByb2plY3RJbmRleCk7XG4gICAgICAgIHJldHVyblxuICAgIH07XG4gICAgXG59O1xuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0RnJvbURvbShpbmRleCkge1xuICAgIHByb2plY3Quc3BsaWNlUHJvamVjdExpc3QoaW5kZXgpO1xuXG4gICAgLy8gcmVuZGVyUHJvamVjdHMgaW5jbHVkZXMgdGhlIGNsZWFyUHJvamVjdERpc3BsYXkgZnVuY3Rpb25cbiAgICByZW5kZXJQcm9qZWN0cygpO1xufTtcblxuLy8gcG9wIHVwIHRhc2sgZm9ybVxuY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idG4nKTtcbmNvbnN0IGRpc3BsYXlBZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rpc3BsYXktYWRkLXRhc2snKTtcbmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VGFza0Zvcm0pO1xuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCkge1xuICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZS1idG4tYWN0aXZlJyk7XG4gICAgZGlzcGxheUFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1pbnB1dCcpO1xufTtcblxuLy8gdGFzayBmb3JtIC0gY2FuY2VsIGFjdGlvblxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbmNlbC1idG4nKTtcbnRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlVGFza0Zvcm0pO1xuZnVuY3Rpb24gaGlkZVRhc2tGb3JtKCkge1xuICAgIGRpc3BsYXlBZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtYnRuLWFjdGl2ZScpO1xufTtcblxuLy8gdGFzayBmb3JtIC0gYWRkIGFjdGlvblxuY29uc3QgdGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWFkZC1idG4nKTtcbnRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRUYXNrRm9ybSk7XG5mdW5jdGlvbiBhZGRUYXNrRm9ybSgpIHtcbiAgICBoaWRlVGFza0Zvcm0oKTtcblxuICAgIGNvbnN0IHRhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1pbnB1dCcpO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWR1ZS1kYXRlJyk7XG4gICAgaWYgKCF0YXNrSW5wdXQudmFsdWUpIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIG5hbWUnKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGFzay5hZGRUYXNrKHRhc2tJbnB1dC52YWx1ZSwgZGF0ZUlucHV0LnZhbHVlKTtcbiAgICB0YXNrSW5wdXQudmFsdWUgPSAnJztcbiAgICBkYXRlSW5wdXQudmFsdWUgPSAnJztcbn07XG5cbi8vIGJvcnJvdyBmdW5jdGlvbnMgZnJvbSB0aGUgdGFzayBtb2R1bGVcbmZ1bmN0aW9uIGNsZWFyVGFza0Rpc3BsYXkoKSB7XG4gICAgY29uc3QgdG9kb0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG4gICAgdG9kb0xpc3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbn07XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKCkge1xuICAgIGNsZWFyVGFza0Rpc3BsYXkoKTtcblxuICAgIGNvbnN0IHRvZG9MaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuICAgIHRhc2sudGFza0xpc3QuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgdG9kb0xpc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBkYXRhLXRhc2staW5kZXg9XCIke2luZGV4fVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWxlZnQtc2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jaXJjbGVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidG9kby10aXRsZVwiPiR7dGFzay50aXRsZX08L1A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1sZWZ0LWVkaXQgZGVmYXVsdC12aWV3LWFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRvZG8tZWRpdC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1zaWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidG9kby1kdWUtZGF0ZVwiPiR7dGFzay5kdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXBlbi10by1zcXVhcmUgZWRpdC10YXNrLWJ1dHRvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXRyYXNoLWNhbiBkZWxldGUtdGFzay1idXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1lZGl0IGRlZmF1bHQtdmlldy1hY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdC1kdWUtZGF0ZVwiIHR5cGU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0LWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjb25maXJtLWVkaXRcIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLWVkaXRcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGhhbmRsZVRvZG9CdG5DbGlja3MoKTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZVRvZG9CdG5DbGlja3MoKSB7XG4gICAgLy8gbWFrZSBldmVudCBsaXN0ZW5lciBmb3IgZWFjaCBmdW5jdGlvbmFsaXR5XG4gICAgY29uc3QgdGFza0RlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtdGFzay1idXR0b24nKTtcbiAgICB0YXNrRGVsZXRlLmZvckVhY2goYnRuID0+IHtidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVUYXNrRnJvbURvbSl9KTtcblxuICAgIGNvbnN0IHRhc2tFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtdGFzay1idXR0b24nKTtcbiAgICB0YXNrRWRpdC5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlRGVmYXVsdFRvZG9WaWV3KSk7XG5cbiAgICBjb25zdCB0YXNrQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhbmNlbC1lZGl0Jyk7XG4gICAgdGFza0NhbmNlbC5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYW5jZWxFZGl0VG9kbykpO1xuXG4gICAgY29uc3QgdGFza0NvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29uZmlybS1lZGl0Jyk7XG4gICAgdGFza0NvbmZpcm0uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybUVkaXRUb2RvKSk7XG59O1xuXG5mdW5jdGlvbiBkZWxldGVUYXNrRnJvbURvbShlKSB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrSW5kZXg7XG4gICAgdGFzay5zcGxpY2VUYXNrTGlzdCh0YXJnZXRJbmRleCk7XG5cbiAgICAvLyByZW5kZXJUYXNrcyB3aWxsIGFsc28gY2xlYXIgZGlzcGxheVxuICAgIHJlbmRlclRhc2tzKCk7XG59O1xuXG5mdW5jdGlvbiBoaWRlRGVmYXVsdFRvZG9WaWV3KGUpIHtcbiAgICBjb25zdCB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LnRhc2tJbmRleDtcbiAgICAvLyBoaWRlIGRlZmF1bHQgdmlldyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgX3RvZG9SaWdodFNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1zaWRlJyk7XG4gICAgX3RvZG9MZWZ0U2lkZVt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZWRpdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRTaWRlW3RhcmdldEluZGV4XS5jbGFzc0xpc3QuYWRkKCdlZGl0LXZpZXctYWN0aXZlJyk7XG5cblxuICAgIC8vIHNob3cgZWRpdCB2aWV3IGFjY3JvZGluZyB0byB0aGUgc2VsZWN0ZWQgdGFzayBpbmRleFxuICAgIGNvbnN0IF90b2RvTGVmdEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1sZWZ0LWVkaXQnKTtcbiAgICBjb25zdCBfdG9kb1JpZ2h0RWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLXJpZ2h0LWVkaXQnKTtcbiAgICBfdG9kb0xlZnRFZGl0W3RhcmdldEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG4gICAgX3RvZG9SaWdodEVkaXRbdGFyZ2V0SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHQtdmlldy1hY3RpdmUnKTtcblxuICAgIC8vIHByZWxvYWQgZWRpdCB2YWx1ZVxuICAgIGNvbnN0IF90b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1lZGl0LW5hbWUnKTtcbiAgICBjb25zdCBfdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC1kdWUtZGF0ZScpO1xuICAgIF90b2RvVGl0bGVbdGFyZ2V0SW5kZXhdLnZhbHVlID0gdGFzay50YXNrTGlzdFt0YXJnZXRJbmRleF0udGl0bGU7XG4gICAgX3RvZG9EYXRlW3RhcmdldEluZGV4XS52YWx1ZSA9IHRhc2sudGFza0xpc3RbdGFyZ2V0SW5kZXhdLmR1ZURhdGU7XG59O1xuXG5mdW5jdGlvbiBjYW5jZWxFZGl0VG9kbyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LnRhc2tJbmRleDtcbiAgICAvLyBzaG93IGRlZmF1bHQgdmlldyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgX3RvZG9SaWdodFNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1zaWRlJyk7XG4gICAgX3RvZG9MZWZ0U2lkZVt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRTaWRlW3RhcmdldEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXZpZXctYWN0aXZlJyk7XG5cbiAgICAvLyBoaWRlIGVkaXQgdmlldyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1lZGl0Jyk7XG4gICAgY29uc3QgX3RvZG9SaWdodEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1lZGl0Jyk7XG4gICAgX3RvZG9MZWZ0RWRpdFt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZGVmYXVsdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRFZGl0W3RhcmdldEluZGV4XS5jbGFzc0xpc3QuYWRkKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG59O1xuXG5mdW5jdGlvbiBjb25maXJtRWRpdFRvZG8oZSkge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrSW5kZXg7XG4gICAgY29uc3QgX3RvZG9VcGRhdGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tZWRpdC1uYW1lJyk7XG4gICAgY29uc3QgX3RvZG9VcGRhdGVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtZHVlLWRhdGUnKTtcbiAgICB0YXNrLnVwZGF0ZVRvZG8oXG4gICAgICAgIHRhcmdldEluZGV4LCBcbiAgICAgICAgX3RvZG9VcGRhdGVOYW1lW3RhcmdldEluZGV4XS52YWx1ZSwgXG4gICAgICAgIF90b2RvVXBkYXRlRGF0ZVt0YXJnZXRJbmRleF0udmFsdWVcbiAgICApO1xufTtcblxuZXhwb3J0IHtcbiAgICBjbGVhclByb2plY3REaXNwbGF5LFxuICAgIHJlbmRlclByb2plY3RzLFxuICAgIHJlbmRlclRhc2tzLFxufTsiLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG5sZXQgcHJvamVjdExpc3QgPSBbXTtcblxubGV0IGxvY2FsUHJvamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpO1xuaWYgKCFsb2NhbFByb2plY3RzKSB7XG4gICAgY29uc29sZS5sb2coJ05vIGxvY2FsbHkgc3RvcmVkIHByb2plY3RzJyk7XG59XG5lbHNlIHtcbiAgICBwcm9qZWN0TGlzdCA9IEpTT04ucGFyc2UobG9jYWxQcm9qZWN0cyk7XG59O1xuXG4vLyBwcm9qZWN0IGZ1bmN0aW9uIGZhY3RvcnlcbmZ1bmN0aW9uIENyZWF0ZVByb2plY3QodGl0bGUpIHtcbiAgICBjb25zdCB0YXNrID0gW107XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHRhc2tcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYWRkUHJvamVjdCh0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBDcmVhdGVQcm9qZWN0KHRpdGxlKTtcbiAgICBwcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcbiAgICBzdG9yYWdlLnNhdmVQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbn07XG5cbmZ1bmN0aW9uIHNwbGljZVByb2plY3RMaXN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgc3RvcmFnZS5zYXZlUHJvamVjdFRvTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcbn07XG5cbmV4cG9ydCB7XG4gICAgcHJvamVjdExpc3QsXG4gICAgQ3JlYXRlUHJvamVjdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIHNwbGljZVByb2plY3RMaXN0LFxufTsiLCJpbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbmZ1bmN0aW9uIHNhdmVQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBwcm9qZWN0LnByb2plY3RMaXN0O1xuICAgIGNvbnN0IHByb2plY3RMaXN0SW5KU09OID0gSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIiwgcHJvamVjdExpc3RJbkpTT04pO1xufTtcblxuXG5leHBvcnQge1xuICAgIHNhdmVQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UsXG59OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbmxldCB0YXNrTGlzdCA9IFtdO1xuXG5mdW5jdGlvbiBnZXRUYXNrRnJvbVByb2plY3QocHJvamVjdEluZGV4KSB7XG4gICAgdGFza0xpc3QgPSBwcm9qZWN0LnByb2plY3RMaXN0W3Byb2plY3RJbmRleF0udGFzaztcbiAgICBkb20ucmVuZGVyVGFza3MoKTtcbn07XG5cbmZ1bmN0aW9uIENyZWF0ZVRhc2sodGl0bGUsIGR1ZURhdGUpIHtcbiAgICBpZiAoZHVlRGF0ZSA9PSAnJykge1xuICAgICAgICBkdWVEYXRlID0gJ05vIGR1ZSBkYXRlJztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGR1ZURhdGUsXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGFkZFRhc2sobmFtZSwgZHVlRGF0ZSkge1xuICAgIGNvbnN0IHRhc2sgPSBDcmVhdGVUYXNrKG5hbWUsIGR1ZURhdGUpO1xuICAgIHRhc2tMaXN0LnB1c2godGFzayk7XG4gICAgY29uc29sZS5sb2codGFza0xpc3QpO1xuICAgIGRvbS5yZW5kZXJUYXNrcygpO1xufTtcblxuZnVuY3Rpb24gc3BsaWNlVGFza0xpc3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0YXNrTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0YXNrTGlzdCk7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVUb2RvKHRhc2tJbmRleCwgbmV3TmFtZSwgbmV3RGF0ZSkge1xuICAgIHRhc2tMaXN0W3Rhc2tJbmRleF0udGl0bGUgPSBuZXdOYW1lO1xuICAgIHRhc2tMaXN0W3Rhc2tJbmRleF0uZHVlRGF0ZSA9IG5ld0RhdGU7XG4gICAgZG9tLnJlbmRlclRhc2tzKCk7XG4gICAgY29uc29sZS5sb2codGFza0xpc3QpO1xufTtcblxuZXhwb3J0IHtcbiAgICB0YXNrTGlzdCxcbiAgICBDcmVhdGVUYXNrLFxuICAgIGFkZFRhc2ssXG4gICAgc3BsaWNlVGFza0xpc3QsXG4gICAgdXBkYXRlVG9kbyxcbiAgICBnZXRUYXNrRnJvbVByb2plY3QsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vbW9kdWxlcy9kb20uanMnO1xuXG5kb20ucmVuZGVyUHJvamVjdHMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=