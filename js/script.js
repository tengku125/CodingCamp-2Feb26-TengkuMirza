alert("Script berhasil connect!");
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg'); // Pastikan ID ini ada di HTML

let todos = [];

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
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

function renderTodos() {
    todoList.innerHTML = ''; // Hapus isi tabel lama

    // Logika menampilkan pesan kosong
    if (todos.length === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
    }

    todos.forEach(todo => {
        const row = document.createElement('tr');
        row.className = "border-b hover:bg-gray-50";
        row.innerHTML = `
            <td class="p-3">${todo.task}</td>
            <td class="p-3">${todo.dueDate}</td>
            <td class="p-3"><span class="bg-yellow-200 text-yellow-800 py-1 px-2 rounded text-sm">Pending</span></td>
            <td class="p-3 text-center"><button class="text-red-500">Delete</button></td>
        `;
        todoList.appendChild(row);
    });
}