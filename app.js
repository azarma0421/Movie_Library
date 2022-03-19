// ToDo class
class task {
    constructor(title, deadline, description) {
        this.title = title;
        this.deadline = deadline;
        this.description = description;
    }
}
// UI class
class UI {
    static displayTasks() {
        const StoredTasks = [{
                title: 'Task One',
                deadline: '1010101',
                description: 'A01'
            },
            {
                title: 'Task Two',
                deadline: '1011005',
                description: 'Q03'
            }
        ];

        const tasks = StoredTasks;

        tasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const list = document.querySelector('#ToDo-List');
        console.log(list);
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.deadline}</td>
            <td>${task.description}</td>
            <td><a gerf="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
}
// store class

// Event:Display tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);
// Event: Add a tasks

// Event: Remove a task

// merge test