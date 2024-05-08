import data from "../assets/data.json";
// import displayTasks from "./displayTasks";
import todoController from "../task-controller/todoController";

export default function displayProjects() {

    var firstDisplay = true;
    var firstLiDisplay = true;
    var newProjectAdded = false;
    const todo = todoController();

    const newProject = document.querySelector("#new-project");
    const addTask = document.querySelector("#add-task");
    const inputProjectName = document.querySelector("#project-name");
    const addProjectButton = document.querySelector("#add-project-button");
    const closeProjectButton = document.querySelector("#close-project-button");
    const projectListDiv = document.querySelector("#project-list");
    const projectList = document.createElement("ul");
    const projectTitle = document.querySelector("#todo-list-project-title");

    const projectDialog = document.querySelector("#project-diaglog");
    const taskDialog = document.querySelector("#task-dialog");

    const createTask = document.querySelector("#add-task-button");
    const closeTaskDialog = document.querySelector("#close-task-button");
    const taskNameInput = document.querySelector("#task-name");
    const taskDueDateInput = document.querySelector("#task-due-date");
    const taskPriorityInput = document.querySelector("#task-priority");
    const taskDescriptionInput = document.querySelector("#task-description");

    function displayProjectList() {

        projectList.innerHTML = "";
        const projects = todo.getProjects();
        console.log("displayProjectList projects: ", projects);
        projects.forEach(project => {
            const projectListLi = document.createElement('li');
            projectListLi.className = "project-list-item";
            console.log(firstDisplay);
            if (firstLiDisplay) {
                projectListLi.classList = "project-list-item selected";
                firstLiDisplay = false;
            }
            const projectListButton = document.createElement('button');
            projectListButton.className = "project-list-element"
            projectListButton.innerText = project.name;

            const projectRemoveButton = document.createElement('button');
            projectRemoveButton.className = "project-remove-button";
            projectRemoveButton.innerText = "X";
            projectRemoveButton.id = project.name;

            projectRemoveButton.addEventListener("click", () => {
                todo.removeProject(project.name);
                firstDisplay = true;
                firstLiDisplay = true;
                displayProjectList();
            });

            const projectListLiDiv = document.createElement('div');
            projectListLiDiv.className = "list-div";

            projectListLi.addEventListener("click", () => {
                console.log(project.taskss);
                projectTitle.innerHTML = project.name;
                displayTasks(project.name);

                const projectList = document.querySelectorAll(".project-list-item");
                projectList.forEach(projectListItem => {
                    // projectListItem.setAttribute("class", "project-list-item");
                    projectListItem.classList.remove("selected");
                });

                projectListLi.classList.add("selected");


            });

            projectListLi.appendChild(projectListButton);
            projectListLiDiv.appendChild(projectListLi);
            projectListLiDiv.appendChild(projectRemoveButton);
            projectList.appendChild(projectListLiDiv);
        });

        projectListDiv.appendChild(projectList);

        if (firstDisplay) {
            displayTasks(projects[0].name);
            projectTitle.innerHTML = projects[0].name;
            firstDisplay = false;
        }

        if (newProjectAdded) {
            const length = projects.length;
            // console.log(projects[length]);
            displayTasks(projects[length - 1].name);
            projectTitle.innerHTML = projects[length - 1].name;
            newProjectAdded = false;
        }
    }


    //************************************/

    function displayTasks(projectName) {

        console.log("projectName: ", projectName);
        const project = todo.getSingleProject(projectName);

        console.log("projectSi: ", project);

        const tasks = project.tasks;

        console.log(tasks);

        const todoList = document.querySelector("#todo-list");

        todoList.innerHTML = "";

        tasks.forEach(task => {

            const taskBlock = document.createElement('div');

            const removeTaskButton = document.createElement('button');
            removeTaskButton.className = "remove-task";
            removeTaskButton.innerText = "X";
            removeTaskButton.id = task.name;

            removeTaskButton.addEventListener("click", () => {
                todo.removeTask(task.name, projectName);
                console.log(task.name, projectName);
                displayTasks(projectName)
            });


            const taskDiv = document.createElement("div");
            taskDiv.className = "task";

            const taskTitle = document.createElement("h3");
            taskTitle.className = "task-title";
            taskTitle.innerText = task.name;

            const taskDueDate = document.createElement("p");
            taskDueDate.innerHTML = "Task Due date: " + task.due_date;

            const taskPriority = document.createElement("p");
            taskPriority.innerHTML = "Priority: " + task.priority;

            const taskDescTitle = document.createElement("h4");
            taskDescTitle.innerHTML = "Description";

            const taskNotes = document.createElement("p");
            taskNotes.innerHTML = task.notes;

            taskDiv.appendChild(taskTitle);
            taskDiv.appendChild(taskDueDate);
            taskDiv.appendChild(taskPriority);
            taskDiv.appendChild(taskDescTitle);
            taskDiv.appendChild(taskNotes);

            taskBlock.appendChild(removeTaskButton);
            taskBlock.appendChild(taskDiv);

            todoList.appendChild(taskBlock);

        });
    }

    //************************************/


    newProject.addEventListener("click", () => {

        projectDialog.style.display = "block";

    });

    addProjectButton.addEventListener("click", () => {

        const newProjectName = inputProjectName.value;
        if (newProjectName != "") {
            todo.addProject(newProjectName);
            newProjectAdded = true;
            displayProjectList();
            inputProjectName.value = "";
            projectDialog.style.display = "none";
        }
        else {
            window.alert("Please enter project name.");
        }

    });

    closeProjectButton.addEventListener("click", () => {
        projectDialog.style.display = "none";
    });

    addTask.addEventListener("click", () => {
        taskDialog.showModal();
    });

    closeTaskDialog.addEventListener("click", () => {
        taskDialog.close();
    });

    createTask.addEventListener("click", () => {
        const newTaskName = taskNameInput.value;
        const newTaskDueDate = taskDueDateInput.value;
        const newTaskPriority = taskPriorityInput.value;
        const newTaskDescription = taskDescriptionInput.value;

        if (newTaskName == "" || newTaskDueDate == "" || newTaskPriority == "" || newTaskDescription == "") {
            window.alert("Please enter all the fields.");
        }
        else {

            todo.addTask(projectTitle.innerHTML, newTaskName, newTaskDueDate, newTaskPriority, newTaskDescription);
            taskNameInput.value = "";
            taskDueDateInput.value = "";
            taskPriorityInput.value = "";
            taskDescriptionInput.value = "";
            taskDialog.close();
            displayTasks(projectTitle.innerHTML);
        }
    });


    displayProjectList();
}