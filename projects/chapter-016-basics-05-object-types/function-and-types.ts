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

// 함수 타입인 경우에는 Function 키워드를 사용한다.
// Function 타입인 경우 파라미터가 아예 다른 함수를 지정하는 것을 방지하지 못 한다.
// let combinedValues: Function = addTwoNumbers;

// 파라미터 레이아웃과 리턴 타입을 결정해주면 아예 다른 모습을 가진 함수로 변경할 수 없다.
let combinedValues: (a: number, b: number) => number = addTwoNumbers;

// 컴파일 에러, 숫자와 함수는 엄연히 다르다.
// combinedValues = 5;

// 컴파일 에러, 함수의 모습이 다르다.
// combinedValues = printAndUndefined;

console.log(combinedValues(8, 8));

// 파라미터에 들어오는 함수의 타입에서 파라미터는 엄격하지만, 반환 타입에 대해선 엄격하지 않으므로 컴파일 에러가 나지 않는다.
function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
    const result = n1 + n2;
    callback(result);
}

addAndHandle(10, 20, console.log);
