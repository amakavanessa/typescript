"use strict";
var _a;
var el = {
    name: "Presh",
    privileges: ["can read"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
var result = add("Precious ", "Nnam");
result.split(" ");
function printEmployeeInfo(emp) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
        console.log("Priviledges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("start date " + emp.startDate);
    }
}
printEmployeeInfo(el);
var Car = (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log("Driving....");
    };
    return Car;
}());
var Truck = (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log("Driving a truck....");
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log("Loading cargo...." + amount);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if ("loadCargo" in vehicle) {
        console.log(vehicle.loadCargo(1000));
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    var speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
    }
    console.log("Moving at speed: " + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 3000 });
var paragraph = document.querySelector("#message-output");
var userInputElement = document.getElementById("user-input");
var errorBag = {
    email: "Not  a valid email",
    username: "Must start with a capital character!",
};
var userData = {
    id: "u1",
    name: "Precious",
    job: { title: "CEO", description: "My own company" },
};
console.log((_a = userData === null || userData === void 0 ? void 0 : userData.job) === null || _a === void 0 ? void 0 : _a.title);
var userInput = "";
var storedData = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT";
console.log(storedData);
