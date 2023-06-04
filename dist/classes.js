"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = (function () {
    function Department(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
        console.log(Department.bestYear);
    }
    Department.createEmployee = function (name, age) {
        return { name: name, age: age };
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmployeeInfo = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    Department.bestYear = 2023;
    return Department;
}());
var ElectDepartment = (function (_super) {
    __extends(ElectDepartment, _super);
    function ElectDepartment(id) {
        return _super.call(this, id, "Electronic") || this;
    }
    ElectDepartment.prototype.describe = function () {
        console.log("hello hy world");
    };
    ElectDepartment.prototype.addEmployee = function (employee) {
        if (employee == "uju") {
            return;
        }
        this.employees.push(employee);
    };
    return ElectDepartment;
}(Department));
var ITDepartment = (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins, reports) {
        var _this = _super.call(this, id, "IT") || this;
        _this.admins = admins;
        _this.reports = reports;
        _this.admins = admins;
        _this.lastReport = reports[0];
        return _this;
    }
    Object.defineProperty(ITDepartment.prototype, "mostRecentReport", {
        get: function () {
            if (this.lastReport) {
                return this.lastReport;
            }
            throw new Error("No report found.");
        },
        set: function (value) {
            if (!value) {
                throw new Error("Value can not be empty");
            }
            this.addReport(value);
        },
        enumerable: false,
        configurable: true
    });
    ITDepartment.prototype.addReport = function (report) {
        this.reports.push(report);
        this.lastReport = report;
    };
    ITDepartment.prototype.describe = function () {
        this.name + "is the second best";
    };
    ITDepartment.getInstance = function () {
        if (ITDepartment.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment("d2", [], []);
        return this.instance;
    };
    return ITDepartment;
}(Department));
var check = new ElectDepartment("j2");
check.describe();
var adminst = ITDepartment.getInstance();
adminst.addReport("something went wrong");
adminst.mostRecentReport = "Hello world";
console.log(adminst.mostRecentReport);
adminst.addEmployee("Sommy");
console.log(adminst);
var ee = new ElectDepartment("d3");
ee.addEmployee("Uju");
ee.addEmployee("baby");
ee.describe();
console.log(ee);
var employee1 = Department.createEmployee("Vanny", 24);
console.log(employee1);
