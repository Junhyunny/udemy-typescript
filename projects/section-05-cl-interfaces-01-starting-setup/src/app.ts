// 인터페이스는 JavaScript 컴파일하면 아무런 결과가 나오지 않는다. 오직 TypeScript에서만 사용한다.
// 인터페이스를 함수 타입으로 사용하고 싶다면 함수를 하나만 선언한다.
interface AddFn {
  (a: number, b: number): number;
}

// type AddFn = (a: number, b: number) => number;

let add: AddFn = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  // optional property
  ouptutName?: string;
}

// typescript interface는 properties 변수를 가질 수 있지만, 값을 줄 수는 없다
interface Greetable extends Named {
  // return type 필수
  greet(phrase: string): void;
}

// type Greetable = {
//   readonly name: string;

//   // return type 필수
//   greet(phrase: string): void;
// };

// 리터럴 방식으로 객체 생성
let user1: Greetable = {
  name: "Junhyunny",
  greet(phrase: string): void {
    console.log(`${phrase}. I'm ${this.name}`);
  },
};

user1.greet("Hi");

// interface는 강제로 필요한 함수와 변수를 선언하도록 만든다.
class Person implements Greetable {
  name?: string;
  age: number;

  constructor(name?: string, age?: number) {
    this.name = name;
    if (age) {
      this.age = age;
    } else {
      this.age = 30;
    }
  }

  greet(phrase: string): void {
    console.log(`${phrase}. I'm ${this.name}`);
  }
}

user1 = new Person("Max", 33);
const user2: Greetable = new Person("Junhyunny", 32);

user1.greet("Hola");
user2.greet("Hello");

// 클래스는 한 개만 상속 가능
// 인터페이스는 여러 개 구현 가능
