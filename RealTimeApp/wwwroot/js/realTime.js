"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/RealTimeData").build();

//Disable send button until connection is established

connection.on("ReceiveMessage", function (employee,type) {
    //var msg = employee.Email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var emp = JSON.parse(employee);
    if (type === "Add") {
        $("#data").append("<tr id=" + emp.ID + "><td>" + emp.FirstName + "</td><td>" + emp.LastName + "</td><td>" + emp.Email + "</td><td>" + emp.Phone + "</td> <td><a href='Employees/Edit/" + emp.ID + "'>Edit</a> | <a href='Employees/Details/" + emp.ID + "'>Details</a> |<a href='Employees/Delete/" + emp.ID + "'>Delete</a></td></tr>");
    } else if (type === "Edit") {
        $("#" + emp.ID).html("<td>" + emp.FirstName + "</td><td>" + emp.LastName + "</td><td>" + emp.Email + "</td><td>" + emp.Phone + "</td> <td><a href='Employees/Edit/" + emp.ID + "'>Edit</a> | <a href='Employees/Details/" + emp.ID + "'>Details</a> |<a href='Employees/Delete/" + emp.ID + "'>Delete</a></td>");
    } else if (type === "Delete") {
        $("#" + emp.ID).remove();
    }
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

