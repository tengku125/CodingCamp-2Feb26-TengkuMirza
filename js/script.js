const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');
const filterOption = document.getElementById('filter-todo');
const deleteAllBtn = document.getElementById('delete-all');

let todos = [];

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
});

filterOption.addEventListener('change', renderTodos);

deleteAllBtn.addEventListener('click', function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        todos = [];
        renderTodos();
    }
});

function addTodo() {
    const taskValue = todoInput.value;
    const dateValue = todoDate.value;

    if (taskValue === '') {
        alert("Please enter a task!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        task: taskValue,
        dueDate: dateValue,
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
    todoForm.reset();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function toggleStatus(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    
    const filterValue = filterOption.value;
    const filteredTodos = todos.filter(todo => {
        if (filterValue === 'completed') return todo.completed;
        if (filterValue === 'pending') return !todo.completed;
        return true; 
    });

    if (filteredTodos.length === 0) {
        emptyMsg.classList.remove('hidden');
        emptyMsg.classList.add('flex');
    } else {
        emptyMsg.classList.add('hidden');
        emptyMsg.classList.remove('flex');
    }

    filteredTodos.forEach(todo => {
        const row = document.createElement('tr');
        
        row.className = "bg-white border-b border-gray-100 hover:bg-gray-50 transition duration-150 ease-in-out";

        const textStyle = todo.completed ? "line-through text-gray-400" : "text-gray-800 font-bold";
        const dateStyle = "text-gray-500 text-sm";
        
        const statusBadge = todo.completed 
            ? '<span class="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold shadow-sm">Completed</span>'
            : '<span class="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold shadow-sm">Pending</span>';
        
        const checkIcon = todo.completed ? "↩" : "✓";
        const checkBtnColor = todo.completed ? "text-gray-400 hover:text-gray-600" : "text-green-500 hover:text-green-700";

        row.innerHTML = `
            <td class="p-4 ${textStyle}">${todo.task}</td>
            <td class="p-4 ${dateStyle}">${todo.dueDate}</td>
            <td class="p-4">${statusBadge}</td>
            <td class="p-4 text-center space-x-3">
                <button onclick="toggleStatus(${todo.id})" class="${checkBtnColor} p-2 rounded-full hover:bg-gray-100 transition font-bold text-lg" title="Toggle Status">
                    ${checkIcon}
                </button>
                <button onclick="deleteTodo(${todo.id})" class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition font-bold text-lg" title="Delete">
                    ✕
                </button>
            </td>
        `;

        todoList.appendChild(row);
    });
}