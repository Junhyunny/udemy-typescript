function add(n1: number, n2: number, showFlag: boolean, phrase: string) {
  console.log(typeof n1);
  console.log(typeof n2);
  const result = n1 + n2;
  if (showFlag) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

// working type inference, 타입을 별도로 지정하지 않아도 할당되는 값에 의해 타입이 추론 가능하다.
let number1: number;
number1 = 5;
// compile erro
// number1 = "5";

const number2: number = 2.8;
const printResult = true;
let resultPhrase = "Result is ";
// compile error, resultPhrase variable already has string type
// resultPhrase = 0;

const result = add(number1, number2, printResult, resultPhrase);
console.log(result);
