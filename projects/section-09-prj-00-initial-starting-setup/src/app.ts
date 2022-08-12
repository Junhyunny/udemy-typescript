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
            ProjectState.getInstance().addProject(title, description, peopleCount);
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

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        this.templateElement = document.getElementById("project-list") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app") as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${type}-projects`;

        this.assignedProjects = [];

        ProjectState.getInstance().addListener((projects: Project[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
        for (const item of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = item.title;
            listEl?.appendChild(listItem);
        }
    }

    private attach() {
        // what is this method
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
    }
}

type Linstener = (items: Project[]) => void;

class ProjectState {
    private listeners: Linstener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listener: Linstener) {
        this.listeners.push(listener);
    }

    addProject(title: string, description: string, people: number) {
        const project = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.Active
        );
        this.projects.push(project);
        // of, in 차이점
        for (const listenerFunction of this.listeners) {
            // slice 메소드를 통한 신규 배열 전달
            listenerFunction(this.projects.slice());
        }
    }
}

enum ProjectStatus {
    Active,
    Finished,
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
