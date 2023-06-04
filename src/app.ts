//Project State Management
class ProjectState {
  //   private listener: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
  }
}

//this is global instance, which means you can access from anywhere in the file
const projectState = ProjectState.getInstance();

//validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  err: string;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

//autobind decorator
function autoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  //this is the original method/original structure of the method you are adding it to
  const originalMethod = descriptor.value;

  //this is the adjusted method which should take the shape of the original method property descriptor
  const adjDescriptor: PropertyDescriptor = {
    //this getter is executed when you try to execute the function such that when ever you call the function with the auto bind decorator  'this' is same as the 'this' in the constructor
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

//Project List Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  constructor(private type: "active" | "completed") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    this.attach();
    this.renderContent();
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

//This class is responsible for rendering the contents of the template tag inside the div with id as root
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById("app") as HTMLDivElement;
    //importNode is js method used to transfer the data in a template tag to another place, it takes two values, .content, which returns the content of the template element and also the second value which specifies whether it should import it with a deep clone or not
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // the const importedNode cant be manipulated or tweaked directly
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //this attaches an id to the form element extracted on element
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private getUserInputs(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: title,
      required: true,
      err: "Please enter a valid title",
    };
    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
      err: "Please enter a Valid description",
    };
    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5,
      err: "Min no of people is 1 and maximum of 5",
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      console.log([title, description, +people]);
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInputs();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;

      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
  private configure() {
    //the bind function means that this is same as the 'this' in 'this.elemnt' instead of the submit handler
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    //default method provided by the dom to tell where to attach to it
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const project = new ProjectInput();
const activeProjectList = new ProjectList("active");
const completeProjectList = new ProjectList("completed");
