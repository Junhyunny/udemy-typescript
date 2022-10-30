abstract class Department {
    static fiscalYear = 2022;

    // properties
    // vanila JavaScript에서는 private 키워드를 사용하지 않는다.
    // private id: string;
    // private name: string;

    // private 인 경우 자식 클래스에서 보이지 않는다.
    // 자식 클래스가 필드에 접근할 수 있도록 protected 접근 제어자를 사용한다.
    protected employees: string[] = [];

    // 생성자
    // - 생성자 파라미터에 접근 제어자를 함께 선언하면 클래스 속성으로 함께 생성된다.
    // - 별도 초기화 로직이 필요 없다.
    // - 별도 멤버 변수 선언이 필요 없다
    // readonly 키워드
    // - TypeScript에서만 사용 가능
    // - 멤버 변수이며, 변경을 허용하지 않는다.
    // - 다른 메소드에서 해당 필드의 변경을 만들려는 경우 컴파일 에러가 발생한다.
    constructor(protected readonly id: string, protected name: string) {
        // this.id = id;
        // this.name = name;

        // 컴파일 에러 - static 멤버, 메소드는 this 키워드를 통해 접근할 수 없다.
        // this.fiscalYear

        // 클래스를 통해 직접 접근해야 한다.
        console.log("fiscal year - " + Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return { name };
    }

    // this 키워드를 파라미터로 설정할 수 있다.
    // 이 메소드를 호출하는 객체가 해당 클래스의 정보들을 모두 가지고 있지 않은 경우 컴파일 에러를 발생시킨다.
    // describe(this: Department) {
    //     console.log(`Department(${this.id}): ${this.name}`);
    // }

    // 추상 메소드 - abstract 키워드를 통해 정의한다.
    // 내부 구현 코드는 없고 하위 클래스들이 재정의 받아야 한다.
    // 추상 메소드는 추상 클래스 내부에만 존재한다.
    abstract describe(): void;

    addEmployee(employee: string) {
        // etc validation logic in here
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

// static 메소드를 사용한 피고용자 생성
// const employee_1 = Department.createEmployee("Max");
// console.log(employee_1, Department.fiscalYear);

// const accounting = new Department("A-01", "Accounting");
// console.log(accounting);
// accounting.describe();

// 캡슐화 위반 - private 키워드를 통해 캡슐화
// accounting.employees.push("Hello");
// accounting.employees[0] = "World";

// accounting.addEmployee("Max");
// accounting.addEmployee("Jun");
// accounting.addEmployee("Jua");
// accounting.printEmployeeInformation();

// this 키워드 설명
// this 키워드는 메소드를 실행하는 실 객체를 의미한다.
// const accountingCopy = {
//     name: "Human Resources",
//     describe: accounting.describe,
// };

// Haman Resources가 이름으로 출력된다.
// accountingCopy.describe();

// 상속
class InfraDepartment extends Department {
    // 접근 제어자를 통한 필드 생성과 필드 초기화
    constructor(id: string, public admins: string[]) {
        // 부모 클래스 생성자
        super(id, "Infra");
    }

    override describe(): void {
        console.log(`${this.name} Department(${this.id})`);
    }
}

console.log("=============================================");

const infra = new InfraDepartment("IT-01", ["Jun", "Jua"]);
infra.describe();

infra.addEmployee("Max");
infra.addEmployee("Manu");
infra.addEmployee("Jun");
infra.addEmployee("Jua");
infra.printEmployeeInformation();

console.log("=============================================");

// 상속
class AccountingDepartment extends Department {
    private static instance: AccountingDepartment;
    private lastReport: string;

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("A-00", []);
        return this.instance;
    }

    // getter
    // public 접근 제어자가 아닌 경우 이를 사용할 수 있도록 getter 메소드 제공
    get mostRecentReport(): string {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }

    // setter
    // public 접근 제어자가 아닌 경우 이를 변경할 수 있도록 setter 메소드 제공
    set mostRecentReport(report: string) {
        if (!report) {
            throw new Error("Please pass in a valid value");
        }
        this.addReport(report);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[reports.length - 1];
    }

    override describe(): void {
        console.log(`${this.name} Department(${this.id})`);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    // 함수 오버라이딩
    override addEmployee(employee: string): void {
        if (employee === "Max") {
            return;
        }
        this.employees.push(employee);
    }
}

console.log("=============================================");

// singleton pattern 사용
const accountingDept = AccountingDepartment.getInstance();
const accountingDept_2 = AccountingDepartment.getInstance();

console.log(accountingDept == accountingDept_2);

// const accountingDept = new AccountingDepartment("A-01", [
//     "Something went wrong",
//     "TypeScript covers type-safety",
// ]);

// 함수 오버라이딩
accountingDept.describe();

// overriding 한 메소드에 의해 Max는 포함되지 않는다.
accountingDept.addEmployee("Max");
// 나머지 값들은 정상적으로 추가된다.
accountingDept.addEmployee("Manu");
accountingDept.addEmployee("Jun");
accountingDept.addEmployee("Jua");
accountingDept.printEmployeeInformation();

accountingDept.addReport("This is TypeScript Bible");
accountingDept.printReports();

// getter 는 메소드 형태이지만, 함수처럼 호출해서 사용하지 않는다.
console.log(accountingDept.mostRecentReport);

// stter 는 메소드 형태이지만, 함수처럼 호출해서 사용하지 않는다.
accountingDept.mostRecentReport = "Hello World";
console.log(accountingDept.mostRecentReport);

accountingDept.printReports();

console.log("=============================================");
