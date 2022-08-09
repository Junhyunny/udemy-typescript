// define return type after function's params
function addSecond(n1: number, n2: number): number {
  return n1 + n2;
}

// undefined is valid value and type in TypeScript

// error when return type is undefined without return keyword
// function printNumber(num: number): undefined {
//   console.log("Result: " + num);
// }

// not error
// function printNumber(num: number): undefined {
//   console.log("Result: " + num);
//   return;
// }

// void return undefined value
function printNumber(num: number): void {
  console.log("Result: " + num);
}

printNumber(addSecond(3, 5));

// all function types are allowed
// let combineVales: Function;

// set parameter type and return type of function
let combineVales: (n1: number, n2: number) => number;
combineVales = addSecond;
// combineVales = 1;
// error - mismatch of param types and return type
// combineVales = printNumber;

printNumber(combineVales(3, 10));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(3, 5, printNumber);

// callback functions can return something, even if the argument on which they're passed does NOT expect a returned value.
addAndHandle(3, 5, (result) => {
  console.log(result);
  return "A";
});
