let age: number = 30;
const userName = "Max";
console.log(userName);

const button = document.querySelector("button");
button?.addEventListener("click", (event: MouseEvent) => {
    // 타겟을 HTMLButtonElement로 형변환 필요
    // EventTarget 인터페이스를 Node 인터페이스가 확장하고 있다.
    // Node 인터페이스를 확장한 Element들은 모두 EventTarget이다.
    // 해당 이벤트는 버튼 이벤트이므로 HTMLButtonElement가 타겟이다.
    const eventTarget = event.target as HTMLButtonElement;
    console.log("hello world - " + eventTarget?.outerText);
});
