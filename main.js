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
/* harmony export */   projectList: () => (/* binding */ projectList)
/* harmony export */ });
const projectList = [];

function addProject(project) {
    projectList.push(project);
    console.log(projectList);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsbURBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2xGRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUNMQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XG5cbi8vIERPTSBNYW5pcHVsYXRpb25cbmV4cG9ydCBjb25zdCBkb21Db250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdEJ0bicpO1xuICAgIGNvbnN0IGFkZFByb2plY3RGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5LWFkZC1wcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNhbmNlbC1idG4nKTtcbiAgICBjb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtYWRkLWJ0bicpO1xuXG4gICAgLy8gc2hvdyBhZGQgcHJvamVjdCBmaWVsZFxuICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVBZGRQcm9qZWN0KCkpO1xuICAgIGZ1bmN0aW9uIGhhbmRsZUFkZFByb2plY3QoKSB7XG4gICAgICAgIC8vIGhpZGUgYnV0dG9uXG4gICAgICAgIGFkZFByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZS1idG4tYWN0aXZlJyk7XG4gICAgICAgIC8vIHNob3cgaW5wdXQgZmllbGRcbiAgICAgICAgYWRkUHJvamVjdEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtaW5wdXQnKTtcbiAgICB9O1xuXG4gICAgLy8gY2FuY2VsIGFkZCBwcm9qZWN0IGFjdGlvblxuICAgIHByb2plY3RDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjYW5jZWxBZGRQcm9qZWN0KCkpO1xuICAgIGZ1bmN0aW9uIGNhbmNlbEFkZFByb2plY3QoKSB7XG4gICAgICAgIC8vIGhpZGUgaW5wdXRcbiAgICAgICAgYWRkUHJvamVjdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICAgICAgLy8gc2hvdyBidXR0b25cbiAgICAgICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIHRvIHByb2plY3QgbGlzdFxuICAgIHByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVQcm9qZWN0QWRkKCkpO1xuICAgIGZ1bmN0aW9uIGhhbmRsZVByb2plY3RBZGQoKSB7XG4gICAgICAgIC8vIGhpZGUgaW5wdXQgZmllbGRcbiAgICAgICAgYWRkUHJvamVjdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpZGUtaW5wdXQnKTtcbiAgICAgICAgLy8gc2hvdyBidXR0b25cbiAgICAgICAgYWRkUHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWJ0bi1hY3RpdmUnKTtcblxuICAgICAgICAvLyBzZW5kIGlucHV0IHZhbHVlIHRvIHByb2plY3QgbGlzdFxuICAgICAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtaW5wdXQnKTtcbiAgICAgICAgcHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgICAgIC8vIHJlc2V0IGlucHV0XG4gICAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xuICAgIH07XG5cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ0bicpO1xuICAgIGNvbnN0IGFkZFRhc2tGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5LWFkZC10YXNrJyk7XG4gICAgY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbmNlbC1idG4nKTtcblxuICAgIC8vIHNob3cgYWRkIHRhc2sgZmllbGRcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGFuZGxlQWRkVGFzaygpKTtcbiAgICBmdW5jdGlvbiBoYW5kbGVBZGRUYXNrKCkge1xuICAgICAgICAvLyBoaWRlIGJ1dHRvblxuICAgICAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUtYnRuLWFjdGl2ZScpO1xuICAgICAgICAvLyBzaG93IGlucHV0IGZpZWxkXG4gICAgICAgIGFkZFRhc2tGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWlucHV0Jyk7XG4gICAgfTtcblxuICAgIC8vIGNhbmNlbCBhZGQgdGFzayBhY3Rpb25cbiAgICB0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2FuY2VsQWRkVGFzaygpKTtcbiAgICBmdW5jdGlvbiBjYW5jZWxBZGRUYXNrKCkge1xuICAgICAgICAvLyBoaWRlIGlucHV0IGZpZWxkXG4gICAgICAgIGFkZFRhc2tGaWVsZC5jbGFzc0xpc3QuYWRkKCdoaWRlLWlucHV0Jyk7XG4gICAgICAgIC8vIHNob3cgYnV0dG9uXG4gICAgICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1idG4tYWN0aXZlJyk7XG4gICAgfTsgICAgXG5cbiAgICAvLyBkaXNwbGF5IGVhY2ggcHJvamVjdFxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICAgICAgcHJvamVjdExpc3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgcHJvamVjdC5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcHJvamVjdFRhYi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRhYicpO1xuICAgICAgICAgICAgcHJvamVjdFRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgIHByb2plY3RUYWIudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0fWA7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLCAnZmEtdHJhc2gtY2FuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHByb2plY3RUYWIuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0VGFiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pKCk7IiwiY29uc3QgcHJvamVjdExpc3QgPSBbXTtcblxuZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG59O1xuXG5leHBvcnQge1xuICAgIHByb2plY3RMaXN0LFxuICAgIGFkZFByb2plY3Rcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBkb21NYW5pcHVsYXRpb24gZnJvbSAnLi9tb2R1bGVzL2RvbS5qcyc7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9