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
};

function handleTaskClick(e) {
    const taskIndex = this.getAttribute('data-task-index');
    // select button's children's children's node -> .todo-title
    const taskTitle = this.children[0].children[1].textContent;
    console.log(taskIndex);
    console.log(taskTitle);

    if (e.target.classList.contains('delete-task-button')) {
        deleteTaskFromDom(taskIndex);
        return
    }

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

function deleteTaskFromDom(index) {
    _task_js__WEBPACK_IMPORTED_MODULE_0__.spliceTaskList(index);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgKiBhcyB0YXNrIGZyb20gJy4vdGFzay5qcyc7XG5pbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbi8vIHBvcCB1cCBwcm9qZWN0IGZvcm1cbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdEJ0bicpO1xuY29uc3QgZGlzcGxheUFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzcGxheS1hZGQtcHJvamVjdCcpO1xuYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNob3dQcm9qZWN0Rm9ybSgpKTtcbmZ1bmN0aW9uIHNob3dQcm9qZWN0Rm9ybSgpIHtcbiAgICBhZGRQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUtYnRuLWFjdGl2ZScpO1xuICAgIGRpc3BsYXlBZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtaW5wdXQnKTtcbn07XG5cbi8vIHByb2plY3QgZm9ybSAtIGNhbmNlbCBhY3Rpb25cbmNvbnN0IHByb2plY3RDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jYW5jZWwtYnRuJyk7XG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZVByb2plY3RGb3JtKCkpO1xuZnVuY3Rpb24gaGlkZVByb2plY3RGb3JtKCkge1xuICAgIGRpc3BsYXlBZGRQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICBhZGRQcm9qZWN0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtYnRuLWFjdGl2ZScpO1xufTtcblxuLy8gcHJvamVjdCBmb3JtIC0gYWRkIGFjdGlvblxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWFkZC1idG4nKTtcbnByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBhZGRQcm9qZWN0Rm9ybSgpKTtcbmZ1bmN0aW9uIGFkZFByb2plY3RGb3JtKCkge1xuICAgIGhpZGVQcm9qZWN0Rm9ybSgpO1xuXG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWlucHV0Jyk7XG4gICAgaWYgKCFwcm9qZWN0SW5wdXQudmFsdWUpIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIG5hbWUnKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgcHJvamVjdElucHV0LnZhbHVlID0gJyc7XG59O1xuXG4vLyBET00gbG9naWMgdGhhdCBib3Jyb3dzIGZ1bmN0aW9ucyBmcm9tIHRoZSBwcm9qZWN0IG1vZHVsZVxuZnVuY3Rpb24gY2xlYXJQcm9qZWN0RGlzcGxheSgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdENvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xufTtcblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgY2xlYXJQcm9qZWN0RGlzcGxheSgpO1xuXG4gICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgcHJvamVjdC5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgICBwcm9qZWN0TGlzdENvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3Qtc2VsZWN0XCIgZGF0YS1wcm9qZWN0LWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgICAgICAke3Byb2plY3QudGl0bGV9XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXRyYXNoLWNhbiBkZWxldGUtcHJvamVjdC1idXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGxpc3RlbkZvclByb2plY3RDbGljaygpO1xufTtcblxuZnVuY3Rpb24gbGlzdGVuRm9yUHJvamVjdENsaWNrKCkge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3Qtc2VsZWN0Jyk7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIC8vIHBhc3MgYnV0dG9uIHRvIGV2ZW50IGhhbmRsZXIgLT4gaGFuZGxlUHJvamVjdENsaWNrXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVByb2plY3RDbGljayk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVQcm9qZWN0Q2xpY2soZSkge1xuICAgIC8vIHRoaXMgcmVmZXJzIHRvIGJ1dHRvbiBmcm9tIHByb2plY3RCdXR0b25zXG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gdGhpcy50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdFRpdGxlKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0SW5kZXgpO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpKSB7XG4gICAgICAgIGRlbGV0ZVByb2plY3RGcm9tRG9tKHByb2plY3RJbmRleCk7XG4gICAgICAgIHJldHVyblxuICAgIH07XG4gICAgXG59O1xuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0RnJvbURvbShpbmRleCkge1xuICAgIHByb2plY3Quc3BsaWNlUHJvamVjdExpc3QoaW5kZXgpO1xuXG4gICAgLy8gcmVuZGVyUHJvamVjdHMgaW5jbHVkZXMgdGhlIGNsZWFyUHJvamVjdERpc3BsYXkgZnVuY3Rpb25cbiAgICByZW5kZXJQcm9qZWN0cygpO1xufTtcblxuLy8gcG9wIHVwIHRhc2sgZm9ybVxuY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idG4nKTtcbmNvbnN0IGRpc3BsYXlBZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rpc3BsYXktYWRkLXRhc2snKTtcbmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VGFza0Zvcm0pO1xuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCkge1xuICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZS1idG4tYWN0aXZlJyk7XG4gICAgZGlzcGxheUFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1pbnB1dCcpO1xufTtcblxuLy8gdGFzayBmb3JtIC0gY2FuY2VsIGFjdGlvblxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbmNlbC1idG4nKTtcbnRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlVGFza0Zvcm0pO1xuZnVuY3Rpb24gaGlkZVRhc2tGb3JtKCkge1xuICAgIGRpc3BsYXlBZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtYnRuLWFjdGl2ZScpO1xufTtcblxuLy8gdGFzayBmb3JtIC0gYWRkIGFjdGlvblxuY29uc3QgdGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWFkZC1idG4nKTtcbnRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRUYXNrRm9ybSk7XG5mdW5jdGlvbiBhZGRUYXNrRm9ybSgpIHtcbiAgICBoaWRlVGFza0Zvcm0oKTtcblxuICAgIGNvbnN0IHRhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1pbnB1dCcpO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWR1ZS1kYXRlJyk7XG4gICAgaWYgKCF0YXNrSW5wdXQudmFsdWUpIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIG5hbWUnKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGFzay5hZGRUYXNrKHRhc2tJbnB1dC52YWx1ZSwgZGF0ZUlucHV0LnZhbHVlKTtcbiAgICB0YXNrSW5wdXQudmFsdWUgPSAnJztcbiAgICBkYXRlSW5wdXQudmFsdWUgPSAnJztcbn07XG5cbi8vIGJvcnJvdyBmdW5jdGlvbnMgZnJvbSB0aGUgdGFzayBtb2R1bGVcbmZ1bmN0aW9uIGNsZWFyVGFza0Rpc3BsYXkoKSB7XG4gICAgY29uc3QgdG9kb0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG4gICAgdG9kb0xpc3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbn07XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKCkge1xuICAgIGNsZWFyVGFza0Rpc3BsYXkoKTtcblxuICAgIGNvbnN0IHRvZG9MaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuICAgIHRhc2sudGFza0xpc3QuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgdG9kb0xpc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBkYXRhLXRhc2staW5kZXg9XCIke2luZGV4fVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWxlZnQtc2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jaXJjbGVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidG9kby10aXRsZVwiPiR7dGFzay50aXRsZX08L1A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1sZWZ0LWVkaXQgZGVmYXVsdC12aWV3LWFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRvZG8tZWRpdC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1zaWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidG9kby1kdWUtZGF0ZVwiPiR7dGFzay5kdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXBlbi10by1zcXVhcmUgZWRpdC10YXNrLWJ1dHRvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXRyYXNoLWNhbiBkZWxldGUtdGFzay1idXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1yaWdodC1lZGl0IGRlZmF1bHQtdmlldy1hY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdC1kdWUtZGF0ZVwiIHR5cGU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0LWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjb25maXJtLWVkaXRcIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLWVkaXRcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGxpc3RlbkZvclRhc2tDbGljaygpO1xufTtcblxuZnVuY3Rpb24gbGlzdGVuRm9yVGFza0NsaWNrKCkge1xuICAgIGNvbnN0IHRhc2tCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xuICAgIHRhc2tCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAvLyBwYXNzIGJ1dHRvbiB0byBoYW5kbGVUYXNrQ2xpY2tcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGFza0NsaWNrKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZVRhc2tDbGljayhlKSB7XG4gICAgY29uc3QgdGFza0luZGV4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpO1xuICAgIC8vIHNlbGVjdCBidXR0b24ncyBjaGlsZHJlbidzIGNoaWxkcmVuJ3Mgbm9kZSAtPiAudG9kby10aXRsZVxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IHRoaXMuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0udGV4dENvbnRlbnQ7XG4gICAgY29uc29sZS5sb2codGFza0luZGV4KTtcbiAgICBjb25zb2xlLmxvZyh0YXNrVGl0bGUpO1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRhc2stYnV0dG9uJykpIHtcbiAgICAgICAgZGVsZXRlVGFza0Zyb21Eb20odGFza0luZGV4KTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gaGlkZSBkZWZhdWx0IHZpZXdcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2stYnV0dG9uJykpIHtcbiAgICAgICAgaGlkZURlZmF1bHRUb2RvVmlldygpO1xuICAgICAgICByZXR1cm5cbiAgICB9O1xuXG4gICAgLy8gdGFzayBlZGl0IC0gY2FuY2VsIGFjdGlvblxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0JykpIHtcbiAgICAgICAgaGlkZUVkaXRUb2RvVmlldygpO1xuICAgIH07XG4gICAgXG4gICAgLy8gdGFzayBlZGl0IC0gY29uZmlybSBhY3Rpb25cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25maXJtLWVkaXQnKSkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2tGcm9tRG9tKGluZGV4KSB7XG4gICAgdGFzay5zcGxpY2VUYXNrTGlzdChpbmRleCk7XG5cbiAgICAvLyByZW5kZXJUYXNrcyB3aWxsIGFsc28gY2xlYXIgZGlzcGxheVxuICAgIHJlbmRlclRhc2tzKCk7XG59O1xuXG5mdW5jdGlvbiBoaWRlRGVmYXVsdFRvZG9WaWV3KCkge1xuICAgIC8vIGhpZGUgZGVmYXVsdCB2aWV3XG4gICAgY29uc3QgdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgdG9kb1JpZ2h0U2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXJpZ2h0LXNpZGUnKTtcbiAgICB0b2RvTGVmdFNpZGUuY2xhc3NMaXN0LmFkZCgnZWRpdC12aWV3LWFjdGl2ZScpO1xuICAgIHRvZG9SaWdodFNpZGUuY2xhc3NMaXN0LmFkZCgnZWRpdC12aWV3LWFjdGl2ZScpO1xuXG4gICAgLy8gc2hvdyBlZGl0IHZpZXdcbiAgICBjb25zdCB0b2RvTGVmdEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1sZWZ0LWVkaXQnKTtcbiAgICBjb25zdCB0b2RvUmlnaHRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tcmlnaHQtZWRpdCcpO1xuICAgIHRvZG9MZWZ0RWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG4gICAgdG9kb1JpZ2h0RWRpdC5jbGFzc0xpc3QucmVtb3ZlKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG59O1xuXG5mdW5jdGlvbiBoaWRlRWRpdFRvZG9WaWV3KCkge1xuICAgIC8vIHNob3cgZGVmYXVsdCB2aWV3XG4gICAgY29uc3QgdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgdG9kb1JpZ2h0U2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXJpZ2h0LXNpZGUnKTtcbiAgICB0b2RvTGVmdFNpZGUuY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC12aWV3LWFjdGl2ZScpO1xuICAgIHRvZG9SaWdodFNpZGUuY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC12aWV3LWFjdGl2ZScpO1xuXG4gICAgLy8gaGlkZSBlZGl0IHZpZXdcbiAgICBjb25zdCB0b2RvTGVmdEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1sZWZ0LWVkaXQnKTtcbiAgICBjb25zdCB0b2RvUmlnaHRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tcmlnaHQtZWRpdCcpO1xuICAgIHRvZG9MZWZ0RWRpdC5jbGFzc0xpc3QuYWRkKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG4gICAgdG9kb1JpZ2h0RWRpdC5jbGFzc0xpc3QuYWRkKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG59O1xuXG5leHBvcnQge1xuICAgIGNsZWFyUHJvamVjdERpc3BsYXksXG4gICAgcmVuZGVyUHJvamVjdHMsXG4gICAgcmVuZGVyVGFza3MsXG59OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gW107XG5cbi8vIHByb2plY3QgZnVuY3Rpb24gZmFjdG9yeVxuZnVuY3Rpb24gQ3JlYXRlUHJvamVjdCh0aXRsZSkge1xuICAgIGNvbnN0IHRhc2sgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgdGFza1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IENyZWF0ZVByb2plY3QodGl0bGUpO1xuICAgIHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xufTtcblxuZnVuY3Rpb24gc3BsaWNlUHJvamVjdExpc3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBwcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG59O1xuXG5leHBvcnQge1xuICAgIHByb2plY3RMaXN0LFxuICAgIENyZWF0ZVByb2plY3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBzcGxpY2VQcm9qZWN0TGlzdCxcbn07IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcblxuY29uc3QgdGFza0xpc3QgPSBbXTtcblxuZnVuY3Rpb24gQ3JlYXRlVGFzayh0aXRsZSwgZHVlRGF0ZSkge1xuICAgIGlmIChkdWVEYXRlID09ICcnKSB7XG4gICAgICAgIGR1ZURhdGUgPSAnTm8gZHVlIGRhdGUnO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZHVlRGF0ZSxcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYWRkVGFzayhuYW1lLCBkdWVEYXRlKSB7XG4gICAgY29uc3QgdGFzayA9IENyZWF0ZVRhc2sobmFtZSwgZHVlRGF0ZSk7XG4gICAgdGFza0xpc3QucHVzaCh0YXNrKTtcbiAgICBjb25zb2xlLmxvZyh0YXNrTGlzdCk7XG4gICAgZG9tLnJlbmRlclRhc2tzKCk7XG59O1xuXG5mdW5jdGlvbiBzcGxpY2VUYXNrTGlzdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRhc2tMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRhc2tMaXN0KTtcbn07XG5cbmV4cG9ydCB7XG4gICAgdGFza0xpc3QsXG4gICAgQ3JlYXRlVGFzayxcbiAgICBhZGRUYXNrLFxuICAgIHNwbGljZVRhc2tMaXN0LFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==