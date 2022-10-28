// 타입스크립트에 의해 자동적으로 타입이 결정되지만, 명시적으로 지정
function addTwoNumbers(n1: number, n2: number): number {
    return n1 + n2;
}

// 리턴하는 값이 없다면 리턴 타입은 void
// void는 기본적으로 undefined를 반환한다.
// 코드에서 아무 값을 반환하지 않았으므로 void를 사용한다.
// 실재로 반환하는 값을 살펴보면 undefined를 반환한다
function print(num: number): void {
    console.log("result: " + num);
}

// 컴파일 에러
// function print(num: number): undefined {
//     console.log("result: " + num);
// }

// return 키워드를 명시적으로 사용하면 결과 타입을 undefined 지정해도 좋다.
function printAndUndefined(num: number): undefined {
    console.log("result: " + num);
    return;
}

print(addTwoNumbers(5, 12));
