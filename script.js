function addTask() {
    const newTask = document.getElementById("newTask").value;
    if (newTask !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.classList.add("list-group-item"); // Añadir clase Bootstrap
        li.appendChild(document.createTextNode(newTask));

        // Agregar botón de eliminar con ícono de Bootstrap
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "float-right");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Ícono de basura
        deleteButton.onclick = function() {
            li.remove();
            updateLocalStorage(); // Actualizar almacenamiento después de eliminar
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);
        document.getElementById("newTask").value = "";

        updateLocalStorage(); // Actualizar almacenamiento después de agregar
    }

    $('#taskModal').modal('hide'); // Cerrar modal
}

function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById("taskList").getElementsByClassName("list-group-item");
    for (let i = 0; i < taskList.length; i++) {
        tasks.push(taskList[i].textContent.trim());
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("list-group-item"); // Añadir clase Bootstrap
        li.appendChild(document.createTextNode(task));

        // Agregar botón de eliminar con ícono de Bootstrap
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "float-right");
        
        deleteButton.onclick = function() {
            li.remove();
            updateLocalStorage(); // Actualizar almacenamiento después de eliminar
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Cargar las tareas al cargar la página
loadTasks();