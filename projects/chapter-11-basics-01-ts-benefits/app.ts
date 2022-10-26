// JavaScript는 파라미터 뒤에 타입이 오는 것을 이해하지 못 한다.
function add(n1: number, n2: number, printResult: boolean, resultPhrase: string) {
    // typescript를 사용하면 불필요한 타입 확인 로직, Redundant
    // if (typeof n1 !== "number" || typeof n2 !== "number") {
    //     throw new Error("incorrect input error");
    // }
    // sometimes return or not
    // it makes occur compile error when deciding return type
    if (printResult) {
        console.log(`${resultPhrase}${n1 + n2}`);
    } else {
        return n1 + n2;
    }
}

// 타입 보증(type assurance), 실제 할당 해주는 값을 통해 타입을 추정한다.
// let 변수처럼 즉시 초기화를 수행하지 않는다면 타입을 지정해주는 것이 베스트 플랙티스
// const 변수처럼 즉시 초기화가 필요하다면 타입을 굳이 지정하지 않아도 된다.
const number1: number = 5;
const number2 = 2.8;
const printResult = true;
let resultPhrase = "Result is: ";

// 컴파일 에러가 발생한다.
// 타입 추정에 의해 resultPhrase 변수는 이미 문자열 타입이다.
// resultPhrase = 0;

// strictFunctionTypes 옵션을 넣으면 파라미터 개수가 다른 것에 대한 컴파일 에러를 낸다
const result = add(number1, number2, printResult, resultPhrase);

const element = document.getElementById("result") as HTMLElement | null;

if (element?.innerText !== undefined) {
    element.innerText = result + "";
}
