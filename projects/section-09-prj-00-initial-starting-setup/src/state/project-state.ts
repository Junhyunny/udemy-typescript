import { Project, ProjectStatus } from "../model/project.js";

// namespace App {
export type Listener<T> = (items: T[]) => void;

export class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

export class ProjectState extends State<Project> {
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
// }

console.log("RUNNING....");
