// intersection types allow combine other types, you intersect types by using &

type Admin = {
  name: string;
  privileges: string[];
};

type employee = { name: string; startDate: Date };
type ElevatedEmployee = Admin & employee;

const el: ElevatedEmployee = {
  name: "Presh",
  privileges: ["can read"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//function overload are used when typescript cannot correctly infer the return type on its own. ie before we added this overload functions the function add return type was combinable even though it returned number or string
//in this case string methods or number methods cant be performed on them
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Precious ", "Nnam");
result.split(" ");

type UnknownEmployee = employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  //This if checks are called type guards, it checks if a certain property or method exists befor you can use it, you mostly find it in union types. for specific types yoy can use 'typeof'
  if ("privileges" in emp) {
    console.log("Priviledges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("start date " + emp.startDate);
  }
}

printEmployeeInfo(el);

class Car {
  drive() {
    console.log("Driving....");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck....");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo...." + amount);
  }
}

type vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: vehicle) {
  vehicle.drive();
  // another way to do it is 'vehicle instanceOf Truck' for objects, use typeOf for definite types like string,number,array,objects etc
  if ("loadCargo" in vehicle) {
    console.log(vehicle.loadCargo(1000));
  }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated unions means there is a common property in each object that describe the object

interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
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

//type casting tells you some variables are of a specific cast of which ts cant not discern ie when you get access to an element in dom

const paragraph = document.querySelector(
  "#message-output"
) as HTMLParagraphElement;

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement;

//index types allows us create object that are flexible regarding the properties they might hold

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not  a valid email",
  username: "Must start with a capital character!",
};

const userData = {
  id: "u1",
  name: "Precious",
  job: { title: "CEO", description: "My own company" },
};

//optional chaining
console.log(userData?.job?.title);

//nullish coelishing
const userInput = "";

// this means if userInput is null or undefined return 'DEFAULT'
const storedData = userInput ?? "DEFAULT";

console.log(storedData);
