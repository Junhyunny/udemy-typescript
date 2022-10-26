// 객체에 타입을 구체적으로 지정하는 방법, 구조체를 선언한다.
// 좋은 플랙티스는 아니다.
// const person: {
//     name: string;
//     age: number;
// } = {
//     name: "Maximilian",
//     age: 30,
// };

// 타입을 단순하게 object 타입으로 지정하는 방법
// 객체 안에 어떤 값이 들어 있는지 모르기 때문에 IDE의 도움을 받을 수 없다.
// const person: object = {
//     name: "Maximilian",
//     age: 30,
// };

const person = {
    name: "Maximilian",
    age: 30,
};

console.log(person);
