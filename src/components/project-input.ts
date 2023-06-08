//lets say you used export default component, you can import it with any name you wish ie import Comp from "./base-component.js"; you dont need to put it inside a curlyy braces

import { Component } from "./base-component.js";
//you can also group imports and use it with dot notation or use it as the later
import * as Validation from "../util/validation.js";

// import { Validatable, validate } from "../util/validation.js";
// import { autobind } from "../decorators/autobind.js";
// you can also use alias to avoid name clashes
import { autobind as AutoBinder } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

// ProjectInput Class this handles the way the project entries are gotten from the form input,the submit button gets the validated userInput,
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  //this transfers the elements in the template tag to be a visible form on the front end, calls attach() to attach it as first child of root and also configure() to add a submit event to the form which calls submitHandler()
  constructor() {
    super("project-input", "app", true, "user-input");

    this.configure();
  }

  configure() {
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  //this checks if the inputs pass the validation tests and returns the inputs in an array form
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  //this is responsible for clearing the input field it is called after the submit button is clicked
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBinder //here 'this' is refered to the constructor this instead of the event and this is because of the autobind function
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
