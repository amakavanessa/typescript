abstract class Department {
  //class names always start with uppercase
  //   private id: string;
  //   private name: string;
  //private employees: string[] = []; //private means that the property employees is only accesible/ can be manipulated within the department class, any method inside department can use it. they are not even available from classes that inherit the class
  //public is the default and exact opposite of private, it can be accessed and manipulated outside the class.
  static bestYear = 2023;
  protected employees: string[] = [];
  //potected is basically private properties but classes that inherit the class have access to it

  constructor(protected readonly id: string, public name: string) {
    // readonly makes it possible that you wont be able to change the value of a property after initialization
    console.log(Department.bestYear);
  }

  abstract describe(this: Department): void; //when you want to force all the classes that extends a class to write a version of a method you use abstract, which means the class has the be abstract as well

  static createEmployee(name: string, age: number) {
    //use static when you dont want to instantiate the class before calling a method, we call it directly on the class, you can also use assign properties to be static but you cant access them from non static methods and properties. nb you cant mark constructor as static. it cant be accessed with 'this' keyword

    return { name, age };
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ElectDepartment extends Department {
  constructor(id: string) {
    super(id, "Electronic");
  }
  describe(): void {
    console.log("hello hy world");
  }
  addEmployee(employee: string) {
    if (employee == "uju") {
      return;
    }

    this.employees.push(employee);
  }
}

/*************************/

class ITDepartment extends Department {
  private lastReport: string;
  private static instance: ITDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }

    throw new Error("No report found.");
  }
  //getter is a property where you execute a function or method when you retrieve a value ie you can access a private property outside the class. note you dont execute getters or setters as a method but rather as a property;

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Value can not be empty");
    }

    this.addReport(value);
  }
  //you set report outside the class using the set

  //singleton pattern ensures that you only have one instance of a certain class. it is created by adding private in front of a constructor

  private constructor(
    id: string,
    public admins: string[],
    private reports: string[]
  ) {
    super(id, "IT"); //when you inherit from another class you have to call super() in the inheriting class to call the constructor of the base class
    this.admins = admins;
    this.lastReport = reports[0];
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  describe() {
    this.name + "is the second best";
  }

  //singleton continued...if there is already an instance of the class it doesnt leave the if block
  static getInstance() {
    if (ITDepartment.instance) {
      return this.instance;
    }
    this.instance = new ITDepartment("d2", [], []);
    return this.instance;
  }
}

// const course = new Department("id", "Accounting");

// course.addEmployee("Amaka");

// course.addEmployee("Precious");

// course.describe();

// course.printEmployeeInfo();
const check = new ElectDepartment("j2");
check.describe();

const adminst = ITDepartment.getInstance();

adminst.addReport("something went wrong");

adminst.mostRecentReport = "Hello world";

console.log(adminst.mostRecentReport);

adminst.addEmployee("Sommy");

console.log(adminst);

const ee = new ElectDepartment("d3");

ee.addEmployee("Uju");

ee.addEmployee("baby");

ee.describe();
console.log(ee);
// const courseCopy = { name: "law", describe: course.describe };

// courseCopy.describe();

const employee1 = Department.createEmployee("Vanny", 24);

console.log(employee1);
