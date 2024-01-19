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
/* harmony export */   renderAllTasks: () => (/* binding */ renderAllTasks),
/* harmony export */   renderProjects: () => (/* binding */ renderProjects),
/* harmony export */   renderTasks: () => (/* binding */ renderTasks)
/* harmony export */ });
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/modules/task.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");




let currentProjectIndex = 0;

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
    changeCurrentProjectIndex(projectIndex);
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

    _task_js__WEBPACK_IMPORTED_MODULE_0__.addTask(taskInput.value, dateInput.value, currentProjectIndex);
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

// navbar function and logic
const homeBtn = document.querySelector('.homeBtn');
homeBtn.addEventListener('click', renderAllTasks);

function renderAllTasks() {
    const projects = _project_js__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage();
    const todos = _task_js__WEBPACK_IMPORTED_MODULE_0__.resetTaskList();
    projects.forEach(project => {
        project.task.forEach(todo => {
            todos.push(todo);
        });
    });

    renderTasks();
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
/* harmony export */   getLocalStorage: () => (/* binding */ getLocalStorage),
/* harmony export */   projectList: () => (/* binding */ projectList),
/* harmony export */   spliceProjectList: () => (/* binding */ spliceProjectList),
/* harmony export */   updateProjectList: () => (/* binding */ updateProjectList)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");



let projectList = [];

function getLocalStorage() {
    let localProjects = localStorage.getItem("projectList");
    if (!localProjects) {
        console.log('No locally stored projects');
    }
    else {
        projectList = JSON.parse(localProjects);
    };
    return projectList;
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

function updateProjectList(index, list) {
    projectList[index].task = list;
    _storage_js__WEBPACK_IMPORTED_MODULE_1__.saveProjectToLocalStorage();
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
/* harmony export */   resetTaskList: () => (/* binding */ resetTaskList),
/* harmony export */   spliceTaskList: () => (/* binding */ spliceTaskList),
/* harmony export */   taskList: () => (/* binding */ taskList),
/* harmony export */   updateTodo: () => (/* binding */ updateTodo)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");



let taskList = [];

function getTaskFromProject(projectIndex) {
    taskList = _project_js__WEBPACK_IMPORTED_MODULE_1__.projectList[projectIndex].task;
};

function resetTaskList() {
    taskList = [];
    return taskList;
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

function addTask(name, dueDate, projectIndex) {
    const task = CreateTask(name, dueDate);
    taskList.push(task);
    _project_js__WEBPACK_IMPORTED_MODULE_1__.updateProjectList(projectIndex, taskList);
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
/* harmony import */ var _modules_project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/project.js */ "./src/modules/project.js");



_modules_project_js__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage();
_modules_dom_js__WEBPACK_IMPORTED_MODULE_0__.renderProjects();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7OztBQ05nQztBQUNROztBQUV4Qzs7QUFFQTtBQUNBLGVBQWUsb0RBQW1CO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksMERBQXlCO0FBQzdCO0FBQ0EsSUFBSSxnREFBZTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBZTtBQUNuQjtBQUNBOzs7Ozs7OztVQzlDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053QztBQUNROztBQUVoRCxnRUFBdUI7QUFDdkIsMkRBQWtCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0ICogYXMgdGFzayBmcm9tICcuL3Rhc2suanMnO1xuaW1wb3J0ICogYXMgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xuXG5sZXQgY3VycmVudFByb2plY3RJbmRleCA9IDA7XG5cbmZ1bmN0aW9uIGNoYW5nZUN1cnJlbnRQcm9qZWN0SW5kZXgoaW5kZXgpIHtcbiAgICBjdXJyZW50UHJvamVjdEluZGV4ID0gaW5kZXg7XG59O1xuXG4vLyBwb3AgdXAgcHJvamVjdCBmb3JtXG5jb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3RCdG4nKTtcbmNvbnN0IGRpc3BsYXlBZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rpc3BsYXktYWRkLXByb2plY3QnKTtcbmFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzaG93UHJvamVjdEZvcm0oKSk7XG5mdW5jdGlvbiBzaG93UHJvamVjdEZvcm0oKSB7XG4gICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbiAgICBkaXNwbGF5QWRkUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWlucHV0Jyk7XG59O1xuXG4vLyBwcm9qZWN0IGZvcm0gLSBjYW5jZWwgYWN0aW9uXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY2FuY2VsLWJ0bicpO1xucHJvamVjdENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhpZGVQcm9qZWN0Rm9ybSgpKTtcbmZ1bmN0aW9uIGhpZGVQcm9qZWN0Rm9ybSgpIHtcbiAgICBkaXNwbGF5QWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKCdoaWRlLWlucHV0Jyk7XG4gICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbn07XG5cbi8vIHByb2plY3QgZm9ybSAtIGFkZCBhY3Rpb25cbmNvbnN0IHByb2plY3RBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1hZGQtYnRuJyk7XG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYWRkUHJvamVjdEZvcm0oKSk7XG5mdW5jdGlvbiBhZGRQcm9qZWN0Rm9ybSgpIHtcbiAgICBoaWRlUHJvamVjdEZvcm0oKTtcblxuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1pbnB1dCcpO1xuICAgIGlmICghcHJvamVjdElucHV0LnZhbHVlKSB7XG4gICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSBuYW1lJyk7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0SW5wdXQudmFsdWUpO1xuICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xufTtcblxuLy8gRE9NIGxvZ2ljIHRoYXQgYm9ycm93cyBmdW5jdGlvbnMgZnJvbSB0aGUgcHJvamVjdCBtb2R1bGVcbmZ1bmN0aW9uIGNsZWFyUHJvamVjdERpc3BsYXkoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgcHJvamVjdExpc3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbn07XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgIGNsZWFyUHJvamVjdERpc3BsYXkoKTtcblxuICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIHByb2plY3QucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgcHJvamVjdExpc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0LXNlbGVjdFwiIGRhdGEtcHJvamVjdC1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICAgICAgJHtwcm9qZWN0LnRpdGxlfVxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS10cmFzaC1jYW4gZGVsZXRlLXByb2plY3QtYnV0dG9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBsaXN0ZW5Gb3JQcm9qZWN0Q2xpY2soKTtcbn07XG5cbmZ1bmN0aW9uIGxpc3RlbkZvclByb2plY3RDbGljaygpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LXNlbGVjdCcpO1xuICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAvLyBwYXNzIGJ1dHRvbiB0byBldmVudCBoYW5kbGVyIC0+IGhhbmRsZVByb2plY3RDbGlja1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQcm9qZWN0Q2xpY2spO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlUHJvamVjdENsaWNrKGUpIHtcbiAgICAvLyB0aGlzIHJlZmVycyB0byBidXR0b24gZnJvbSBwcm9qZWN0QnV0dG9uc1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpO1xuICAgIGNoYW5nZUN1cnJlbnRQcm9qZWN0SW5kZXgocHJvamVjdEluZGV4KTtcbiAgICB0YXNrLmdldFRhc2tGcm9tUHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlclRhc2tzKCk7XG5cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0VGl0bGUpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleCk7XG5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdC1idXR0b24nKSkge1xuICAgICAgICBkZWxldGVQcm9qZWN0RnJvbURvbShwcm9qZWN0SW5kZXgpO1xuICAgICAgICByZXR1cm5cbiAgICB9O1xuICAgIFxufTtcblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdEZyb21Eb20oaW5kZXgpIHtcbiAgICBwcm9qZWN0LnNwbGljZVByb2plY3RMaXN0KGluZGV4KTtcblxuICAgIC8vIHJlbmRlclByb2plY3RzIGluY2x1ZGVzIHRoZSBjbGVhclByb2plY3REaXNwbGF5IGZ1bmN0aW9uXG4gICAgcmVuZGVyUHJvamVjdHMoKTtcbn07XG5cbi8vIHBvcCB1cCB0YXNrIGZvcm1cbmNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJyk7XG5jb25zdCBkaXNwbGF5QWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5LWFkZC10YXNrJyk7XG5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Rhc2tGb3JtKTtcbmZ1bmN0aW9uIHNob3dUYXNrRm9ybSgpIHtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUtYnRuLWFjdGl2ZScpO1xuICAgIGRpc3BsYXlBZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtaW5wdXQnKTtcbn07XG5cbi8vIHRhc2sgZm9ybSAtIGNhbmNlbCBhY3Rpb25cbmNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW5jZWwtYnRuJyk7XG50YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVRhc2tGb3JtKTtcbmZ1bmN0aW9uIGhpZGVUYXNrRm9ybSgpIHtcbiAgICBkaXNwbGF5QWRkVGFzay5jbGFzc0xpc3QuYWRkKCdoaWRlLWlucHV0Jyk7XG4gICAgYWRkVGFza0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbn07XG5cbi8vIHRhc2sgZm9ybSAtIGFkZCBhY3Rpb25cbmNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1hZGQtYnRuJyk7XG50YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFza0Zvcm0pO1xuZnVuY3Rpb24gYWRkVGFza0Zvcm0oKSB7XG4gICAgaGlkZVRhc2tGb3JtKCk7XG5cbiAgICBjb25zdCB0YXNrSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2staW5wdXQnKTtcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1kdWUtZGF0ZScpO1xuICAgIGlmICghdGFza0lucHV0LnZhbHVlKSB7XG4gICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSBuYW1lJyk7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRhc2suYWRkVGFzayh0YXNrSW5wdXQudmFsdWUsIGRhdGVJbnB1dC52YWx1ZSwgY3VycmVudFByb2plY3RJbmRleCk7XG4gICAgdGFza0lucHV0LnZhbHVlID0gJyc7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gJyc7XG59O1xuXG4vLyBib3Jyb3cgZnVuY3Rpb25zIGZyb20gdGhlIHRhc2sgbW9kdWxlXG5mdW5jdGlvbiBjbGVhclRhc2tEaXNwbGF5KCkge1xuICAgIGNvbnN0IHRvZG9MaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XG59O1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrcygpIHtcbiAgICBjbGVhclRhc2tEaXNwbGF5KCk7XG5cbiAgICBjb25zdCB0b2RvTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbiAgICB0YXNrLnRhc2tMaXN0LmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICAgIHRvZG9MaXN0Q29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1pdGVtXCIgZGF0YS10YXNrLWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1sZWZ0LXNpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tdGl0bGVcIj4ke3Rhc2sudGl0bGV9PC9QPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbGVmdC1lZGl0IGRlZmF1bHQtdmlldy1hY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0b2RvLWVkaXQtbmFtZVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tcmlnaHQtc2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tZHVlLWRhdGVcIj4ke3Rhc2suZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1wZW4tdG8tc3F1YXJlIGVkaXQtdGFzay1idXR0b25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS10cmFzaC1jYW4gZGVsZXRlLXRhc2stYnV0dG9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tcmlnaHQtZWRpdCBkZWZhdWx0LXZpZXctYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXQtZHVlLWRhdGVcIiB0eXBlPVwiZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29uZmlybS1lZGl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbC1lZGl0XCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBoYW5kbGVUb2RvQnRuQ2xpY2tzKCk7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVUb2RvQnRuQ2xpY2tzKCkge1xuICAgIC8vIG1ha2UgZXZlbnQgbGlzdGVuZXIgZm9yIGVhY2ggZnVuY3Rpb25hbGl0eVxuICAgIGNvbnN0IHRhc2tEZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlLXRhc2stYnV0dG9uJyk7XG4gICAgdGFza0RlbGV0ZS5mb3JFYWNoKGJ0biA9PiB7YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlVGFza0Zyb21Eb20pfSk7XG5cbiAgICBjb25zdCB0YXNrRWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LXRhc2stYnV0dG9uJyk7XG4gICAgdGFza0VkaXQuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZURlZmF1bHRUb2RvVmlldykpO1xuXG4gICAgY29uc3QgdGFza0NhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYW5jZWwtZWRpdCcpO1xuICAgIHRhc2tDYW5jZWwuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FuY2VsRWRpdFRvZG8pKTtcblxuICAgIGNvbnN0IHRhc2tDb25maXJtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbmZpcm0tZWRpdCcpO1xuICAgIHRhc2tDb25maXJtLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm1FZGl0VG9kbykpO1xufTtcblxuZnVuY3Rpb24gZGVsZXRlVGFza0Zyb21Eb20oZSkge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRhdGFzZXQudGFza0luZGV4O1xuICAgIHRhc2suc3BsaWNlVGFza0xpc3QodGFyZ2V0SW5kZXgpO1xuXG4gICAgLy8gcmVuZGVyVGFza3Mgd2lsbCBhbHNvIGNsZWFyIGRpc3BsYXlcbiAgICByZW5kZXJUYXNrcygpO1xufTtcblxuZnVuY3Rpb24gaGlkZURlZmF1bHRUb2RvVmlldyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrSW5kZXg7XG4gICAgLy8gaGlkZSBkZWZhdWx0IHZpZXcgYWNjb3JkaW5nIHRvIHRoZSBzZWxlY3RlZCB0YXNrIGluZGV4XG4gICAgY29uc3QgX3RvZG9MZWZ0U2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWxlZnQtc2lkZScpO1xuICAgIGNvbnN0IF90b2RvUmlnaHRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tcmlnaHQtc2lkZScpO1xuICAgIF90b2RvTGVmdFNpZGVbdGFyZ2V0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdmlldy1hY3RpdmUnKTtcbiAgICBfdG9kb1JpZ2h0U2lkZVt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZWRpdC12aWV3LWFjdGl2ZScpO1xuXG5cbiAgICAvLyBzaG93IGVkaXQgdmlldyBhY2Nyb2RpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1lZGl0Jyk7XG4gICAgY29uc3QgX3RvZG9SaWdodEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1lZGl0Jyk7XG4gICAgX3RvZG9MZWZ0RWRpdFt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZGVmYXVsdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRFZGl0W3RhcmdldEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG5cbiAgICAvLyBwcmVsb2FkIGVkaXQgdmFsdWVcbiAgICBjb25zdCBfdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tZWRpdC1uYW1lJyk7XG4gICAgY29uc3QgX3RvZG9EYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtZHVlLWRhdGUnKTtcbiAgICBfdG9kb1RpdGxlW3RhcmdldEluZGV4XS52YWx1ZSA9IHRhc2sudGFza0xpc3RbdGFyZ2V0SW5kZXhdLnRpdGxlO1xuICAgIF90b2RvRGF0ZVt0YXJnZXRJbmRleF0udmFsdWUgPSB0YXNrLnRhc2tMaXN0W3RhcmdldEluZGV4XS5kdWVEYXRlO1xufTtcblxuZnVuY3Rpb24gY2FuY2VsRWRpdFRvZG8oZSkge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrSW5kZXg7XG4gICAgLy8gc2hvdyBkZWZhdWx0IHZpZXcgYWNjb3JkaW5nIHRvIHRoZSBzZWxlY3RlZCB0YXNrIGluZGV4XG4gICAgY29uc3QgX3RvZG9MZWZ0U2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWxlZnQtc2lkZScpO1xuICAgIGNvbnN0IF90b2RvUmlnaHRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tcmlnaHQtc2lkZScpO1xuICAgIF90b2RvTGVmdFNpZGVbdGFyZ2V0SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtdmlldy1hY3RpdmUnKTtcbiAgICBfdG9kb1JpZ2h0U2lkZVt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC12aWV3LWFjdGl2ZScpO1xuXG4gICAgLy8gaGlkZSBlZGl0IHZpZXcgYWNjb3JkaW5nIHRvIHRoZSBzZWxlY3RlZCB0YXNrIGluZGV4XG4gICAgY29uc3QgX3RvZG9MZWZ0RWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWxlZnQtZWRpdCcpO1xuICAgIGNvbnN0IF90b2RvUmlnaHRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tcmlnaHQtZWRpdCcpO1xuICAgIF90b2RvTGVmdEVkaXRbdGFyZ2V0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2RlZmF1bHQtdmlldy1hY3RpdmUnKTtcbiAgICBfdG9kb1JpZ2h0RWRpdFt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZGVmYXVsdC12aWV3LWFjdGl2ZScpO1xufTtcblxuZnVuY3Rpb24gY29uZmlybUVkaXRUb2RvKGUpIHtcbiAgICBjb25zdCB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRhdGFzZXQudGFza0luZGV4O1xuICAgIGNvbnN0IF90b2RvVXBkYXRlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWVkaXQtbmFtZScpO1xuICAgIGNvbnN0IF90b2RvVXBkYXRlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LWR1ZS1kYXRlJyk7XG4gICAgdGFzay51cGRhdGVUb2RvKFxuICAgICAgICB0YXJnZXRJbmRleCwgXG4gICAgICAgIF90b2RvVXBkYXRlTmFtZVt0YXJnZXRJbmRleF0udmFsdWUsIFxuICAgICAgICBfdG9kb1VwZGF0ZURhdGVbdGFyZ2V0SW5kZXhdLnZhbHVlXG4gICAgKTtcbn07XG5cbi8vIG5hdmJhciBmdW5jdGlvbiBhbmQgbG9naWNcbmNvbnN0IGhvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUJ0bicpO1xuaG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbmRlckFsbFRhc2tzKTtcblxuZnVuY3Rpb24gcmVuZGVyQWxsVGFza3MoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBwcm9qZWN0LmdldExvY2FsU3RvcmFnZSgpO1xuICAgIGNvbnN0IHRvZG9zID0gdGFzay5yZXNldFRhc2tMaXN0KCk7XG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgcHJvamVjdC50YXNrLmZvckVhY2godG9kbyA9PiB7XG4gICAgICAgICAgICB0b2Rvcy5wdXNoKHRvZG8pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJlbmRlclRhc2tzKCk7XG59O1xuXG5leHBvcnQge1xuICAgIGNsZWFyUHJvamVjdERpc3BsYXksXG4gICAgcmVuZGVyUHJvamVjdHMsXG4gICAgcmVuZGVyVGFza3MsXG4gICAgcmVuZGVyQWxsVGFza3MsXG59OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS5qcyc7XG5cbmxldCBwcm9qZWN0TGlzdCA9IFtdO1xuXG5mdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2UoKSB7XG4gICAgbGV0IGxvY2FsUHJvamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpO1xuICAgIGlmICghbG9jYWxQcm9qZWN0cykge1xuICAgICAgICBjb25zb2xlLmxvZygnTm8gbG9jYWxseSBzdG9yZWQgcHJvamVjdHMnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFByb2plY3RzKTtcbiAgICB9O1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbn07XG5cbi8vIHByb2plY3QgZnVuY3Rpb24gZmFjdG9yeVxuZnVuY3Rpb24gQ3JlYXRlUHJvamVjdCh0aXRsZSkge1xuICAgIGNvbnN0IHRhc2sgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgdGFza1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IENyZWF0ZVByb2plY3QodGl0bGUpO1xuICAgIHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xuICAgIHN0b3JhZ2Uuc2F2ZVByb2plY3RUb0xvY2FsU3RvcmFnZSgpO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xufTtcblxuZnVuY3Rpb24gc3BsaWNlUHJvamVjdExpc3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBwcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBzdG9yYWdlLnNhdmVQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoaW5kZXgsIGxpc3QpIHtcbiAgICBwcm9qZWN0TGlzdFtpbmRleF0udGFzayA9IGxpc3Q7XG4gICAgc3RvcmFnZS5zYXZlUHJvamVjdFRvTG9jYWxTdG9yYWdlKCk7XG59O1xuXG5leHBvcnQge1xuICAgIHByb2plY3RMaXN0LFxuICAgIENyZWF0ZVByb2plY3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBzcGxpY2VQcm9qZWN0TGlzdCxcbiAgICB1cGRhdGVQcm9qZWN0TGlzdCxcbiAgICBnZXRMb2NhbFN0b3JhZ2UsXG59OyIsImltcG9ydCAqIGFzIHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcblxuZnVuY3Rpb24gc2F2ZVByb2plY3RUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IHByb2plY3QucHJvamVjdExpc3Q7XG4gICAgY29uc3QgcHJvamVjdExpc3RJbkpTT04gPSBKU09OLnN0cmluZ2lmeShwcm9qZWN0cyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLCBwcm9qZWN0TGlzdEluSlNPTik7XG59O1xuXG5cbmV4cG9ydCB7XG4gICAgc2F2ZVByb2plY3RUb0xvY2FsU3RvcmFnZSxcbn07IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcblxubGV0IHRhc2tMaXN0ID0gW107XG5cbmZ1bmN0aW9uIGdldFRhc2tGcm9tUHJvamVjdChwcm9qZWN0SW5kZXgpIHtcbiAgICB0YXNrTGlzdCA9IHByb2plY3QucHJvamVjdExpc3RbcHJvamVjdEluZGV4XS50YXNrO1xufTtcblxuZnVuY3Rpb24gcmVzZXRUYXNrTGlzdCgpIHtcbiAgICB0YXNrTGlzdCA9IFtdO1xuICAgIHJldHVybiB0YXNrTGlzdDtcbn07XG5cblxuZnVuY3Rpb24gQ3JlYXRlVGFzayh0aXRsZSwgZHVlRGF0ZSkge1xuICAgIGlmIChkdWVEYXRlID09ICcnKSB7XG4gICAgICAgIGR1ZURhdGUgPSAnTm8gZHVlIGRhdGUnO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZHVlRGF0ZSxcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYWRkVGFzayhuYW1lLCBkdWVEYXRlLCBwcm9qZWN0SW5kZXgpIHtcbiAgICBjb25zdCB0YXNrID0gQ3JlYXRlVGFzayhuYW1lLCBkdWVEYXRlKTtcbiAgICB0YXNrTGlzdC5wdXNoKHRhc2spO1xuICAgIHByb2plY3QudXBkYXRlUHJvamVjdExpc3QocHJvamVjdEluZGV4LCB0YXNrTGlzdCk7XG4gICAgY29uc29sZS5sb2codGFza0xpc3QpO1xuICAgIGRvbS5yZW5kZXJUYXNrcygpO1xufTtcblxuZnVuY3Rpb24gc3BsaWNlVGFza0xpc3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0YXNrTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0YXNrTGlzdCk7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVUb2RvKHRhc2tJbmRleCwgbmV3TmFtZSwgbmV3RGF0ZSkge1xuICAgIHRhc2tMaXN0W3Rhc2tJbmRleF0udGl0bGUgPSBuZXdOYW1lO1xuICAgIHRhc2tMaXN0W3Rhc2tJbmRleF0uZHVlRGF0ZSA9IG5ld0RhdGU7XG4gICAgZG9tLnJlbmRlclRhc2tzKCk7XG4gICAgY29uc29sZS5sb2codGFza0xpc3QpO1xufTtcblxuZXhwb3J0IHtcbiAgICB0YXNrTGlzdCxcbiAgICBDcmVhdGVUYXNrLFxuICAgIGFkZFRhc2ssXG4gICAgc3BsaWNlVGFza0xpc3QsXG4gICAgdXBkYXRlVG9kbyxcbiAgICBnZXRUYXNrRnJvbVByb2plY3QsXG4gICAgcmVzZXRUYXNrTGlzdCxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9tb2R1bGVzL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJztcblxucHJvamVjdC5nZXRMb2NhbFN0b3JhZ2UoKTtcbmRvbS5yZW5kZXJQcm9qZWN0cygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==