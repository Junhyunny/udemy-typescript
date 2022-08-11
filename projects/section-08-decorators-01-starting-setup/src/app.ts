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
    return function (constructor: any) {
        console.log(template);
        console.log(hookId);
        const person = new constructor();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = person.name;
        }
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
