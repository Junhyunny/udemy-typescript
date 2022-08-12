interface Validatable {
    value: string | number;
    requried?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatable: Validatable) {
    let isValid = true;
    if (validatable.requried) {
        isValid = isValid && validatable.value.toString().trim().length !== 0;
    }
    if (validatable.minLength != null && typeof validatable.value === "string") {
        isValid = isValid && validatable.value.toString().trim().length >= validatable.minLength;
    }
    // !== , !=  차이 그리고 != null은 undefined도 같이 처리해준다.
    if (validatable.maxLength != null && typeof validatable.value === "string") {
        isValid = isValid && validatable.value.toString().trim().length <= validatable.maxLength;
    }
    if (validatable.min != null && typeof validatable.value === "number") {
        isValid = isValid && validatable.value >= validatable.min;
    }
    if (validatable.max != null && typeof validatable.value === "number") {
        isValid = isValid && validatable.value <= validatable.max;
    }
    return isValid;
}

function Autobind(_1: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundedFunc = originalMethod.bind(this);
            return boundedFunc;
        },
    };
    return adjustDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElelment: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        // what is importNode method
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        // for styling
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInputElelment = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
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
            this.clearInputs();
        }
    }

    private configure() {
        // this binding 실패
        this.element.addEventListener("submit", this.sumbitHandler);
    }

    private attach() {
        // what is this method
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

const projectInput = new ProjectInput();
