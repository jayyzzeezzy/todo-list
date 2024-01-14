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

    const taskEdit = document.querySelectorAll('.edit-task-button');
    taskEdit.forEach(btn => btn.addEventListener('click', hideDefaultTodoView));
};

function handleTaskClick(e) {

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
    _task_js__WEBPACK_IMPORTED_MODULE_0__.spliceTaskList(taskIndex);

    // renderTasks will also clear display
    renderTasks();
};

function hideDefaultTodoView(e) {
    const taskIndex = e.target.parentNode.parentNode.dataset.taskIndex;
    // hide default view according to task index
    const _todoLeftSide = document.querySelectorAll('.todo-left-side');
    const _todoRightSide = document.querySelectorAll('.todo-right-side');
    _todoLeftSide[taskIndex].classList.add('edit-view-active');
    _todoRightSide[taskIndex].classList.add('edit-view-active');


    // show edit view accroding to task index
    const _todoLeftEdit = document.querySelectorAll('.todo-left-edit');
    const _todoRightEdit = document.querySelectorAll('.todo-right-edit');
    _todoLeftEdit[taskIndex].classList.remove('default-view-active');
    _todoRightEdit[taskIndex].classList.remove('default-view-active');

    // preload edit value
    const _todoTitle = document.querySelectorAll('.todo-edit-name');
    const _todoDate = document.querySelectorAll('.edit-due-date');
    _todoTitle[taskIndex].value = _task_js__WEBPACK_IMPORTED_MODULE_0__.taskList[taskIndex].title;
    _todoDate[taskIndex].value = _task_js__WEBPACK_IMPORTED_MODULE_0__.taskList[taskIndex].dueDate;
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


const projectList = [];

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
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.renderProjects();
};

function spliceProjectList(index) {
    if (index > -1) {
        projectList.splice(index, 1);
    }
    console.log(projectList);
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
/* harmony export */   spliceTaskList: () => (/* binding */ spliceTaskList),
/* harmony export */   taskList: () => (/* binding */ taskList)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");


const taskList = [];

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0ICogYXMgdGFzayBmcm9tICcuL3Rhc2suanMnO1xuaW1wb3J0ICogYXMgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xuXG4vLyBwb3AgdXAgcHJvamVjdCBmb3JtXG5jb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3RCdG4nKTtcbmNvbnN0IGRpc3BsYXlBZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rpc3BsYXktYWRkLXByb2plY3QnKTtcbmFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzaG93UHJvamVjdEZvcm0oKSk7XG5mdW5jdGlvbiBzaG93UHJvamVjdEZvcm0oKSB7XG4gICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbiAgICBkaXNwbGF5QWRkUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWlucHV0Jyk7XG59O1xuXG4vLyBwcm9qZWN0IGZvcm0gLSBjYW5jZWwgYWN0aW9uXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY2FuY2VsLWJ0bicpO1xucHJvamVjdENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhpZGVQcm9qZWN0Rm9ybSgpKTtcbmZ1bmN0aW9uIGhpZGVQcm9qZWN0Rm9ybSgpIHtcbiAgICBkaXNwbGF5QWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKCdoaWRlLWlucHV0Jyk7XG4gICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbn07XG5cbi8vIHByb2plY3QgZm9ybSAtIGFkZCBhY3Rpb25cbmNvbnN0IHByb2plY3RBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1hZGQtYnRuJyk7XG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYWRkUHJvamVjdEZvcm0oKSk7XG5mdW5jdGlvbiBhZGRQcm9qZWN0Rm9ybSgpIHtcbiAgICBoaWRlUHJvamVjdEZvcm0oKTtcblxuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1pbnB1dCcpO1xuICAgIGlmICghcHJvamVjdElucHV0LnZhbHVlKSB7XG4gICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSBuYW1lJyk7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0SW5wdXQudmFsdWUpO1xuICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xufTtcblxuLy8gRE9NIGxvZ2ljIHRoYXQgYm9ycm93cyBmdW5jdGlvbnMgZnJvbSB0aGUgcHJvamVjdCBtb2R1bGVcbmZ1bmN0aW9uIGNsZWFyUHJvamVjdERpc3BsYXkoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgcHJvamVjdExpc3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbn07XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgIGNsZWFyUHJvamVjdERpc3BsYXkoKTtcblxuICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIHByb2plY3QucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgcHJvamVjdExpc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0LXNlbGVjdFwiIGRhdGEtcHJvamVjdC1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICAgICAgJHtwcm9qZWN0LnRpdGxlfVxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS10cmFzaC1jYW4gZGVsZXRlLXByb2plY3QtYnV0dG9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBsaXN0ZW5Gb3JQcm9qZWN0Q2xpY2soKTtcbn07XG5cbmZ1bmN0aW9uIGxpc3RlbkZvclByb2plY3RDbGljaygpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LXNlbGVjdCcpO1xuICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAvLyBwYXNzIGJ1dHRvbiB0byBldmVudCBoYW5kbGVyIC0+IGhhbmRsZVByb2plY3RDbGlja1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQcm9qZWN0Q2xpY2spO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlUHJvamVjdENsaWNrKGUpIHtcbiAgICAvLyB0aGlzIHJlZmVycyB0byBidXR0b24gZnJvbSBwcm9qZWN0QnV0dG9uc1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RUaXRsZSk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdEluZGV4KTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdC1idXR0b24nKSkge1xuICAgICAgICBkZWxldGVQcm9qZWN0RnJvbURvbShwcm9qZWN0SW5kZXgpO1xuICAgICAgICByZXR1cm5cbiAgICB9O1xuICAgIFxufTtcblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdEZyb21Eb20oaW5kZXgpIHtcbiAgICBwcm9qZWN0LnNwbGljZVByb2plY3RMaXN0KGluZGV4KTtcblxuICAgIC8vIHJlbmRlclByb2plY3RzIGluY2x1ZGVzIHRoZSBjbGVhclByb2plY3REaXNwbGF5IGZ1bmN0aW9uXG4gICAgcmVuZGVyUHJvamVjdHMoKTtcbn07XG5cbi8vIHBvcCB1cCB0YXNrIGZvcm1cbmNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnRuJyk7XG5jb25zdCBkaXNwbGF5QWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5LWFkZC10YXNrJyk7XG5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Rhc2tGb3JtKTtcbmZ1bmN0aW9uIHNob3dUYXNrRm9ybSgpIHtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUtYnRuLWFjdGl2ZScpO1xuICAgIGRpc3BsYXlBZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtaW5wdXQnKTtcbn07XG5cbi8vIHRhc2sgZm9ybSAtIGNhbmNlbCBhY3Rpb25cbmNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW5jZWwtYnRuJyk7XG50YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVRhc2tGb3JtKTtcbmZ1bmN0aW9uIGhpZGVUYXNrRm9ybSgpIHtcbiAgICBkaXNwbGF5QWRkVGFzay5jbGFzc0xpc3QuYWRkKCdoaWRlLWlucHV0Jyk7XG4gICAgYWRkVGFza0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbn07XG5cbi8vIHRhc2sgZm9ybSAtIGFkZCBhY3Rpb25cbmNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1hZGQtYnRuJyk7XG50YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFza0Zvcm0pO1xuZnVuY3Rpb24gYWRkVGFza0Zvcm0oKSB7XG4gICAgaGlkZVRhc2tGb3JtKCk7XG5cbiAgICBjb25zdCB0YXNrSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2staW5wdXQnKTtcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1kdWUtZGF0ZScpO1xuICAgIGlmICghdGFza0lucHV0LnZhbHVlKSB7XG4gICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSBuYW1lJyk7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRhc2suYWRkVGFzayh0YXNrSW5wdXQudmFsdWUsIGRhdGVJbnB1dC52YWx1ZSk7XG4gICAgdGFza0lucHV0LnZhbHVlID0gJyc7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gJyc7XG59O1xuXG4vLyBib3Jyb3cgZnVuY3Rpb25zIGZyb20gdGhlIHRhc2sgbW9kdWxlXG5mdW5jdGlvbiBjbGVhclRhc2tEaXNwbGF5KCkge1xuICAgIGNvbnN0IHRvZG9MaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XG59O1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrcygpIHtcbiAgICBjbGVhclRhc2tEaXNwbGF5KCk7XG5cbiAgICBjb25zdCB0b2RvTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbiAgICB0YXNrLnRhc2tMaXN0LmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICAgIHRvZG9MaXN0Q29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1pdGVtXCIgZGF0YS10YXNrLWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1sZWZ0LXNpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tdGl0bGVcIj4ke3Rhc2sudGl0bGV9PC9QPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbGVmdC1lZGl0IGRlZmF1bHQtdmlldy1hY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0b2RvLWVkaXQtbmFtZVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tcmlnaHQtc2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tZHVlLWRhdGVcIj4ke3Rhc2suZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1wZW4tdG8tc3F1YXJlIGVkaXQtdGFzay1idXR0b25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS10cmFzaC1jYW4gZGVsZXRlLXRhc2stYnV0dG9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tcmlnaHQtZWRpdCBkZWZhdWx0LXZpZXctYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXQtZHVlLWRhdGVcIiB0eXBlPVwiZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29uZmlybS1lZGl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbC1lZGl0XCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBsaXN0ZW5Gb3JUYXNrQ2xpY2soKTtcbn07XG5cbmZ1bmN0aW9uIGxpc3RlbkZvclRhc2tDbGljaygpIHtcbiAgICBjb25zdCB0YXNrQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWl0ZW0nKTtcbiAgICB0YXNrQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgLy8gcGFzcyBidXR0b24gdG8gaGFuZGxlVGFza0NsaWNrXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhc2tDbGljayk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXNrRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS10YXNrLWJ1dHRvbicpO1xuICAgIHRhc2tEZWxldGUuZm9yRWFjaChidG4gPT4ge2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZVRhc2tGcm9tRG9tKX0pO1xuXG4gICAgY29uc3QgdGFza0VkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC10YXNrLWJ1dHRvbicpO1xuICAgIHRhc2tFZGl0LmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVEZWZhdWx0VG9kb1ZpZXcpKTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZVRhc2tDbGljayhlKSB7XG5cbiAgICAvLyB0YXNrIGVkaXQgLSBjYW5jZWwgYWN0aW9uXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsLWVkaXQnKSkge1xuICAgICAgICBoaWRlRWRpdFRvZG9WaWV3KCk7XG4gICAgfTtcbiAgICBcbiAgICAvLyB0YXNrIGVkaXQgLSBjb25maXJtIGFjdGlvblxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0tZWRpdCcpKSB7XG4gICAgICAgIC8vIFRPRE9cbiAgICB9O1xufTtcblxuZnVuY3Rpb24gZGVsZXRlVGFza0Zyb21Eb20oZSkge1xuICAgIGNvbnN0IHRhc2tJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LnRhc2tJbmRleDtcbiAgICB0YXNrLnNwbGljZVRhc2tMaXN0KHRhc2tJbmRleCk7XG5cbiAgICAvLyByZW5kZXJUYXNrcyB3aWxsIGFsc28gY2xlYXIgZGlzcGxheVxuICAgIHJlbmRlclRhc2tzKCk7XG59O1xuXG5mdW5jdGlvbiBoaWRlRGVmYXVsdFRvZG9WaWV3KGUpIHtcbiAgICBjb25zdCB0YXNrSW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrSW5kZXg7XG4gICAgLy8gaGlkZSBkZWZhdWx0IHZpZXcgYWNjb3JkaW5nIHRvIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgX3RvZG9SaWdodFNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1zaWRlJyk7XG4gICAgX3RvZG9MZWZ0U2lkZVt0YXNrSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdmlldy1hY3RpdmUnKTtcbiAgICBfdG9kb1JpZ2h0U2lkZVt0YXNrSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdmlldy1hY3RpdmUnKTtcblxuXG4gICAgLy8gc2hvdyBlZGl0IHZpZXcgYWNjcm9kaW5nIHRvIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1lZGl0Jyk7XG4gICAgY29uc3QgX3RvZG9SaWdodEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1lZGl0Jyk7XG4gICAgX3RvZG9MZWZ0RWRpdFt0YXNrSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHQtdmlldy1hY3RpdmUnKTtcbiAgICBfdG9kb1JpZ2h0RWRpdFt0YXNrSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHQtdmlldy1hY3RpdmUnKTtcblxuICAgIC8vIHByZWxvYWQgZWRpdCB2YWx1ZVxuICAgIGNvbnN0IF90b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1lZGl0LW5hbWUnKTtcbiAgICBjb25zdCBfdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC1kdWUtZGF0ZScpO1xuICAgIF90b2RvVGl0bGVbdGFza0luZGV4XS52YWx1ZSA9IHRhc2sudGFza0xpc3RbdGFza0luZGV4XS50aXRsZTtcbiAgICBfdG9kb0RhdGVbdGFza0luZGV4XS52YWx1ZSA9IHRhc2sudGFza0xpc3RbdGFza0luZGV4XS5kdWVEYXRlO1xufTtcblxuZnVuY3Rpb24gaGlkZUVkaXRUb2RvVmlldygpIHtcbiAgICAvLyBzaG93IGRlZmF1bHQgdmlld1xuICAgIGNvbnN0IHRvZG9MZWZ0U2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxlZnQtc2lkZScpO1xuICAgIGNvbnN0IHRvZG9SaWdodFNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1yaWdodC1zaWRlJyk7XG4gICAgdG9kb0xlZnRTaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtdmlldy1hY3RpdmUnKTtcbiAgICB0b2RvUmlnaHRTaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtdmlldy1hY3RpdmUnKTtcblxuICAgIC8vIGhpZGUgZWRpdCB2aWV3XG4gICAgY29uc3QgdG9kb0xlZnRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGVmdC1lZGl0Jyk7XG4gICAgY29uc3QgdG9kb1JpZ2h0RWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXJpZ2h0LWVkaXQnKTtcbiAgICB0b2RvTGVmdEVkaXQuY2xhc3NMaXN0LmFkZCgnZGVmYXVsdC12aWV3LWFjdGl2ZScpO1xuICAgIHRvZG9SaWdodEVkaXQuY2xhc3NMaXN0LmFkZCgnZGVmYXVsdC12aWV3LWFjdGl2ZScpO1xufTtcblxuZXhwb3J0IHtcbiAgICBjbGVhclByb2plY3REaXNwbGF5LFxuICAgIHJlbmRlclByb2plY3RzLFxuICAgIHJlbmRlclRhc2tzLFxufTsiLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xuXG4vLyBwcm9qZWN0IGZ1bmN0aW9uIGZhY3RvcnlcbmZ1bmN0aW9uIENyZWF0ZVByb2plY3QodGl0bGUpIHtcbiAgICBjb25zdCB0YXNrID0gW107XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHRhc2tcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYWRkUHJvamVjdCh0aXRsZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBDcmVhdGVQcm9qZWN0KHRpdGxlKTtcbiAgICBwcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbn07XG5cbmZ1bmN0aW9uIHNwbGljZVByb2plY3RMaXN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xufTtcblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0TGlzdCxcbiAgICBDcmVhdGVQcm9qZWN0LFxuICAgIGFkZFByb2plY3QsXG4gICAgc3BsaWNlUHJvamVjdExpc3QsXG59OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5cbmNvbnN0IHRhc2tMaXN0ID0gW107XG5cbmZ1bmN0aW9uIENyZWF0ZVRhc2sodGl0bGUsIGR1ZURhdGUpIHtcbiAgICBpZiAoZHVlRGF0ZSA9PSAnJykge1xuICAgICAgICBkdWVEYXRlID0gJ05vIGR1ZSBkYXRlJztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGR1ZURhdGUsXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGFkZFRhc2sobmFtZSwgZHVlRGF0ZSkge1xuICAgIGNvbnN0IHRhc2sgPSBDcmVhdGVUYXNrKG5hbWUsIGR1ZURhdGUpO1xuICAgIHRhc2tMaXN0LnB1c2godGFzayk7XG4gICAgY29uc29sZS5sb2codGFza0xpc3QpO1xuICAgIGRvbS5yZW5kZXJUYXNrcygpO1xufTtcblxuZnVuY3Rpb24gc3BsaWNlVGFza0xpc3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0YXNrTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0YXNrTGlzdCk7XG59O1xuXG5leHBvcnQge1xuICAgIHRhc2tMaXN0LFxuICAgIENyZWF0ZVRhc2ssXG4gICAgYWRkVGFzayxcbiAgICBzcGxpY2VUYXNrTGlzdCxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9tb2R1bGVzL2RvbS5qcyc7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9