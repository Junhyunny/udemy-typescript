interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart?: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    private attach(insertAtStart?: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtStart ? "afterbegin" : "beforeend",
            this.element
        );
    }

    protected abstract configure(): void;
    protected abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons(): string {
        return `${this.project.people} Person${this.project.people === 1 ? "" : "s"}`;
    }

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        console.log("dragstart", event);
        event.dataTransfer!.setData("text/plain", this.project.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(event: DragEvent): void {
        console.log("dragend", event);
    }

    protected override configure(): void {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }

    protected override renderContent(): void {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
        this.element.querySelector("p")!.textContent = this.project.description;
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLElement;

    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        // this.templateElement = document.getElementById("project-list") as HTMLTemplateElement;
        // this.hostElement = document.getElementById("app") as HTMLDivElement;

        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.element = importedNode.firstElementChild as HTMLElement;
        // this.element.id = `${type}-projects`;

        super("project-list", "app", false, `${type}-projects`);

        this.assignedProjects = [];

        // this.attach();
        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent): void | boolean {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add("droppable");
        }
        return false;
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        console.log("dropHandler");
        const projectId = event.dataTransfer!.getData("text/plain");
        ProjectState.getInstance().moveProject(
            projectId,
            this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        // console.log("dragLeaveHandler", event);
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable");
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
        listEl.innerHTML = "";
        for (const item of this.assignedProjects) {
            // const listItem = document.createElement("li");
            new ProjectItem(this.element.querySelector("ul")!.id, item);
            // listItem.textContent = item.title;
            // listEl?.appendChild(listItem);
        }
    }

    // private attach() {
    //     // what is this method
    //     this.hostElement.insertAdjacentElement("beforeend", this.element);
    // }

    protected configure(): void {
        ProjectState.getInstance().addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((proj) => {
                if (this.type === "active") {
                    return proj.status === ProjectStatus.Active;
                }
                return proj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
    }

    protected override renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
    }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

class ProjectState extends State<Project> {
    // private listeners: Listener[] = [];

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listener: Listener<Project>) {
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
        this.updateListener();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
        }
        this.updateListener();
    }

    private updateListener() {
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
