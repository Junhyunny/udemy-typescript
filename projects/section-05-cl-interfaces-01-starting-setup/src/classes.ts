abstract class Department {
  static fiscalYer = 2022;
  // vanila javascript doesn't know about private, public concepts
  //   private id: string;
  //   private name: string; // default is public
  protected employees: string[] = [];

  // shorthand construction and define classifier
  // 변경되지 않는 프로퍼티는 readonly 속성을 준다. - TypeScript 제공
  // 접근 제어자를 붙히면 자동으로 프로퍼티로 정의된다. - TypeScript
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(name: string) {
    return { name };
  }
}

// const department: Department = new Department("department-1", "Department");

// department.describe();
// department.addEmployee("Max");
// department.addEmployee("Manu");

// private properties cannot accessible directly
// department.employees[2] = "Anna";
// department.employees.push("Junhyunny");

// department.printEmployeeInformation();

// const accountingCopy = {
//   name: "copy",
//   describe: department.describe,
// };

// compile error cause accountingCopy is not instance of Department class when not exists name
// accountingCopy.describe();

class ITDepartment extends Department {
  admins: string[];
  // super method for setting parant class
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  override addEmployee(employee: string): void {
    if (employee === "Max") {
      return;
    }
    this.employees.push(employee);
  }

  override describe(this: ITDepartment): void {
    console.log(`IT department (${this.id}, ${this.name})`);
    console.log(this.employees);
    console.log(this.admins);
  }
}

const itDepartment = new ITDepartment("department-2", ["Junhyunny", "Max"]);

itDepartment.addEmployee("Max");
itDepartment.addEmployee("Junhyunny");
itDepartment.printEmployeeInformation();
itDepartment.describe();

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("Not found most recent report");
  }

  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error("Please pass in a valid report.");
    }
    this.addReport(report);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  printReports() {
    console.log(this.reports);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  override describe(this: AccountingDepartment): void {
    console.log(`Accounting department (${this.id}, ${this.name})`);
    console.log(this.employees);
    console.log(this.reports);
    console.log(this.lastReport);
  }
}

const accountDepartment = new AccountingDepartment("department-3", [
  "first report",
]);

accountDepartment.printReports();
console.log(accountDepartment.mostRecentReport);

accountDepartment.mostRecentReport = "second report";
accountDepartment.printReports();
console.log(accountDepartment.mostRecentReport);

accountDepartment.describe();

const employee1 = Department.createEmployee("Max");
console.log(employee1);

class SingleTon {
  private static instance: SingleTon;
  private constructor() {}

  public name: String = "SingleTon Object";

  // modifier 가 static 이 붙은 경우 내부에서 static 멤버는 this 키워드로 접근 가능
  static getInstance() {
    if (SingleTon.instance) {
      return this.instance;
    }
    this.instance = new SingleTon();
    return this.instance;
  }
}

// compile error cause constructor is private
// const singleTon = new SingleTon();
const singleTon = SingleTon.getInstance();
const singleTon2 = SingleTon.getInstance();

console.log(singleTon, singleTon2);
singleTon.name = "Hello World";
console.log(singleTon, singleTon2);
