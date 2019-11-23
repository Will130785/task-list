//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Function for loading event listeners
function loadEventListeners(){
//Event listener to add tasks from LS to UI
document.addEventListener("DOMContentLoaded", getTasks);
//Event listener for adding task
form.addEventListener("submit", addTask);
//Event listener for removing a task
taskList.addEventListener("click", removeTask);
//Event listener to clear all tasks
clearBtn.addEventListener("click", clearAll);
//Event listener for filtering tasks
filter.addEventListener("keyup", filterTasks);
};

//Function to add tasks from LS to UI
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };

    tasks.forEach(function(task){
        //Create list element
    const li = document.createElement("li");
    //Add class to li
    li.className = "collection-item";
    //Add text node to li
    li.appendChild(document.createTextNode(task));
    //Create link for delete icon
    const link = document.createElement("a");
    //Add class to link element
    link.className = "delete-item secondary-content";
    //Attach HTML content to link
    link.innerHTML = "<i class='fas fa-times'></i>";
    //Attach link to li
    li.appendChild(link);
    //Attach li to ul
    taskList.appendChild(li);
    });

};

//Function to add task
function addTask(e){
    if(taskInput.value === ""){
        alert("Add a task");
    };

    //Create list element
    const li = document.createElement("li");
    //Add class to li
    li.className = "collection-item";
    //Add text node to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create link for delete icon
    const link = document.createElement("a");
    //Add class to link element
    link.className = "delete-item secondary-content";
    //Attach HTML content to link
    link.innerHTML = "<i class='fas fa-times'></i>";
    //Attach link to li
    li.appendChild(link);
    //Attach li to ul
    taskList.appendChild(li);

    //Persist to local storage
    saveTaskToLocalStorage(taskInput.value);

    //Clear task input
    taskInput.value = "";

    e.preventDefault();
};

//Function to persist task to local storage
function saveTaskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };

    tasks.push(task);

    //set to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Function to remove a task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();

            //Remove task from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        };
    };
};

//Function to clear task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        };
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Function to clear all tasks
function clearAll(){
    // taskList.innerHTML = "";
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

        clearAllFromLocalStorage();
    };
};

//Function to clear all from local storage
function clearAllFromLocalStorage(){
    localStorage.clear();
};

//Function to filter tasks
function filterTasks(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        } else {
            task.style.display = "none";
        };
    });
};