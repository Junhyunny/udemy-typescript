// <reference path="./base.ts" />

import Component from "../components/base.js";
import Autobind from "../decorators/autobind.js";
import { Draggable } from "../model/drag-drop.js";
import { Project } from "../model/project.js";

// namespace App {
export default class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
{
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
// }
