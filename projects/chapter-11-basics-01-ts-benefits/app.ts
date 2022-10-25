function add(n1: number, n2: number): number {
    // typescript를 사용하면 불필요한 타입 확인 로직
    // if (typeof n1 !== "number" || typeof n2 !== "number") {
    //     throw new Error("incorrect input error");
    // }
    return n1 + n2;
}

const number1 = 5;
const number2 = 2.8;
const result = add(number1, number2);

const element = document.getElementById("result") as HTMLElement | null;

if (element?.innerText !== undefined) {
    element.innerText = result + "";
}
