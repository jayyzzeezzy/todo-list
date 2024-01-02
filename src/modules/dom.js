// DOM manipulation - add project
export const addProject = (function() {
    const addProjectBtn = document.querySelector('.addProjectBtn');
    const addProjectField = document.querySelector('#display-add-project');
    const projectCancelBtn = document.querySelector('.project-cancel-btn');

    // show add project
    addProjectBtn.addEventListener('click', () => handleAddProject());
    function handleAddProject() {
        // hide button
        addProjectBtn.classList.add('add-project-active');

        // show input field
        addProjectField.classList.remove('hide-input');
    };

    // cancel add project action
    projectCancelBtn.addEventListener('click', () => returnAddProjectBtn());
    function returnAddProjectBtn() {
        // hide input
        addProjectField.classList.add('hide-input');

        // show button
        addProjectBtn.classList.remove('add-project-active');
    };
})();