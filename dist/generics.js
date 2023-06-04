"use strict";
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Presh", hobbies: "cooking" }, { age: 30 });
console.log(mergedObj.age);
function countAndDescribe(el) {
    let describeText = "Got no element.";
    if (el.length === 1) {
        describeText = `Got 1 element`;
    }
    else if (el.length > 1) {
        describeText = `Got ${el.length} elements`;
    }
    return [el, describeText];
}
console.log(countAndDescribe("jeyetr hye"));
console.log(countAndDescribe(["jeyetr", "hye"]));
function extractAndConvert(obj, key) {
    return `Value: ${obj[key]}`;
}
console.log(extractAndConvert({ name: "precious" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Coding");
textStorage.addItem("typeScript");
textStorage.addItem("Jumping");
textStorage.removeItem("Jumping");
console.log(textStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ["Precious", "Amaka"];
