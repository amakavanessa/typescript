//an intreface describes the structure of an object, they cant have an initializer, interface and custom types are different, interfaces are clearer, you can implement interfaces in a class
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Precious",
  age: 24,
  greet(phrase: string) {
    console.log(phrase + "" + this.name);
  },
};
user1.greet("hello there ");
interface Age {
  age: number;
  //you can make properties in an interface as option by including a '?' you can also include it on an object .
  birthYear?: number;
}
//interfaces can extend each other, any class that implements greetable must have a combination of its structure and the structure of the interface it extends
interface Greetable extends Age {
  //you cant add public, private, static inside of an interface, only readonly
  readonly name: string;

  greet(phrase: string): void;
}

class Greetings implements Greetable {
  // you can implement multiple interfaces unlike classes, you seperate them by ','. they are often used to share functionalities among different classes regarding their structure
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let greet1: Greetable;

greet1 = new Greetings("Presh");
greet1.greet("hello there - I am");

console.log(greet1);

// you can create function types with interface but using custom type is more common

// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (arr: number[]): number; //this similar to the way we define a method in an interface without including the name
}

// let addi: AddFn;

let addi = (...numbers: number[]) => {
  return numbers.reduce((currRes, currVal) => {
    return currRes + currVal;
  }, 0);
};

console.log(addi(2, 4, 89, 5, 7, 8));
