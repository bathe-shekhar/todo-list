import Projcet from "./project";
import Task from "./task";


export default function todoController() {

    var projects = [];

    if (localStorage.getItem("projects")) {
        projects = JSON.parse(localStorage.getItem("projects"));
        console.log("storage projects: ", projects);
        // projects = data;
        // console.log("data projects: ", projects);
        // localStorage.setItem("projects", JSON.stringify(data));
    }
    else {
        // projects = JSON.parse(localStorage.getItem("projects"));
        // console.log("storage projects: ", projects);
        projects = [
            {
                "name": "Project 1",
                "tasks": [
                    {
                        "name": "task 1",
                        "due_date": "10/05/2024",
                        "priority": "high",
                        "notes": "task1 for project 1"
                    },
                    {
                        "name": "task 2",
                        "due_date": "15/05/2024",
                        "priority": "low",
                        "notes": "task2 for project 1"
                    }
                ]
            },
            {
                "name": "Project 2",
                "tasks": [
                    {
                        "name": "task 1",
                        "due_date": "12/05/2024",
                        "priority": "high",
                        "notes": "task1 for project 2"
                    },
                    {
                        "name": "task 2",
                        "due_date": "18/05/2024",
                        "priority": "low",
                        "notes": "task2 for project 2"
                    },
                    {
                        "name": "task 3",
                        "due_date": "09/05/2024",
                        "priority": "low",
                        "notes": "task3 for project 2"
                    }
                ]
            }
        ]
    }


    function getProjects() {
        return projects;
    }

    function getSingleProject(projectName) {
        // projects.forEach(project => {
        //     if (project.name == projectName) {
        //         console.log(project.name, name);
        //         console.log("matched");
        //         console.log(project);
        //         return project;
        //     }
        // });
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name == projectName) {
                return projects[i];
            }
        }
    }


    function addProject(name) {
        const newProject = new Projcet(name);
        projects.push(newProject);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function removeProject(projectName) {
        projects = projects.filter(project => project.name != projectName);
        console.log("rm project: ", projects);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function addTask(projectName, newTaskName, newTaskDueDate, newTaskPriority, newTaskDescription) {

        const newTask = new Task(newTaskName, newTaskDueDate, newTaskPriority, newTaskDescription);
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name == projectName) {
                projects[i].tasks.push(newTask);
            }
        }
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function removeTask(taskName, projectName) {
        projects.forEach(project => {
            if (project.name === projectName) {
                project.tasks = project.tasks.filter(task => task.name != taskName);
            }
        });
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    // displayTasks(projects[0].tasks, projects[0].name);


    return {
        getProjects,
        getSingleProject,
        addProject,
        removeProject,
        addTask,
        removeTask,
    }
}