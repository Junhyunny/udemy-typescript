console.log("hello world...aaa");

const button = document.querySelector("button");

// hello
button?.addEventListener("click", () => {
  console.log("clicked");
});

let number: number;
number = 2;

function clickHandler() {
  console.log("hello click world");
}

function clickHandler1(msg: string) {
  console.log("hello click world" + msg);
}

// noUnusedParameters 에러
// function clickHandler2(msg: string) {
//   console.log("hello click world");
// }

// noImplicitReturns 에러
// function clickHandler3(n1: number, n2: number) {
//   if (n1 + n2 > 0) {
//     return n1 + n2;
//   }
// }

button?.addEventListener("click", clickHandler);
button?.addEventListener("click", clickHandler1.bind(null, "hello"));
