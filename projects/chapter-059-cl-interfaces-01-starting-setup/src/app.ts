// TypeScript에서만 존재한다.
// Interface는 컴파일하면 아무 값도 존재하지 않는다.
// Type check - 필요한 값, 함수들이 있는지 확인한다.
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}

// interface 를 타입으로 사용한다.
let user1: Person = {
    name: "Jun",
    age: 33,
    greet(phrase: string) {
        console.log(phrase + " " + this.name);
    },
};

user1.greet("Hello there. I'm ");

// public, private 같은 접근 제어자는 인터페이스에서 사용 불가능
// readonly는 가능하다.
// ? 옵셔널(optional) 키워드 - 필수로 값을 가질 필요는 없다.
// null이나 undefined일 확률이 있으므로 반드시 유효성 확인을 수행해야한다.
interface Named {
    readonly name: string;
    outputName?: string;
}

// 인터페이스는 타입에 비해 명확하다.
// 반드시 구현해야 하는 기능과 필드를 명시한다.
// 추상 클래스와 다르게 구현체 코드는 존재하지 않는다.

// 인터페이스 확장은 extends 키워드를 통해 가능하다.
interface Greetable extends Named {
    greet(phrase: string): void;
}

// 인터페이스를 확장한다.
class Man implements Greetable {
    name: string;
    outputName?: string;

    constructor(name: string, outputName?: string) {
        this.name = name;
        this.outputName = outputName;
    }

    greet(phrase: string): void {
        console.log(phrase + " " + this.name + " " + this.outputName);
    }
}

const user2: Greetable = new Man("Jua", "Kang");

// 컴파일 에러 - readonly 속성은 변경할 수 없다
// user2.name = "Jun";

user2.greet("Hello there. I'm ");

// type을 이용한 함수 모습 지정
type addFunction = (a: number, b: number) => number;

const add: addFunction = (n1: number, n2: number) => {
    return n1 + n2;
};

// 인터페이스를 이용한 함수 모습 지정
interface AddInterface {
    (a: number, b: number): number;
}

const addInstance: AddInterface = (n1: number, n2: number) => {
    return n1 + n2;
};

console.log(add(5, 3));
console.log(addInstance(5, 3));
