// interface Draggable {
//     dragStartHandler(event: DragEvent): void;
//     dragEndHandler(event: DragEvent): void;
// }

// interface DragTarget {
//     dragOverHandler(event: DragEvent): void;
//     dropHandler(event: DragEvent): void;
//     dragLeaveHandler(event: DragEvent): void;
// }

// 슬래시가 3개인 경우에는 typescript 가 이해할 수 있는 스페셜 코멘트이다.
// <reference path="./components/base.ts" />
// <reference path="./components/input.ts" />
// <reference path="./components/item.ts" />
// <reference path="./components/list.ts" />
// <reference path="./decorators/autobind.ts" />
// <reference path="./model/drag-drop.ts" />
// <reference path="./model/project.ts" />
// <reference path="./state/project-state.ts" />
// <reference path="./utility/validation.ts" />

// why need .js extension
import ProjectInput from "./components/input";
import ProjectList from "./components/list";

// namespace App {
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
// }
