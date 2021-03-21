const addNewTask = document.querySelector("#addNewTask");
addNewTask.addEventListener("click", displayInputField);
var taskFormCount = document.querySelectorAll("#taskForm");
const inputContainer = document.querySelector("#inputContainer");
const tableBody = document.querySelector("#tableBody");
const emptyTasks = document.querySelector("#emptyTasks");

//Toggle function for displaying input fields
function displayInputField() {
  taskFormCount = document.querySelectorAll("#taskForm");
  console.log(taskFormCount.length);
  if (taskFormCount.length === 0) {
    console.log("Event Triggered");

    var taskForm = document.createElement("div");
    taskForm.setAttribute("id", "taskForm");
    taskForm.setAttribute("class", "d-flex justify-content-center p-2");

    var inPriority = document.createElement("input");
    inPriority.setAttribute("type", "number");
    inPriority.setAttribute("placeholder", "Priority #");
    inPriority.setAttribute("class", "m-2");
    inPriority.setAttribute("id", "inPriority");

    var inTask = document.createElement("input");
    inTask.setAttribute("type", "text");
    inTask.setAttribute("placeholder", "Enter Task");
    inTask.setAttribute("class", "m-2");
    inTask.setAttribute("id", "inTask");

    var submitTask = document.createElement("input");
    submitTask.setAttribute("type", "submit");
    submitTask.setAttribute("value", "Submit");
    submitTask.setAttribute("class", "m-2");
    submitTask.addEventListener("click", addToTable);

    taskForm.appendChild(inPriority);
    taskForm.appendChild(inTask);
    taskForm.appendChild(submitTask);

    inputContainer.appendChild(taskForm);
  }
}

//function for adding input values to table
function addToTable() {
  emptyTasks.remove();
  const priorityToAdd = document.querySelector("#inPriority");
  const taskToAdd = document.querySelector("#inTask");
  const taskList = document.querySelectorAll("#taskPriority");

  var newRow = document.createElement("tr");
  newRow.setAttribute("class", "bg-danger");

  var priorityNum = document.createElement("th");
  priorityNum.setAttribute("id", "taskPriority");
  priorityNum.textContent = priorityToAdd.value;

  var task = document.createElement("td");
  task.textContent = taskToAdd.value;

  var statusContainer = document.createElement("td");
  var status = document.createElement("button");
  status.addEventListener("click", changeStatus);
  status.textContent = "Incomplete";
  statusContainer.appendChild(status);

  var buttonContainer = document.createElement("td");
  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", removeRow);

  buttonContainer.appendChild(removeButton);

  newRow.appendChild(priorityNum);
  newRow.appendChild(task);
  newRow.appendChild(statusContainer);
  newRow.appendChild(buttonContainer);

  if (taskList.length === 0) {
    tableBody.appendChild(newRow);
  } else {
    for (var i = 0; i < taskList.length; i++) {
      currPriority = parseInt(taskList[i].textContent);
      if (priorityToAdd.value < currPriority) {
        taskList[i].parentNode.parentNode.insertBefore(
          newRow,
          taskList[i].parentNode
        );
        break;
      } else {
        tableBody.appendChild(newRow);
      }
    }
  }
}

//toggle function for complete/incomplete status
function changeStatus() {
  var currRow = this.parentNode.parentNode;
  if (this.textContent === "Incomplete") {
    currRow.setAttribute("class", "bg-success");
    this.textContent = "Complete";
  } else {
    currRow.setAttribute("class", "bg-danger");
    this.textContent = "Incomplete";
  }
}

//toggle function for removal of row
function removeRow() {
  this.parentNode.parentNode.remove();
  var rowCount = document.querySelectorAll("#taskPriority");
  if (rowCount.length === 0) {
    console.log("Hello There");
    tableBody.parentNode.parentNode.appendChild(emptyTasks);
  }
}
