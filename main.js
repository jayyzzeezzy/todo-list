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
    // TODO
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCAqIGFzIHRhc2sgZnJvbSAnLi90YXNrLmpzJztcbmltcG9ydCAqIGFzIHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcblxuLy8gcG9wIHVwIHByb2plY3QgZm9ybVxuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0QnRuJyk7XG5jb25zdCBkaXNwbGF5QWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5LWFkZC1wcm9qZWN0Jyk7XG5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2hvd1Byb2plY3RGb3JtKCkpO1xuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCkge1xuICAgIGFkZFByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZS1idG4tYWN0aXZlJyk7XG4gICAgZGlzcGxheUFkZFByb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1pbnB1dCcpO1xufTtcblxuLy8gcHJvamVjdCBmb3JtIC0gY2FuY2VsIGFjdGlvblxuY29uc3QgcHJvamVjdENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNhbmNlbC1idG4nKTtcbnByb2plY3RDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoaWRlUHJvamVjdEZvcm0oKSk7XG5mdW5jdGlvbiBoaWRlUHJvamVjdEZvcm0oKSB7XG4gICAgZGlzcGxheUFkZFByb2plY3QuY2xhc3NMaXN0LmFkZCgnaGlkZS1pbnB1dCcpO1xuICAgIGFkZFByb2plY3RCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1idG4tYWN0aXZlJyk7XG59O1xuXG4vLyBwcm9qZWN0IGZvcm0gLSBhZGQgYWN0aW9uXG5jb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtYWRkLWJ0bicpO1xucHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGFkZFByb2plY3RGb3JtKCkpO1xuZnVuY3Rpb24gYWRkUHJvamVjdEZvcm0oKSB7XG4gICAgaGlkZVByb2plY3RGb3JtKCk7XG5cbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtaW5wdXQnKTtcbiAgICBpZiAoIXByb2plY3RJbnB1dC52YWx1ZSkge1xuICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIGEgbmFtZScpO1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBwcm9qZWN0LmFkZFByb2plY3QocHJvamVjdElucHV0LnZhbHVlKTtcbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcbn07XG5cbi8vIERPTSBsb2dpYyB0aGF0IGJvcnJvd3MgZnVuY3Rpb25zIGZyb20gdGhlIHByb2plY3QgbW9kdWxlXG5mdW5jdGlvbiBjbGVhclByb2plY3REaXNwbGF5KCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIHByb2plY3RMaXN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XG59O1xuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0cygpIHtcbiAgICBjbGVhclByb2plY3REaXNwbGF5KCk7XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0LnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIHByb2plY3RMaXN0Q29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1zZWxlY3RcIiBkYXRhLXByb2plY3QtaW5kZXg9XCIke2luZGV4fVwiPlxuICAgICAgICAgICAgICAgICR7cHJvamVjdC50aXRsZX1cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtdHJhc2gtY2FuIGRlbGV0ZS1wcm9qZWN0LWJ1dHRvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgbGlzdGVuRm9yUHJvamVjdENsaWNrKCk7XG59O1xuXG5mdW5jdGlvbiBsaXN0ZW5Gb3JQcm9qZWN0Q2xpY2soKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1zZWxlY3QnKTtcbiAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgLy8gcGFzcyBidXR0b24gdG8gZXZlbnQgaGFuZGxlciAtPiBoYW5kbGVQcm9qZWN0Q2xpY2tcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUHJvamVjdENsaWNrKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZVByb2plY3RDbGljayhlKSB7XG4gICAgLy8gdGhpcyByZWZlcnMgdG8gYnV0dG9uIGZyb20gcHJvamVjdEJ1dHRvbnNcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSB0aGlzLnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0VGl0bGUpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleCk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QtYnV0dG9uJykpIHtcbiAgICAgICAgZGVsZXRlUHJvamVjdEZyb21Eb20ocHJvamVjdEluZGV4KTtcbiAgICAgICAgcmV0dXJuXG4gICAgfTtcbiAgICBcbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RGcm9tRG9tKGluZGV4KSB7XG4gICAgcHJvamVjdC5zcGxpY2VQcm9qZWN0TGlzdChpbmRleCk7XG5cbiAgICAvLyByZW5kZXJQcm9qZWN0cyBpbmNsdWRlcyB0aGUgY2xlYXJQcm9qZWN0RGlzcGxheSBmdW5jdGlvblxuICAgIHJlbmRlclByb2plY3RzKCk7XG59O1xuXG4vLyBwb3AgdXAgdGFzayBmb3JtXG5jb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ0bicpO1xuY29uc3QgZGlzcGxheUFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzcGxheS1hZGQtdGFzaycpO1xuYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dUYXNrRm9ybSk7XG5mdW5jdGlvbiBzaG93VGFza0Zvcm0oKSB7XG4gICAgYWRkVGFza0J0bi5jbGFzc0xpc3QuYWRkKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbiAgICBkaXNwbGF5QWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWlucHV0Jyk7XG59O1xuXG4vLyB0YXNrIGZvcm0gLSBjYW5jZWwgYWN0aW9uXG5jb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stY2FuY2VsLWJ0bicpO1xudGFza0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVUYXNrRm9ybSk7XG5mdW5jdGlvbiBoaWRlVGFza0Zvcm0oKSB7XG4gICAgZGlzcGxheUFkZFRhc2suY2xhc3NMaXN0LmFkZCgnaGlkZS1pbnB1dCcpO1xuICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1idG4tYWN0aXZlJyk7XG59O1xuXG4vLyB0YXNrIGZvcm0gLSBhZGQgYWN0aW9uXG5jb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stYWRkLWJ0bicpO1xudGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFRhc2tGb3JtKTtcbmZ1bmN0aW9uIGFkZFRhc2tGb3JtKCkge1xuICAgIGhpZGVUYXNrRm9ybSgpO1xuXG4gICAgY29uc3QgdGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWlucHV0Jyk7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZHVlLWRhdGUnKTtcbiAgICBpZiAoIXRhc2tJbnB1dC52YWx1ZSkge1xuICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIGEgbmFtZScpO1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0YXNrLmFkZFRhc2sodGFza0lucHV0LnZhbHVlLCBkYXRlSW5wdXQudmFsdWUpO1xuICAgIHRhc2tJbnB1dC52YWx1ZSA9ICcnO1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9ICcnO1xufTtcblxuLy8gYm9ycm93IGZ1bmN0aW9ucyBmcm9tIHRoZSB0YXNrIG1vZHVsZVxuZnVuY3Rpb24gY2xlYXJUYXNrRGlzcGxheSgpIHtcbiAgICBjb25zdCB0b2RvTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbiAgICB0b2RvTGlzdENvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xufTtcblxuZnVuY3Rpb24gcmVuZGVyVGFza3MoKSB7XG4gICAgY2xlYXJUYXNrRGlzcGxheSgpO1xuXG4gICAgY29uc3QgdG9kb0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG4gICAgdGFzay50YXNrTGlzdC5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICB0b2RvTGlzdENvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtdGFzay1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbGVmdC1zaWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+JHt0YXNrLnRpdGxlfTwvUD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWxlZnQtZWRpdCBkZWZhdWx0LXZpZXctYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidG9kby1lZGl0LW5hbWVcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXJpZ2h0LXNpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLWR1ZS1kYXRlXCI+JHt0YXNrLmR1ZURhdGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtcGVuLXRvLXNxdWFyZSBlZGl0LXRhc2stYnV0dG9uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtdHJhc2gtY2FuIGRlbGV0ZS10YXNrLWJ1dHRvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXJpZ2h0LWVkaXQgZGVmYXVsdC12aWV3LWFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0LWR1ZS1kYXRlXCIgdHlwZT1cImRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXQtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbmZpcm0tZWRpdFwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWwtZWRpdFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgaGFuZGxlVG9kb0J0bkNsaWNrcygpO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlVG9kb0J0bkNsaWNrcygpIHtcbiAgICAvLyBtYWtlIGV2ZW50IGxpc3RlbmVyIGZvciBlYWNoIGZ1bmN0aW9uYWxpdHlcbiAgICBjb25zdCB0YXNrRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS10YXNrLWJ1dHRvbicpO1xuICAgIHRhc2tEZWxldGUuZm9yRWFjaChidG4gPT4ge2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZVRhc2tGcm9tRG9tKX0pO1xuXG4gICAgY29uc3QgdGFza0VkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC10YXNrLWJ1dHRvbicpO1xuICAgIHRhc2tFZGl0LmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVEZWZhdWx0VG9kb1ZpZXcpKTtcblxuICAgIGNvbnN0IHRhc2tDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FuY2VsLWVkaXQnKTtcbiAgICB0YXNrQ2FuY2VsLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbmNlbEVkaXRUb2RvKSk7XG5cbiAgICBjb25zdCB0YXNrQ29uZmlybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtLWVkaXQnKTtcbiAgICAvLyBUT0RPXG59O1xuXG5mdW5jdGlvbiBkZWxldGVUYXNrRnJvbURvbShlKSB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrSW5kZXg7XG4gICAgdGFzay5zcGxpY2VUYXNrTGlzdCh0YXJnZXRJbmRleCk7XG5cbiAgICAvLyByZW5kZXJUYXNrcyB3aWxsIGFsc28gY2xlYXIgZGlzcGxheVxuICAgIHJlbmRlclRhc2tzKCk7XG59O1xuXG5mdW5jdGlvbiBoaWRlRGVmYXVsdFRvZG9WaWV3KGUpIHtcbiAgICBjb25zdCB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LnRhc2tJbmRleDtcbiAgICAvLyBoaWRlIGRlZmF1bHQgdmlldyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgX3RvZG9SaWdodFNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1zaWRlJyk7XG4gICAgX3RvZG9MZWZ0U2lkZVt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZWRpdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRTaWRlW3RhcmdldEluZGV4XS5jbGFzc0xpc3QuYWRkKCdlZGl0LXZpZXctYWN0aXZlJyk7XG5cblxuICAgIC8vIHNob3cgZWRpdCB2aWV3IGFjY3JvZGluZyB0byB0aGUgc2VsZWN0ZWQgdGFzayBpbmRleFxuICAgIGNvbnN0IF90b2RvTGVmdEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1sZWZ0LWVkaXQnKTtcbiAgICBjb25zdCBfdG9kb1JpZ2h0RWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLXJpZ2h0LWVkaXQnKTtcbiAgICBfdG9kb0xlZnRFZGl0W3RhcmdldEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG4gICAgX3RvZG9SaWdodEVkaXRbdGFyZ2V0SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHQtdmlldy1hY3RpdmUnKTtcblxuICAgIC8vIHByZWxvYWQgZWRpdCB2YWx1ZVxuICAgIGNvbnN0IF90b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1lZGl0LW5hbWUnKTtcbiAgICBjb25zdCBfdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC1kdWUtZGF0ZScpO1xuICAgIF90b2RvVGl0bGVbdGFyZ2V0SW5kZXhdLnZhbHVlID0gdGFzay50YXNrTGlzdFt0YXJnZXRJbmRleF0udGl0bGU7XG4gICAgX3RvZG9EYXRlW3RhcmdldEluZGV4XS52YWx1ZSA9IHRhc2sudGFza0xpc3RbdGFyZ2V0SW5kZXhdLmR1ZURhdGU7XG59O1xuXG5mdW5jdGlvbiBjYW5jZWxFZGl0VG9kbyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LnRhc2tJbmRleDtcbiAgICAvLyBzaG93IGRlZmF1bHQgdmlldyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1zaWRlJyk7XG4gICAgY29uc3QgX3RvZG9SaWdodFNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1zaWRlJyk7XG4gICAgX3RvZG9MZWZ0U2lkZVt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRTaWRlW3RhcmdldEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXZpZXctYWN0aXZlJyk7XG5cbiAgICAvLyBoaWRlIGVkaXQgdmlldyBhY2NvcmRpbmcgdG8gdGhlIHNlbGVjdGVkIHRhc2sgaW5kZXhcbiAgICBjb25zdCBfdG9kb0xlZnRFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGVmdC1lZGl0Jyk7XG4gICAgY29uc3QgX3RvZG9SaWdodEVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1yaWdodC1lZGl0Jyk7XG4gICAgX3RvZG9MZWZ0RWRpdFt0YXJnZXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZGVmYXVsdC12aWV3LWFjdGl2ZScpO1xuICAgIF90b2RvUmlnaHRFZGl0W3RhcmdldEluZGV4XS5jbGFzc0xpc3QuYWRkKCdkZWZhdWx0LXZpZXctYWN0aXZlJyk7XG59O1xuXG5leHBvcnQge1xuICAgIGNsZWFyUHJvamVjdERpc3BsYXksXG4gICAgcmVuZGVyUHJvamVjdHMsXG4gICAgcmVuZGVyVGFza3MsXG59OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gW107XG5cbi8vIHByb2plY3QgZnVuY3Rpb24gZmFjdG9yeVxuZnVuY3Rpb24gQ3JlYXRlUHJvamVjdCh0aXRsZSkge1xuICAgIGNvbnN0IHRhc2sgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgdGFza1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IENyZWF0ZVByb2plY3QodGl0bGUpO1xuICAgIHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xufTtcblxuZnVuY3Rpb24gc3BsaWNlUHJvamVjdExpc3QoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBwcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG59O1xuXG5leHBvcnQge1xuICAgIHByb2plY3RMaXN0LFxuICAgIENyZWF0ZVByb2plY3QsXG4gICAgYWRkUHJvamVjdCxcbiAgICBzcGxpY2VQcm9qZWN0TGlzdCxcbn07IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcblxuY29uc3QgdGFza0xpc3QgPSBbXTtcblxuZnVuY3Rpb24gQ3JlYXRlVGFzayh0aXRsZSwgZHVlRGF0ZSkge1xuICAgIGlmIChkdWVEYXRlID09ICcnKSB7XG4gICAgICAgIGR1ZURhdGUgPSAnTm8gZHVlIGRhdGUnO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZHVlRGF0ZSxcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYWRkVGFzayhuYW1lLCBkdWVEYXRlKSB7XG4gICAgY29uc3QgdGFzayA9IENyZWF0ZVRhc2sobmFtZSwgZHVlRGF0ZSk7XG4gICAgdGFza0xpc3QucHVzaCh0YXNrKTtcbiAgICBjb25zb2xlLmxvZyh0YXNrTGlzdCk7XG4gICAgZG9tLnJlbmRlclRhc2tzKCk7XG59O1xuXG5mdW5jdGlvbiBzcGxpY2VUYXNrTGlzdChpbmRleCkge1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRhc2tMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRhc2tMaXN0KTtcbn07XG5cbmV4cG9ydCB7XG4gICAgdGFza0xpc3QsXG4gICAgQ3JlYXRlVGFzayxcbiAgICBhZGRUYXNrLFxuICAgIHNwbGljZVRhc2tMaXN0LFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL21vZHVsZXMvZG9tLmpzJzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=