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

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";

//
const result = add(number1, number2, printResult, resultPhrase);

const element = document.getElementById("result") as HTMLElement | null;

if (element?.innerText !== undefined) {
    element.innerText = result + "";
}
