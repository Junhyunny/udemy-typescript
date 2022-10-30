// 대표적인 Generic 타입
// Array 타입이며 내부에 string 담는다.
const names: Array<string> = []; // string[] 타입과 100퍼센트 동일하다.

// 다른 Generic 타입 - Promises
const promises: Promise<string> = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("This is done");
    }, 2000);
});

// resolving 되는 데이터 값을 얻을 수 있다.
promises.then((data) => {
    console.log(data.split(" "));
});

const testPromise = Promise.resolve("hello world");

testPromise.then((data) => {
    console.log(data.split(" "));
});

// 타입 constraints - Generic 타입에 제약조건(constraints)를 만들어 의도치 않은 파라미터가 넘어오는 것을 방지한다.
function merge<T extends object, U extends object>(objectA: T, objectB: U): T & U {
    return Object.assign(objectA, objectB);
}

console.log(merge({ A: "A", C: "C" }, { A: 1, B: "B" }));

// TypeScript는 어떤 값이 반환되는지 모른다.
// Generic 함수를 만들어 반환되는 객체의 모습을 미리 예측한다.

// 함수와 파라미터 괄호 사이에 타입을 명시적으로 지정해도 되지만 너무 정보가 많다.
// const obj = merge<{ name: string; hobbies: string[] }, { age: number }>(
//     { name: "Max", hobbies: ["Sports"] },
//     { age: 30 }
// );

const obj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });

// 컴파일 에러 - Generic 타입에 제약조건(constraints)를 만들어 의도치 않은 파라미터가 넘어오는 것을 방지한다.
// const obj = merge({ name: "Max", hobbies: ["Sports"] }, 30);

// 결과 타입이 미리 예측되므로 컴파일 에러가 발생하지 않는다.
obj.name;
obj.hobbies;
obj.age;

interface Lengthy {
    length: number;
}

// 파라미터로 전달 받을 객체의 모습을 미리 지정한다.
// 예측하지 못한 데이터가 넘어오는 것을 방지할 수 있다.
function counterAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements.`;
    }
    return [element, descriptionText];
}

console.log(counterAndDescribe("hello world"));
console.log(counterAndDescribe("Hi there!"));
console.log(counterAndDescribe(["haha this is array", "generic functin test"]));
