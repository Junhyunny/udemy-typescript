// TypeScript에서 새로 생긴 타입
// 아직 어떤 타입일지 모르기 때문에 unknown 타입이다.
let userInput: unknown;
let userName: string;
let userInputAny: any;

// 숫자나 영문을 할당해도 타입 에러가 발생하지 않는다.
userInput = 5;
userInput = "Max";

// 어떤 값을 할당해도 컴파일 에러가 나지 않는 점은 any 타입과 비슷하지만, 다르다.
// 컴파일 에러 - 특정 타입을 가진 변수에 값 unknown 타입 값 할당이 불가능하다.
// userName = userInput;

// 컴파일 에러가 발생하지 않는다.
// unknown 타입인 경우 어떤 값인지 모르기 때문에 컴파일러가 엄격한 타입 확인을 요구한다.
if (typeof userInput === "string") {
    userName = userInput;
}

// any 타입인 경우 컴파일 에러가 발생하지 않는다.
userName = userInputAny;

// 예외를 던지기 때문에 어떤 반환 값도 반환할 수 없으므로 `never` 타입이다.
// `never`는 어떤 값도 반환할 일이 없음을 의미한다.
function generateError(message: string, code: number): never {
    throw {
        message,
        errorCode: code,
    };
}

// 반환 값이 없으며 사용할 수 없다.
const result = generateError("Error Occured", 500);

// generateError 함수에서 예외를 던지기 때문에 해당 로직은 실행되지 않는다.
console.log(result);
