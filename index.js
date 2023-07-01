// Your code here
function createEmployeeRecord(employeeRecord) {
    const employee = {
        'firstName': employeeRecord[0],
        'familyName': employeeRecord[1],
        'title': employeeRecord[2],
        'payPerHour': employeeRecord[3],
        'timeInEvents': [],
        'timeOutEvents': []
    };
    return employee;
}

function createEmployeeRecords(employeeRecords) {
    const employees = employeeRecords.map(record => createEmployeeRecord(record));
    return employees;
}

function createTimeInEvent(employeeRecord, date) {
    const newTimeIn = {
        type: "TimeIn",
        date: date.slice(0, 10),
        hour: parseInt(date.slice(-4))
    }
    employeeRecord.timeInEvents.push(newTimeIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date) {
    const newTimeOut = {
        type: "TimeOut",
        date: date.slice(0, 10),
        hour: parseInt(date.slice(-4))
    }
    employeeRecord.timeOutEvents.push(newTimeOut);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, hoursWorked) {
    let wageEarned = hoursWorkedOnDate(employee, hoursWorked) * employee.payPerHour;
    return parseFloat(wageEarned.toString());
}

function allWagesFor(employeeData) {
    let workTime = employeeData.timeInEvents.map(event => {return event.date});
    let totalPay = workTime.reduce(function(total, date) {
        return total + wagesEarnedOnDate(employeeData, date);
    },0)
    return totalPay;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, employee) {
        return total + allWagesFor(employee);
    },0)
}
