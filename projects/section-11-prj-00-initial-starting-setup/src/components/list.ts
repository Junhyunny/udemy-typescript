// <reference path="./base.ts" />

import Component from "./base";
import ProjectItem from "./item";
import Autobind from "../decorators/autobind";
import { DragTarget } from "../model/drag-drop";
import { ProjectStatus, Project } from "../model/project";
import { ProjectState } from "../state/project-state";

// namespace App {
export default class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
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
// }
