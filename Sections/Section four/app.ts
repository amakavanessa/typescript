// const userName = 'Max';
// // userName = 'Maximilian';
// let age = 30;

// age = 29;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result;
// }

// if (age > 20) {
//   let isOld = true;
// }

// console.log(isOld);

// console.log(result);

// const add = (a: number, b: number = 1) => a + b;

// const printOutput: (a: number | string) => void = output => console.log(output);

// const button = document.querySelector('button');

// if (button) {
//   button.addEventListener('click', event => console.log(event));
// }

// printOutput(add(5));

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  firstName: "Max",
  age: 30,
};

const copiedPerson = { ...person };

const addnos = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = addnos(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;

console.log(userName, age, person);

console.log("hello world");

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  if (button) {
    button.addEventListener("click", (event) => console.log(event));
  }
  console.log(button);
});

const sum = (...numbers: number[]) => {
  //this is the rest operator, i dont know the specific amount of input i am expecting so i used rest to accomodate all in an array type, it is different from the spread operator, which copies from a variable and spread it through another variable
  return numbers.reduce((currRes, currVal) => {
    return currRes + currVal;
  }, 0); //reduce loops through the array, and does what you specify in the call back function,the first value it takes in is currRes which is specified ie in this case it is 0, then the second is currValue, which is the element in the array it is reducing
};

//destructuring
// for array destructuring, elements are pulled out in order whereas in onject dstructuring elements are pulled out by key names
