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
        if (title.trim().length === 0 || description.trim().length === 0 || peopleCount < 0) {
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
