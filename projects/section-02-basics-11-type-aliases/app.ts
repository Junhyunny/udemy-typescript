// unkown is better than any. cause unknown restricts type checking at compile time
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

// error when userInput type is unknown
// userName = userInput;

if (typeof userInput == "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw {
    errorCode: code,
    message,
  };
}

generateError("Hello World", 500);
