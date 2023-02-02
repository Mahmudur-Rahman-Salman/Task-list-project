// Taking Ui element

let form = document.querySelector("#task_form");
let taskList = document.querySelector("#task_list");
let newTaskInput = document.querySelector("#new_task");
let filterTask = document.querySelector("#task_filter");
let clearTask = document.querySelector("#clear_task");


// Event listeners

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTask.addEventListener("click", clearAll);
filterTask.addEventListener("keyup", filterTaskSearch);



// Custom functions

function addTask(e) {
    if (newTaskInput.value === "") {
        alert("Please add a task");
    }
    else {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(newTaskInput.value + " "));
        //  adding cross button 
        let link = document.createElement("a");
        link.setAttribute('href', "#");
        link.innerHTML = "X";
        li.appendChild(link);
        taskList.appendChild(li);

        // local storage 
        storeTaskInLocalStorage(newTaskInput.value);
        newTaskInput.value = "";
    }
    e.preventDefault()
}


function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure you want to delete this ? ")) {
            let element = e.target.parentElement;
            element.remove();
        }
    }

}

function clearAll(e) {
    taskList.innerHTML = "";

    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild); 
    // }
}

function filterTaskSearch(e) {
    let text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    })

}

// store in local storage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks' === null)) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem(tasks));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}