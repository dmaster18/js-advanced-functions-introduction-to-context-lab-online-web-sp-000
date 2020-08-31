// Your code here
function createEmployeeRecord(src) {
  let employee = {};
  employee.firstName = src[0];
  employee.familyName = src[1];
  employee.title = src[2];
  employee.payPerHour = src[3];
  employee.timeInEvents = [];
  employee.timeOutEvents = [];
  return employee;
}

function createEmployeeRecords(src) {
  let employees = [];
  for (let i = 0; i < src.length; i++) {
    let employee = createEmployeeRecord(src[i]);
    employees.push(employee);
  }
  return employees;
}

function createTimeInEvent(employee, dateTimeString) {
  let dateTimeArray = dateTimeString.split(" ");
  let timeIn = {};
  employee.timeInEvents.push(timeIn);
  timeIn.date = dateTimeArray[0];
  timeIn.hour = parseInt(dateTimeArray[1]);
  timeIn.type = "TimeIn";
  return employee;
}

function createTimeOutEvent(employee, dateTimeString) {
  let dateTimeArray = dateTimeString.split(" ");
  let timeOut = {};
  employee.timeOutEvents.push(timeOut);
  timeOut.date = dateTimeArray[0];
  timeOut.hour = parseInt(dateTimeArray[1]);
  timeOut.type = "TimeOut";
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let findHour = function(timeEvent) {if (date === timeEvent.date) {return timeEvent;}}
  let timeIn = employee.timeInEvents.find(findHour).hour;
  let timeOut = employee.timeOutEvents.find(findHour).hour;
  let hoursWorked = (timeOut - timeIn)/100;
  return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
  let wagesEarned = hoursWorkedOnDate(employee, date)*employee.payPerHour;
  return wagesEarned;
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {return e.date})
  let payable = eligibleDates.reduce(function(memo, date) {return memo + wagesEarnedOnDate(employee, date)}, 0);
  return payable;
}

function calculatePayroll(employees) {
  let payroll = employees.reduce(function(memo, employee) {return memo + allWagesFor(employee)}, 0);
  return payroll;
}

function findEmployeeByFirstName(employees, firstName) {
  let findEmployee = function(employee) {if (employee.firstName === firstName) {return employee}}
  let employeeObject = employees.find(findEmployee);
  return employeeObject;
}