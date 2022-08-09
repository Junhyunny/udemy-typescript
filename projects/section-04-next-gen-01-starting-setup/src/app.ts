// const userName = "Max";
// let age = 30;
// age = 29;

// var result = "World";

// function add(a: number, b: number) {
//   var result;
//   result = a + b;
//   return result;
// }

// if (age > 20) {
//   var foo = "hello";
//   let bar = "World";
// }

// console.log(result); // World
// console.log(foo); // hello
// console.log(bar); // Uncaught ReferenceError: bar is not defined

// default argument, default 값은 뒤에서부터 주는 것이 좋다.
const add = (a: number, b: number = 1) => a + b;
const printOutput: (a: number | string) => void = (output) => {
  console.log(output);
};
const button = document.querySelector("button");
button?.addEventListener("click", (event) => console.log(event));

printOutput(add(5, 2));
printOutput(add(5));

const hobbies = ["Sports", "Cooking", "Bike", "Runnig"];
const activeHobbies = ["Hiking"];

// ...(three dot)은 spread operator, 해당 객체에 있는 데이터를 모두 하나하나 헤쳐서 만든다.
// 컬렉션인 경우 요소들을 하나씩 분해
// 객체인 경우 프로퍼티 값을 (키, 값) 형태로 하나씩 분해
activeHobbies.push(...hobbies);

const person = {
  firstName: "Max",
  age: 30,
};

const copiedPerson = {
  ...person,
  age: 45,
};

console.log(person);
console.log(copiedPerson);

const add2 = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

printOutput(add2(1, 2, 3, 5, 6, 10, 92.1));

// desctructuring
const [hobby1, hobby2, ...reamainingHobbies] = hobbies;
console.log(hobby1);
console.log(hobby2);
console.log(reamainingHobbies);
console.log(hobbies);

// alias rename
const { firstName: userName, age } = person;
console.log(userName);
console.log(age);
