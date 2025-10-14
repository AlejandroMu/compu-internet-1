import createTaskElement from "./TaskCard.js";
const updateTask = (taskId, newStage, callback) => {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ stage: newStage })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server response was not ok");
        }
        return response.json()
    })
    .then(data => {
        if (callback ) callback(data);
    })
    .catch(error => {
        console.error("Error updating task:", error);
        alert("Error updating task: " + error.message);
        if (callback ) callback(null);
    });
}

const ListTask = (list) => {
    const container = document.createElement("div");
    container.className = "task-list-container";

    const title = document.createElement("h2")
    title.innerText = list.name
    container.appendChild(
        title
    )
    const description = document.createElement("p")
    description.innerText = list.description
    container.appendChild(
        description
    );
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-items";
    container.appendChild(taskContainer);
    list.tasks?.forEach(task => {
        const taskElement = createTaskElement(task);
        taskContainer.appendChild(taskElement);
    });


    taskContainer.addEventListener("dragover", (e) => {
        e.preventDefault(); 
        taskContainer.classList.add("drag-over");
    });

    taskContainer.addEventListener("dragleave", () => {
        taskContainer.classList.remove("drag-over");
    });

    taskContainer.addEventListener("drop", (e) => {
        e.preventDefault();
        taskContainer.classList.remove("drag-over");

        const taskId = e.dataTransfer.getData("text/plain");
        console.log(`Dropped task: ${taskId} to list: ${list.id}`);

        // Aquí podrías mover el elemento visualmente
        const dragged = document.querySelector(".dragging");
        const referenceNode =  document.querySelector(".drag-over-sibling");
        updateTask(taskId, list.id, (updatedTask) => {
            if (!updatedTask) {
                if(referenceNode) referenceNode.classList.remove("drag-over-sibling");
                return;
            }
            if (referenceNode && dragged) {
                referenceNode.after(dragged);
                referenceNode.classList.remove("drag-over-sibling");
            } else if (dragged) {
                taskContainer.appendChild(dragged);
            }
        });

        // O actualizar el modelo de datos (list.tasks)
        // según tu lógica de negocio
    });


    return container;
}



export default ListTask;