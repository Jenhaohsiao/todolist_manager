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
        let row = todoListTableBody.insertRow();
        let cellDueDate = row.insertCell();
        let cellTitle = row.insertCell();
        let cellContent = row.insertCell();
        let cellProcess = row.insertCell();


        cellDueDate.textContent = getDateFormated(tasks[i].dueDate);
        cellTitle.textContent = tasks[i].title;
        cellContent.textContent = tasks[i].content;
        cellProcess.textContent = tasks[i].processPercentage;
    }
}

function deleAlldata() {
    deleteAllRows()
    tasks = [];
}


function deleteAllRows() {

    console.log("deleOldList")

    for (var i = tasks.length; i > 0; i--) {
        console.log("i:", i);
        todoListTableBody.deleteRow(i - 1);
    }
}


function addANewItem() {

    deleteAllRows();
    tasks.push(getNewitem());
    rowOutTheList(tasks);
    console.log("after add new item, tasks:", tasks)

}