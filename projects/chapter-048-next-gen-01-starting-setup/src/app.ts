// const 는 다른 값으로 변경 불가능
const userName = "Max";
// userName = "Maximilian";

// var 유효한 scoping 영역이 다르다.
let age = 30;
age = 29;

if (age > 20) {
    // global scoping - if 블럭 바깥에서도 사용 가능
    var isOld = true;
    // local scoping - if 블럭 외부에서 사용 불가능
    // let isOld = true;
}

// console.log(isOld);
// 디폴트 매개변수는 뒤에서부터 사용해야 한다.
// 함수를 호출할 때 전달받은 파라미터를 앞에서부터 사용하기 때문이다.
const add = (a: number, b: number = 10) => a + b;

console.log(add(5));

console.log(add(2, 5));

// 함수 타입을 지정하거나 함수를 정의할 때 파라미터 타입을 함께 정의해야한다.
// 함수 정의할 때 파라미터 타입 함께 지정
const printOutput = (output: string | number) => {
    console.log(output);
};

// 함수 타입 지정
// const printOutput: (output: string | number) => void = (output) => {
//     console.log(output);
// };

printOutput(add(5, 2));

const button = document.querySelector("button");

button?.addEventListener("click", (event: MouseEvent) => {
    const buttonElement = event.target as HTMLButtonElement;
    printOutput(buttonElement.outerText);
});

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

// spread operation ...
// 모든 항목들을 펼쳐서 넣는다.
activeHobbies.push(...hobbies);

console.log(activeHobbies);

const person = {
    firstName: "Max",
    age: 30,
};

// spread operation
// 객체의 key, value 짝을 펼쳐서 넣는다.
const copiedPerson = {
    ...person,
};

console.log(person);

// Rest Parameters
// reduce parameter = function and initial value
const restParameterAdd = (...numbers: number[]) => {
    return numbers.reduce((currentResult, currentValue) => currentResult + currentValue, 0);
};

const addedNumbers = restParameterAdd(5, 10, 2, 3.7);

console.log(addedNumbers);

// array destructuring
// 오리지널 배열은 변경하지 않고 내부 값을 빼내서 사용한다
const [hobby1, hobby2] = hobbies;

console.log(hobbies, hobby1, hobby2);

// object desctructuring
// 오리지널 객체는 변경하지 않고 내부 키 값을 빼내서 사용한다.
// 이름은 그대로 사용하거나 변경해서 사용할 수 있다. - alias 사용
const { firstName, age: personAge } = person;

console.log(person, firstName, personAge);
