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

// type guard - 실 객체가 여러 종류일 수 있는 경우 런타임 에러를 방지하기 위한 타입 확인 코드
function add(a: Combinable, b: Combinable) {
    // type guard - union 된 타입으로 여러 형태를 가질 수 있을 때 값의 타입을 확인하는 코드
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}

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
