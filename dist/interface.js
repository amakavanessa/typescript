"use strict";
var user1;
user1 = {
    name: "Precious",
    age: 24,
    greet: function (phrase) {
        console.log(phrase + "" + this.name);
    },
};
user1.greet("hello there ");
var Greetings = (function () {
    function Greetings(n) {
        this.age = 30;
        this.name = n;
    }
    Greetings.prototype.greet = function (phrase) {
        console.log(phrase + " " + this.name);
    };
    return Greetings;
}());
var greet1;
greet1 = new Greetings("Presh");
greet1.greet("hello there - I am");
console.log(greet1);
var addi = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (currRes, currVal) {
        return currRes + currVal;
    }, 0);
};
console.log(addi(2, 4, 89, 5, 7, 8));
