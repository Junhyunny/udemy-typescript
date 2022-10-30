type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// combine types - intersection 사용
type ElevatedEmployee = Admin & Employee;

const emp_1: ElevatedEmployee = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};

console.log(emp_1);

// combine types - union 사용
// 문자열이거나 숫자
type Combinable = string | number;
// 숫자거나 불린
type Numeric = number | boolean;

// intersection 사용으로 숫자만 허용
type Universal = Combinable & Numeric;

let value: Universal;
// 컴파일 에러 - Combinable 타입과 Numeric 타입을 모두 만족하는 타입인 number만 가능
// value = "number";
// value = true;
value = 3;

// function overloading
// 재정의하고 싶은 함수 위에 같은 이름의 다른 파라미터를 받는 함수를 정의한다.
// function add(a: number): number; - 컴파일 에러, b를 옵셔널로 처리하면 컴파일 에러가 안난다.
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    // type guard - 실 객체가 여러 종류일 수 있는 경우 런타임 에러를 방지하기 위한 타입 확인 코드
    // type guard - union 된 타입으로 여러 형태를 가질 수 있을 때 값의 타입을 확인하는 코드
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add("Max", "Schwarz");

console.log(result.split(" "));

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    // Name은 공통 분모이므로 사용 가능
    console.log("Name - " + emp.name);
    // type인 경우 typeof를 사용하지 못하므로 in 키워드를 사용하여 타입을 확인한다. - Type Guard
    if ("privileges" in emp) {
        // UnknownEmployee 타입 변수의 실제 객체가 Admin인 경우 privileges 필드 사용 가능
        console.log("privileges - " + emp.privileges);
    }
    // type인 경우 typeof를 사용하지 못하므로 in 키워드를 사용하여 타입을 확인한다. - Type Guard
    if ("startDate" in emp) {
        // UnknownEmployee 타입 변수의 실제 객체가 Employee인 경우 startDate 필드 사용 가능
        console.log("startDate - " + emp.startDate);
    }
}

printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
    drive() {
        console.log("Driving...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...");
    }

    loadCargo(amount: number) {
        console.log("Loading cargo ... " + amount);
    }
}

// union type
type Vehicle = Car | Truck;

const veh_1 = new Car();
const veh_2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // 메소드가 존재하는지 확인하는 타입 가드
    // if ("loadCargo" in vehicle) {
    // 생성자가 있는 클래스의 경우 instanceof 키워드를 사용한 객체 타입 가드
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(veh_1);
useVehicle(veh_2);

interface Bird {
    // one common property
    type: "bird"; // literal type
    flyingSpeed: number;
}

interface Horse {
    // one common property
    type: "horse"; // literal type
    runningSpeed: number;
}

// union 타입으로 합치는 경우 타입 확인을 위해 공통 항목을 만든다.
// 공통 항목의 타입을 리터럴 타입으로 지정하여 해당 객체를 특정 짓는다.
// 해당 객체에 들어갈 프로퍼티들을 TypeScript 컴파일러가 특정 지을 수 있다.
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
        default:
            return;
    }
    console.log("Moving with speed " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// element 타입을 지정하는 경우 함수 리턴 타입이 HTMLParagraphElement | null
// 어떤 엘리먼트 타입인지 특정 짓는다.
// const paragraph = document.querySelector("p");

// ID로 찾는 경우 함수 리턴 타입이 HTMLElement | null
// 어떤 엘리먼트 타입인지 특정 짓지 못한다.
const paragraph = document.getElementById("message-output");

// 타입 캐스팅 방법 - 1
// const userInputElement = <HTMLInputElement>document.getElementById("user-input");

// 타입 캐스팅 방법 - 2
const userInputElement = document.getElementById("user-input") as HTMLInputElement | null;

if (userInputElement) {
    userInputElement.value = "Hi there!";
}

// flexible properties 사용하기
// 다음 같은 객체를 만들고 싶지만, 어떤 키 값이 들어올지 미정이다.
// {email: 'Not a valid email', username: 'Must start with a character'}

// 키와 값의 타입만 명확히 지정하고 싶은 경우 사용한다.
interface ErrorContainer {
    // index types
    // key 값에 어떤 값이 들어와도 상관 없지만 string 타입이어야 한다.
    // value 값에 어떤 값이 들어와도 상관 없지만 string 타입이어야 한다.
    [prop: string]: string;
}

let errorContainer: ErrorContainer = {
    // 컴파일 에러
    // email: 1,
    email: "Not a valid email",
    username: "Must start with a character",
};

console.log(errorContainer);

// optional chaining
// 해당 데이터를 백엔드 서비스로부터 전달 받았다고 가정해보자.
// 어떤 이유에 의해 job 데이터가 오지 않을 수 있다.
const fetchedUserData = {
    id: "u1",
    name: "Max",
    job: { title: "CEO", description: "My own company" },
};

// 데이터 존재 여부를 확인하기 위한 코드를 추가하면서 너무 코드가 길어지고 복잡해진다.
console.log(fetchedUserData && fetchedUserData.job && fetchedUserData.job.title);
// 이를 해결하기 위해 optional(?) chaining을 사용하자.
console.log(fetchedUserData?.job?.title);

// nullish coalescing
// 빈 문자열은 falsy
const userInput = "";

// || 연산자는 왼쪽이 falsy 값인 경우에 오른쪽 값을 선택한다.
// const storedData = userInput || "DEFAULT";

// nullish coalescing - null 이거나 undefined 인 경우에만 대체 값을 반환한다.
// 왼쪽 값이 falsy 값인 빈 문자열(""), 0(숫자)이더라도 해당 값을 그대로 사용한다.
const storedData = userInput ?? "DEFAULT";

console.log(storedData);
