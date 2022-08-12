// add decorator
// function Logger(constructor: Function) {
//     console.log("Logging...");
//     console.log(constructor);
// }

// add decorator factory
function Logger(logString: string) {
    console.log("LOGGER FACTORY");
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// decorator factory
function withTemlate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY");
    // 제네릭 사용
    return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
        // 신규 생성자를 만듬
        // originalConstructor 클래스를 방지하는 신규 생성자
        // return (and chaining) a class in a class decorator
        // 해당 생성자 데코레이터를 사용하는 클래스를 객체로 만드는 시점에 실행된다.
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("Rendering Template");
                const person = new originalConstructor();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1")!.textContent = person.name;
                }
            }
        };
    };
}

// compile error when experimentalDecorators is false
// experimentalDecorators - Enables experimental support for ES7 decorators
// Decorator runs when class define
// decorator run bottom-up, maybe stack
@Logger("LOGGIN-PERSON")
@withTemlate("<h1>My Person Object</h1>", "app")
class Person {
    name = "Max";

    constructor() {
        console.log("Creating person object...");
    }
}

// Decorator에서 생성자를 반환하는 경우 객체를 생성하지 않는다면 실행되지 않는다.
const person = new Person();
console.log(person);

// property decorator
function Log(target: any, propertyName: string | Symbol) {
    console.log("property decorator");
    console.log(target, propertyName);
}

// access decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("access decorator");
    console.log(target, name, descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("method decorator");
    console.log(target, name, descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("parameter decorator");
    console.log(target, name, position);
}

// decorator는 클래스가 정의될 때 사용된다.
class Product {
    // property decorator
    @Log
    title: string;
    private price: number;

    @Log2
    set setPrice(val: number) {
        if (val > 0) {
            this.price = val;
        } else {
            throw new Error("Invalid price - sholud be positive");
        }
    }

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this.price * (1 + tax);
    }
}

const prod1 = new Product("Book", 19);
const prod2 = new Product("Cook Book", 32);

// auto bind
function Autobind(_1: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Autobind");
    console.log(descriptor);
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = "This works";

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector("button");
// 여기서도 같은 undefined, context binding 안되는 현상
button?.addEventListener("click", p.showMessage);
