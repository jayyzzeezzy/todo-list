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
/* harmony export */   domController: () => (/* binding */ domController)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/modules/project.js");


// DOM Manipulation
const domController = (function() {
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
        _project_js__WEBPACK_IMPORTED_MODULE_0__.addProject(projectInput.value);
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

    // display each project
    function renderProjects() {
        const projectListContainer = document.querySelector('#project-list');
        projectListContainer.textContent = '';
        _project_js__WEBPACK_IMPORTED_MODULE_0__.projectList.forEach((project, index) => {
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
        _project_js__WEBPACK_IMPORTED_MODULE_0__.spliceProjectList(node.textContent);
        console.log(_project_js__WEBPACK_IMPORTED_MODULE_0__.projectList);
    };
})();

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProject: () => (/* binding */ addProject),
/* harmony export */   projectList: () => (/* binding */ projectList),
/* harmony export */   spliceProjectList: () => (/* binding */ spliceProjectList)
/* harmony export */ });
const projectList = [];

function addProject(project) {
    projectList.push(project);
};

function spliceProjectList(content) {
    projectList.splice(`${projectList.indexOf(content)}`, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsbURBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0RBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFROztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBeUI7QUFDakMsb0JBQW9CLG9EQUFtQjtBQUN2QztBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLDZCQUE2QjtBQUN2RDs7Ozs7Ozs7VUNSQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbi8vIERPTSBNYW5pcHVsYXRpb25cbmV4cG9ydCBjb25zdCBkb21Db250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdEJ0bicpO1xuICAgIGNvbnN0IGFkZFByb2plY3RGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5LWFkZC1wcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNhbmNlbC1idG4nKTtcbiAgICBjb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtYWRkLWJ0bicpO1xuXG4gICAgLy8gc2hvdyBhZGQgcHJvamVjdCBmaWVsZFxuICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVBZGRQcm9qZWN0KCkpO1xuICAgIGZ1bmN0aW9uIGhhbmRsZUFkZFByb2plY3QoKSB7XG4gICAgICAgIC8vIGhpZGUgYnV0dG9uXG4gICAgICAgIGFkZFByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZS1idG4tYWN0aXZlJyk7XG4gICAgICAgIC8vIHNob3cgaW5wdXQgZmllbGRcbiAgICAgICAgYWRkUHJvamVjdEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtaW5wdXQnKTtcbiAgICB9O1xuXG4gICAgLy8gY2FuY2VsIGFkZCBwcm9qZWN0IGFjdGlvblxuICAgIHByb2plY3RDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjYW5jZWxBZGRQcm9qZWN0KCkpO1xuICAgIGZ1bmN0aW9uIGNhbmNlbEFkZFByb2plY3QoKSB7XG4gICAgICAgIC8vIGhpZGUgaW5wdXRcbiAgICAgICAgYWRkUHJvamVjdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICAgICAgLy8gc2hvdyBidXR0b25cbiAgICAgICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIHRvIHByb2plY3QgbGlzdFxuICAgIHByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVQcm9qZWN0QWRkKCkpO1xuICAgIGZ1bmN0aW9uIGhhbmRsZVByb2plY3RBZGQoKSB7XG4gICAgICAgIC8vIGhpZGUgaW5wdXQgZmllbGRcbiAgICAgICAgYWRkUHJvamVjdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICAgICAgLy8gc2hvdyBidXR0b25cbiAgICAgICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcblxuICAgICAgICAvLyBzZW5kIGlucHV0IHZhbHVlIHRvIHByb2plY3QgbGlzdFxuICAgICAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtaW5wdXQnKTtcbiAgICAgICAgcHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgICAgIC8vIHJlc2V0IGlucHV0XG4gICAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xuICAgICAgICBtYWtlUHJvamVjdEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idG4nKTtcbiAgICBjb25zdCBhZGRUYXNrRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzcGxheS1hZGQtdGFzaycpO1xuICAgIGNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW5jZWwtYnRuJyk7XG5cbiAgICAvLyBzaG93IGFkZCB0YXNrIGZpZWxkXG4gICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhhbmRsZUFkZFRhc2soKSk7XG4gICAgZnVuY3Rpb24gaGFuZGxlQWRkVGFzaygpIHtcbiAgICAgICAgLy8gaGlkZSBidXR0b25cbiAgICAgICAgYWRkVGFza0J0bi5jbGFzc0xpc3QuYWRkKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbiAgICAgICAgLy8gc2hvdyBpbnB1dCBmaWVsZFxuICAgICAgICBhZGRUYXNrRmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1pbnB1dCcpO1xuICAgIH07XG5cbiAgICAvLyBjYW5jZWwgYWRkIHRhc2sgYWN0aW9uXG4gICAgdGFza0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNhbmNlbEFkZFRhc2soKSk7XG4gICAgZnVuY3Rpb24gY2FuY2VsQWRkVGFzaygpIHtcbiAgICAgICAgLy8gaGlkZSBpbnB1dCBmaWVsZFxuICAgICAgICBhZGRUYXNrRmllbGQuY2xhc3NMaXN0LmFkZCgnaGlkZS1pbnB1dCcpO1xuICAgICAgICAvLyBzaG93IGJ1dHRvblxuICAgICAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtYnRuLWFjdGl2ZScpO1xuICAgIH07ICAgIFxuXG4gICAgLy8gZGlzcGxheSBlYWNoIHByb2plY3RcbiAgICBmdW5jdGlvbiByZW5kZXJQcm9qZWN0cygpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHByb2plY3QucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUYWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHByb2plY3RUYWIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10YWInKTtcbiAgICAgICAgICAgIHByb2plY3RUYWIuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBpbmRleCk7XG4gICAgICAgICAgICBwcm9qZWN0VGFiLnRleHRDb250ZW50ID0gYCR7cHJvamVjdH1gO1xuXG4gICAgICAgICAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJywgJ2ZhLXRyYXNoLWNhbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9qZWN0VGFiLmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuICAgICAgICAgICAgcHJvamVjdExpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFRhYik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlUHJvamVjdEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIC8vIGRlbGV0ZSBpY29uXG4gICAgICAgIGNvbnN0IHByb2plY3REZWxldGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhLXRyYXNoLWNhbicpO1xuICAgICAgICBwcm9qZWN0RGVsZXRlSWNvbi5mb3JFYWNoKChpY29uKSA9PiBpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGFuZGxlRGVsZXRlUHJvamVjdChpY29uLnBhcmVudE5vZGUpKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZURlbGV0ZVByb2plY3Qobm9kZSkge1xuICAgICAgICAvLyBkZWxldGUgZnJvbSBET01cbiAgICAgICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRlbGV0ZSBmcm9tIHByb2plY3QgbW9kdWxlXG4gICAgICAgIHByb2plY3Quc3BsaWNlUHJvamVjdExpc3Qobm9kZS50ZXh0Q29udGVudCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QucHJvamVjdExpc3QpO1xuICAgIH07XG59KSgpOyIsImNvbnN0IHByb2plY3RMaXN0ID0gW107XG5cbmZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgIHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XG59O1xuXG5mdW5jdGlvbiBzcGxpY2VQcm9qZWN0TGlzdChjb250ZW50KSB7XG4gICAgcHJvamVjdExpc3Quc3BsaWNlKGAke3Byb2plY3RMaXN0LmluZGV4T2YoY29udGVudCl9YCwgMSk7XG59O1xuXG5leHBvcnQge1xuICAgIHByb2plY3RMaXN0LFxuICAgIGFkZFByb2plY3QsXG4gICAgc3BsaWNlUHJvamVjdExpc3QsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgZG9tTWFuaXB1bGF0aW9uIGZyb20gJy4vbW9kdWxlcy9kb20uanMnOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==