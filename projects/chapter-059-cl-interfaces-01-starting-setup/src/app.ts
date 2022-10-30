class Department {
    // properties
    // vanila JavaScript에서는 private 키워드를 사용하지 않는다.
    // private id: string;
    // private name: string;
    private employees: string[] = [];

    // 생성자
    // - 생성자 파라미터에 접근 제어자를 함께 선언하면 클래스 속성으로 함께 생성된다.
    // - 별도 초기화 로직이 필요 없다.
    // - 별도 멤버 변수 선언이 필요 없다
    // readonly 키워드
    // - TypeScript에서만 사용 가능
    // - 멤버 변수이며, 변경을 허용하지 않는다.
    // - 다른 메소드에서 해당 필드의 변경을 만들려는 경우 컴파일 에러가 발생한다.
    constructor(private readonly id: string, private name: string) {
        // this.id = id;
        // this.name = name;
    }

    // this 키워드를 파라미터로 설정할 수 있다.
    // 이 메소드를 호출하는 객체가 해당 클래스의 정보들을 모두 가지고 있지 않은 경우 컴파일 에러를 발생시킨다.
    describe(this: Department) {
        console.log(`Department(${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        // etc validation logic in here
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting = new Department("D1", "Accounting");

console.log(accounting);

accounting.describe();

// 캡슐화 위반 - private 키워드를 통해 캡슐화
// accounting.employees.push("Hello");
// accounting.employees[0] = "World";

accounting.addEmployee("Max");
accounting.addEmployee("Jun");
accounting.addEmployee("Jua");

accounting.printEmployeeInformation();

// this 키워드 설명
// this 키워드는 메소드를 실행하는 실 객체를 의미한다.
// const accountingCopy = {
//     name: "Human Resources",
//     describe: accounting.describe,
// };

// Haman Resources가 이름으로 출력된다.
// accountingCopy.describe();
