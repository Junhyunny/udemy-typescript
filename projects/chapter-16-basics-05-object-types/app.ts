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

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]; // tuple
// } = {
//     name: "Maximilian",
//     age: 30,
//     hobbies: ["Sports", "Cooking"],
//     // if not assigned type
//     // it would be (string | number) [] - union type
//     role: [2, "author"],
// };

// 기본적으로 별도 값을 설정하지 않으면 자동 증가 숫자로 enum 값이 결정된다.
// 어떠한 값이든 상관 없으므로 필요하다면 값을 할당해서 사용한다.
// 특정 숫자가 지정되고 이 후에 다른 값을 지정하지 않았다면 자동적으로 증가하는 방식이다.
enum Role {
    ADMIN = "ADMIN",
    READ_ONLY = 10,
    AUTHOR,
}

const person = {
    name: "Maximilian",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN,
};

// TypeScript는 push 함수에 대해서 제어하지 못한다.
// person.role.push("admin");

// tuple로 선언하면 두번째 값에 지정된 타입의 값이 들어와야 컴파일 된다.
// person.role[1] = 10;

// push 함수에 의해서 추가되는 것은 감지하지 못하지만,할당하는 시점에는 컴파일 에러가 발생한다.
// person.role = [0, "amdin", "user"];

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

// mixed array는 허용하지 않는다.
// any type으로 우회할 수 있지만, TypeScript의 장점을 버리는 행위이다.
// favoriteActivities = ["Sports", 1];

console.log(person);

// 배열의 타입을 알기 때문에 hobby는 string으로 사용할 수 있고, 자동 완성을 사용 가능하다.
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
