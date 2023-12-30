// DOM manipulation - add project
export const addProject = (function() {
    const addProjectBtn = document.querySelector('.addProjectBtn');
    addProjectBtn.addEventListener('click', () => handleAddProject());
    function handleAddProject() {
        // remove add project button
        addProjectBtn.classList.add('add-project-active');

        const addProjectField = document.querySelector('#display-add-project');
        const addProjectContainer = document.createElement('div');
        const addProjectInput = document.createElement('input');
        const projectBtnField = document.createElement('div');
        const projectAddBtn = document.createElement('button');
        const projectCancelBtn = document.createElement('button');

        addProjectContainer.classList.add('add-project-container');
        addProjectInput.classList.add('add-project-input');
        addProjectInput.type = 'text';
        projectBtnField.classList.add('project-btn-field');
        projectAddBtn.classList.add('project-add-btn');
        projectCancelBtn.classList.add('project-cancel-btn');

        projectAddBtn.textContent = 'Add';
        projectCancelBtn.textContent = 'Cancel';

        projectBtnField.appendChild(projectAddBtn);
        projectBtnField.appendChild(projectCancelBtn);
        addProjectContainer.appendChild(addProjectInput);
        addProjectContainer.appendChild(projectBtnField);
        addProjectField.appendChild(addProjectContainer);
    };
})();