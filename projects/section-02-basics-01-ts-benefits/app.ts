// union type using |
function combine(
  input1: number | string,
  input2: number | string,
  // resultType: string
  resultType: "as-number" | "as-text"
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    // typo is error cause union elements is literal type
    // resultType === "as-numbe"
    resultType === "as-number"
  ) {
    // without compile error after type checking on runtime
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  // if (resultType === "as-number") {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
  return result;
}

// error cause by literal types of union elements
// const combinedAges = combine(30, 26, "as-number1");
const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedTextAges = combine("30", "26", "as-number");
console.log(combinedTextAges);

const combinedName = combine("Max", "Anna", "as-text");
console.log(combinedName);
