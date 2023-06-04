// //this is a decorator and it is used for classes, it executes when the  your class/interface etc is defined, not when the class is instantiated
// function Logger(constructor: Function) {
//   console.log("Logging...");
//   console.log(constructor);
// }

// //Decorator factories
// function LogFactory(logText: string) {
//   return (constructor: Function) => {
//     console.log(`${logText} + ${constructor.name} `);
//     console.log(constructor);
//   };
// }

// function WithTemplate(template: string, hookId: string) {
//   //use '_' to tell typrscript that you know a value should e there but you wont use it so that it wont flag the unused variable error
//   return function <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: T
//   ) {
//     //you can use a class decorator to add or replace the constructor of the class you call it on
//     //notice  that this doesnt run unless the class has been instantianted unlike when it was used directly on the decorator
//     return class extends originalConstructor {
//       constructor(..._: any[]) {
//         super();
//         console.log("Rendering template");
//         const hookEl = document.getElementById(hookId);

//         if (hookEl) {
//           hookEl.innerHTML = template;
//           hookEl.querySelector("h1")!.textContent = this.name;
//         }
//       }
//     };
//   };
// }

// //@LogFactory("logging ....")  //this is how decorator factories are called

// //you can have 2 decorators in a function, it executes bottom up ie the closest to the class executes first in this case withTemplate. codes directly inside decorator factories execute first then the decorator functions
// @Logger //this is how decorators are called
// @WithTemplate("<h1>My Person Object</h1>", "app")
// class Person {
//   name = "Precious";
//   age = [23, 32.56, 7];

//   constructor() {
//     console.log("creating personr...");
//   }
// }

// const me = new Person();
// console.log(me);

// //you can add decorator to a property, when you do that the decorator recieves two arg, the target of the property and the property name
// //you can use decorators to return on methods and accessors, you can return a brand new property descriptor
// function Log(target: any, propertyName: string | symbol) {
//   console.log("Property decorator!");
//   console.log(target, propertyName);
// }
// //you can also add decorators to accessors
// //target is the constructor funct, name of the accessor, the descriptor
// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor decorator");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// //you can add decorator to a method
// ///you can return something on the method decorator, something that is used to tweak the descriptor and that is used to change the method / the configuration
// function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Method decorator");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// // you can add decorator to a parameter. name is the name of the method you get the parameter, position is the index of the parameter, you can add decorators to all the parameters if you want
// function Log4(target: any, name: string | symbol, position: number) {
//   console.log("Parameter decorator");
//   console.log(target);
//   console.log(name);
//   console.log(position);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error("Invalid price - should be positive");
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }

// function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,

//     //getter is like having a value property that runs with extra logic before the value is returned
//     get() {
//       //this in the getter fn refers to whatever is responsible for triggering the get() function, which is the method
//       const boundFn = originalMethod.bind(this);
//       return boundFn;
//     },
//   };
//   return adjDescriptor;
// }

// class Printer {
//   message = "This works!";
//   @Autobind
//   showMessage() {
//     console.log(this.message);
//   }
// }
// const p = new Printer();

// p.showMessage();
// const button = document.querySelector("button");

// //when you run this the 'this' keyword always targets the element where the event handler is attached to unless you use '.bind(p)' that is when it targets the new printer object 'p'
// button.addEventListener("click", p.showMessage);

// // Decorators for validation
// interface ValidatorConfig {
//   //it should take on an index notation like the one found on the constructor obj when logged on the console
//   [property: string]: {
//     [validatableProp: string]: string[]; //['required','positive']};
//   };
// }

// const registeredValidators: ValidatorConfig = {};
// //property decorator
// function Required(target: any, propName: string) {
//   //dont be confused about the structure of registeredValidators it takes the structure of validatorConfig
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: [
//       ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
//       "required",
//     ],
//   };
// }
// function PositiveNumber(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: [
//       ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
//       "positive",
//     ],
//   };
// }

// function Validate(obj: any) {
//   const objValidatorConfig = registeredValidators[obj.constructor.name];
//   if (!objValidatorConfig) {
//     return true;
//   }
//   let isValid = true;
//   for (const prop in objValidatorConfig) {
//     for (const validator of objValidatorConfig[prop]) {
//       switch (validator) {
//         case "required":
//           isValid = isValid && !!obj[prop];
//           break;
//         case "positive":
//           isValid = isValid && obj[prop] > 0;
//       }
//     }
//   }
//   return isValid;
// }
// class Course {
//   @Required
//   title: string;
//   @PositiveNumber
//   price: number;

//   constructor(t: string, p: number) {
//     this.title = t;
//     this.price = p;
//   }
// }

// const courseForm = document.querySelector("form")!;

// courseForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const titleEl = document.getElementById("title") as HTMLInputElement;
//   const priceEl = document.getElementById("price") as HTMLInputElement;

//   const title = titleEl.value;
//   const price = +priceEl.value;

//   const createdCourse = new Course(title, price);
//   if (!Validate(createdCourse)) {
//     alert("Invalid input, please try again!");
//     return;
//   }
//   console.log(createdCourse);
// });
