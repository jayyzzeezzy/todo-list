// DOM Manipulation
export const domController = (function() {
    const addProjectBtn = document.querySelector('.addProjectBtn');
    const addProjectField = document.querySelector('#display-add-project');
    const projectCancelBtn = document.querySelector('.project-cancel-btn');

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
})();