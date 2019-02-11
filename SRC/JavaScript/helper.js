function getDateFormated(_date) {
    var _dateString = null;
    var _year = _date.getFullYear();
    var _month = _date.getMonth();
    var _day = _date.getDate();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    _dateString = months[_month] + "- " + _day + ", " + _year;
    return _dateString
}

function getNewitem() {

    var _newItem = {
        id: null,
        createdDate: new Date(),
        updatedDate: new Date(),
        dueDate: new Date(),
        alertDate: null,
        title: null,
        content: null,
        processPercentage: 0,
        isDone: false,
        pictureLink: null,
    }

    return _newItem;
}


function rowOutTheList() {

    for (var i = 0; i < tasks.length; i++) {
        console.log("i:", i);
        var row = todoListTableBody.insertRow();
        var cellDueDate = row.insertCell();
        var cellTitle = row.insertCell();
        var cellContent = row.insertCell();
        var cellProcess = row.insertCell();
        var cellTools = row.insertCell();




        cellDueDate.textContent = getDateFormated(tasks[i].dueDate);
        cellTitle.textContent = tasks[i].title;
        cellContent.textContent = tasks[i].content;
        cellProcess.textContent = tasks[i].processPercentage + " %";


        var createEditClickHandler = function(_task) {
            return function() {
                openCreateEditPopup(_task)
            };
        };

        cellDueDate.onclick = createEditClickHandler(tasks[i]);
        cellTitle.onclick = createEditClickHandler(tasks[i]);
        cellContent.onclick = createEditClickHandler(tasks[i]);
        cellProcess.onclick = createEditClickHandler(tasks[i]);

        // Add dele icon
        var deleIcon = document.createElement("i");
        deleIcon.classList.add("material-icons");
        var node = document.createTextNode("delete");
        deleIcon.appendChild(node);

        var createDeleClickHandler = function(_task) {
            return function() {
                deleteTask(_task)
            };
        };

        deleIcon.onclick = createDeleClickHandler(tasks[i]);

        cellTools.appendChild(deleIcon);


        // Add dele icon end
    }
}

function deleAlldata() {
    deleteAllRows()
    tasks = [];
}


function deleteAllRows() {

    console.log("deleOldList")

    for (var i = tasks.length; i > 0; i--) {
        todoListTableBody.deleteRow(i - 1);
    }
}


function addANewItem() {

    deleteAllRows();
    tasks.push(getNewitem());
    rowOutTheList(tasks);
    console.log("after add new item, tasks:", tasks)

}

function openCreateEditPopup(_task) {
    console.log("openCreateEditPopup:", _task);
    popupEditWindow.style.display = "block";

    // Maping task data
    tempTask = _task;
    formTitle.value = tempTask.title;
    formContent.value = tempTask.content;
    processSlider.value = tempTask.processPercentage;
    showProcessNumber(tempTask.processPercentage);


}

function deleteTask(_task) {
    console.log("deleteTask:", _task);
    deleteAllRows();

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id == _task.id) {
            tasks.splice(i, 1)
        }
    }
    console.log("After dele, tasks:", tasks);


    rowOutTheList();

}

function closePopup() {

    popupEditWindow.style.display = "none";
}

function showProcessNumber(value) {
    console.log("showProcessNumber:", value);
    processNumber.innerHTML = value;
}

function saveData() {
    console.log("save Data:");
    tempTask.title = formTitle.value;
    tempTask.content = formContent.value;
    tempTask.processPercentage = processSlider.value;

    console.log("tempTask:", tempTask);

    updatedTask()

    closePopup();

}

function updatedTask() {



    var _id = tempTask.id;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == _id) {
            tasks[i] = tempTask;
        }
    }
    deleteAllRows();
    rowOutTheList();
}