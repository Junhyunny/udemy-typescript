type Admin = {
    name: string;
    privilages: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// combining types, interface인 경우에도 합성을 사용할 수 있다.
type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
    name: "Max",
    privilages: ["create-server"],
    startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function overload, typescript merges
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    // type guard
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result1 = add(1, 5);
const result2 = add("Max", " Schwarz");
result2.split(" ");

// optional chaining
const fetchedUserData = {
    id: "u1",
    name: "max",
    job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title);

const userInput = null;

// const storedData = userInput || "DEFAULT";
// nullish coalescing
const storedData = userInput ?? "DEFAULT";

console.log(storedData);

type UnkownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnkownEmployee) {
    console.log("Name: " + emp.name);
    // JavaScript가 모르는 타입은 typeof를 적용할 수 없다
    if ("privilages" in emp) {
        console.log("privilages: " + emp.privilages);
    }
    if ("startDate" in emp) {
        console.log("startDate: " + emp.startDate);
    }
}

printEmployeeInformation(el);
printEmployeeInformation({ name: "Max", privilages: ["hello", "world"] });

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
        console.log("Loading cargo..." + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if ("loadCargo" in vehicle) {
        vehicle.loadCargo(1000);
    }
    // JavaScript 기능
    // 클래스는 사용 가능, 인터페이스는 사용 불가능, 인터페이스는 컴파일 시 아무런 것도 없기 떄문이다.
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(2000);
    }
}

useVehicle(v1);
useVehicle(v2);

// descriminated unions by using liternal type
interface Bird {
    type: "bird"; // literal type assignment
    flyingSpeed: number;
}

interface Horse {
    type: "horse"; // literal type
    runningSpeed: number;
}

type Animal = Bird | Horse;

function monveAnimal(animal: Animal) {
    switch (animal.type) {
        case "bird":
            console.log("Moving with speed: " + animal.flyingSpeed);
            break;
        case "horse":
            console.log("Moving with speed: " + animal.runningSpeed);
            break;
    }
}

monveAnimal({ type: "bird", flyingSpeed: 300 });

// type casting

const paragraph = document.querySelector("p");
const idParagraph = document.getElementById("message-output");
// casting version 1
// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// );

// casting version 2, type casting을 하면 optional 처리가 필요 없다
const userInputElement = document.getElementById("user-input") as HTMLInputElement;

userInputElement.value = "Hi there!";

// index properties
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: "Not a valid Email",
    userName: "Must start with a capital character",
};
