function add(n1: number, n2: number) {
  return n1 + n2;
}

function printRes(num: number) {
  console.log(num);
} // this function is of type void because it has no return value

let combineValues: (a: number, b: number) => number; //thsi specifies that combine value has a function type and it only accepts functions with 2 parameters which are nos and also the function must return a no as well

combineValues = add;

combineValues(5, 6);

let userInput: unknown; //unknown is just like any, it is used when you dont know exactly what the user will input,however when a value is assign to a variable of type unknown, typeScript then check subsequent values to be sure they corespond to the type of the first value

function generateError(message: string, code: number) {
  throw { message: MessageChannel, errorCode: code };
}

// generateError("An error occured", 500);
//return type is 'never' it never returns anything, an error function never returns anything and also an infinite while loop also returns never

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

welcomePeople(["chike"]);
