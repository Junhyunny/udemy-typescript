// Generic Variable
const names: Array<string> = ["Max", "Manuel"]; // same with string[]
// names[0].split(" ");

const promise: Promise<string> = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("This is done!");
    }, 2000);
});

promise.then((data) => {
    console.log(data);
});

// Generic Function
// contraints of generic type
function merge<T extends object, U extends object>(objectA: T, objectB: U) {
    // return { ...objectA, ...objectB };
    // compile error
    return Object.assign(objectA, objectB);
}

const mergedObject = merge<{ name: string; hobbies: string[] }, { age: number }>(
    { name: "Max", hobbies: ["Sports"] },
    { age: 30 }
);
console.log(mergedObject.name);

interface Lengthy {
    length: number;
}

// Tuple
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = `Got 1 element.`;
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements.`;
    }
    return [element, descriptionText];
}

console.log(countAndDescribe("Grammar"));
console.log(countAndDescribe(["Sports", "Cookie"]));

// keyof 키워드를 사용하여 특정 타입의 키로 사용됨을 알려준다.
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

console.log(extractAndConvert({ name: "Max" }, "name"));

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    // 함수에도 따로 타입을 지정 가능
    removeItem(item: T) {
        const index = this.data.indexOf(item);
        if (index === -1) {
            return;
        }
        this.data.splice(index, 1);
    }

    getItems(): T[] {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Junhyunny");
textStorage.addItem("Max");
textStorage.removeItem("Junhyunny");
console.log(textStorage);

// const objectStorage = new DataStorage<object>();
// const maxObject = { name: "Max" };
// objectStorage.addItem(maxObject);
// objectStorage.addItem({ name: "Manu" });
// objectStorage.removeItem(maxObject);

// console.log(objectStorage.getItems());

const numberStorage = new DataStorage<number>();

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal as CourseGoal;
}

const userNames: Readonly<string[]> = ["Max", "Anna"];
// compile error cause Readonly Utility Type is not allow to modify elements
// userNames.push("Manu");
// userNames.pop();

// generic types versus union types
// 제네릭을 안쓰고 union type으로 선언하면 값을 섞어 넣을 수 있게 된다.
// 값을 섞어서 넣지 못하도록 데이터를 각 타입 별 어레이로 주면 값을 추가하거나 삭제하는데 문제가 된다.
// 타입 가드가 필요하다.

// class DataStorage<T extends string | number | boolean> {
//     private data: T[] = [];

//     addItem(item: T) {
//         this.data.push(item);
//     }

//     // 함수에도 따로 타입을 지정 가능
//     removeItem(item: T) {
//         const index = this.data.indexOf(item);
//         if (index === -1) {
//             return;
//         }
//         this.data.splice(index, 1);
//     }

//     getItems(): T[] {
//         return [...this.data];
//     }
// }
