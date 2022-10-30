// 로컬 변수를 사용하지 않으면 컴파일 에러가 발생하지만, 글로벌 변수는 사용하지 않아도 컴파일 에러가 발생하지 않는다.
// 클로벌 영역의 변수는 외부 어디선가 사용될 수 있으므로 이에 대한 컴파일 에러는 발생시키지 않는다.
let age: number = 30;
const userName = "Max";

console.log(userName);

const button = document.querySelector("button");

// strictNullChecks 설정에 따라 'might be null'일 수 있는 객체에 대해 null 확인을 강요한다.
// strictNullChecks 설정이 false 인 경우 optional(?) 키워드를 사용하지 않아도 컴파일 에러가 발생하지 않는다.
button?.addEventListener("click", (event: MouseEvent) => {
    // 타겟을 HTMLButtonElement로 형변환 필요
    // EventTarget 인터페이스를 Node 인터페이스가 확장하고 있다.
    // Node 인터페이스를 확장한 Element들은 모두 EventTarget이다.
    // 해당 이벤트는 버튼 이벤트이므로 HTMLButtonElement가 타겟이다.
    const eventTarget = event.target as HTMLButtonElement;
    console.log("hello world - " + eventTarget?.outerText);
});

// 파라미터는 미사용하면 컴파일 에러가 발생한다.
function clickHandler(message: string) {
    // 로컬 변수가 미사용 상태인 경우 컴파일 에러가 발생한다.
    // let userName = "Max";
    console.log("clicked - " + message);
}

function add(n1: number, n2: number): number {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return 0;
}

// strictBindCallApply 옵션에 따라 바인드 파라미터로 필요한 매개변수를 전달할 때 이를 엄격하게 검사한다.
// true 인 경우 - bind 함수를 통해 파라미터 값을 반드시 넣어줘야 한다.
// false 인 경우 - 파라미터를 정상적으로 넘겨주지 않아도 된다.
button?.addEventListener("click", clickHandler.bind(null, "This is second event"));
