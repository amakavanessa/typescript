//generic types are types connected to other types lets say an array, an array is a type of data, but it always contains other types of data

// const names: Array<string> = []; //This is same as names:string[]

// //another generic type is promise, promises are a type of data, but you must specify what kind of data it should resolve/return

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// });

// promise.then((data) => {
//   data.split(" ");
// });

// ******************************************

// creating generic functions, the T and U specifies you dont know the type to be expecting but what you know is that the resulting object would be an intersection of type T and U

// you should use constraint, ie give it a structure without saying what kind of data it should take in. you can even give it your own personal custom type, union types etc

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Presh", hobbies: "cooking" }, { age: 30 });

console.log(mergedObj.age);

/****************************************************** */
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(el: T): [T, string] {
  let describeText = "Got no element.";

  if (el.length === 1) {
    describeText = `Got 1 element`;
  } else if (el.length > 1) {
    describeText = `Got ${el.length} elements`;
  }
  return [el, describeText];
}

console.log(countAndDescribe("jeyetr hye"));
console.log(countAndDescribe(["jeyetr", "hye"]));

//KeyOf constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: "precious" }, "name"));

/*************************************************************8 */
// Generic class, you could even use generic types in methods

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    //this is not an ideal way when working with non-primitive types like objects so its better you define what types T could be
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

//The dataStorage class is generic because you can customize the values it takes in
const textStorage = new DataStorage<string>();

textStorage.addItem("Coding");
textStorage.addItem("typeScript");
textStorage.addItem("Jumping");
textStorage.removeItem("Jumping");

console.log(textStorage.getItems());

//generic utility types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  //The partial sets all the properties in course goal to optional and bypasses the checking
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  //In this case you allowed for the objects properties to be optional temporaly by returning it as CouseGoal
  return courseGoal as CourseGoal;
}
//array of string methods that can modify name wont be permitted since it is marked with readonly
const names: Readonly<string[]> = ["Precious", "Amaka"];
