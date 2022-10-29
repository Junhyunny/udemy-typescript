// 타입 별칭 정하기 - 커스텀 타입 만들기
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

// | (pipeline)을 사용해서 타입을 두 개 이상 허용한다.
// 파이프라인을 통해 타입을 합쳐서 사용하는 것을 Union 타입이라 한다.
// 타입을 지정할 때 명시적인 값을 지정하는 경우 다른 값을 할당하면 컴파일 에러가 발생한다.
function combine(
    input1: Combinable,
    input2: Combinable,
    // 리터럴(literal) 타입 - 허용된 값만 매개변수로 전달 가능하다.
    resultConversion: ConversionDescriptor
): Combinable {
    let result;
    if (
        (typeof input1 === "number" && typeof input2 === "number") ||
        // 오타를 쓰면 타입스크립트 컴파일러가 잡아준다.
        resultConversion === "as-number"
    ) {
        // 앞에 +를 붙여주면 숫자가 된다
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAge = combine(30, 26, "as-number");
console.log(combinedAge);

const combinedStringAge = combine("30", "26", "as-number");
console.log(combinedStringAge);

const combinedNames = combine("Hello", "World", "as-text");
console.log(combinedNames);
