const taskList = [];

function CreateTask(title, dueDate = 'No due date') {
    return {
        title,
        dueDate,
    };
};

function addToTaskList(obj) {
    taskList.push(obj);
};

export {
    taskList,
    CreateTask,
    addToTaskList,
};