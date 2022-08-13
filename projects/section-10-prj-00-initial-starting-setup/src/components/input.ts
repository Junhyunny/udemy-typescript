// <reference path="./base.ts" />
// <reference path="../decorators/autobind.ts" />

import Component from "./base";
import Autobind from "../decorators/autobind";
import { Validatable, validate } from "../utility/validation";
import { ProjectState } from "../state/project-state";

// namespace App {
export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLFormElement;

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElelment: HTMLInputElement;

    constructor() {
        // this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        // this.hostElement = document.getElementById("app")! as HTMLDivElement;

        // // what is importNode method
        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.element = importedNode.firstElementChild as HTMLFormElement;
        // // for styling
        // this.element.id = "user-input";

        super("project-input", "app", true, "user-input");

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInputElelment = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        // this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const peopleCount = +this.peopleInputElelment.value;

        const titleValidatable: Validatable = { value: title, requried: true, minLength: 5 };
        const descriptionValidatable: Validatable = {
            value: description,
            requried: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: peopleCount,
            requried: true,
            min: 1,
            max: 5,
        };

        if (
            !(
                validate(titleValidatable) &&
                validate(descriptionValidatable) &&
                validate(peopleValidatable)
            )
        ) {
            alert("invalid input, please try again");
            // throw new Error("invalid input, please try again");
            return;
        }
        return [title, description, peopleCount];
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElelment.value = "";
    }

    @Autobind
    private sumbitHandler(event: Event) {
        // do not http request
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, peopleCount] = userInput;
            console.log(title, description, peopleCount);
            ProjectState.getInstance().addProject(title, description, peopleCount);
            this.clearInputs();
        }
    }

    protected override configure() {
        // this binding 실패
        this.element.addEventListener("submit", this.sumbitHandler);
    }

    protected override renderContent() {}

    // protected override attach() {
    //     // what is this method
    //     this.hostElement.insertAdjacentElement("afterbegin", this.element);
    // }
}
// }
