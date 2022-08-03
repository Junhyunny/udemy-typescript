// var Role;
// (function (Role) {
//     Role["ADMIN"] = "ADMIN";
//     Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
//     Role["AUTHOR"] = "AUTHOR";
// })(Role || (Role = {}));
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR = "AUTHOR",
}

// var Role;
// (function (Role) {
//     Role[Role["ADMIN"] = 0] = "ADMIN";
//     Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
//     Role[Role["AUTHOR"] = 2] = "AUTHOR";
// })(Role || (Role = {}));
// enum Role {
//   ADMIN,
//   READ_ONLY,
//   AUTHOR,
// }

// automatically type inferrence
const person = {
  name: "Junhyunny",
  age: 30,
  hobbies: ["Sprots", "Cooking"],
  role: [2, "author"],
  auth: Role.AUTHOR,
};

// object - generic object type
// const person: object = {
//   name: "Junhyunny",
//   age: 30,
// };

// cumstom object type
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Junhyunny",
//   age: 30,
//   hobbies: ["Sprots", "Cooking"],
//   role: [2, "author"],
// };
// error
// person.role[1] = 10;
// person.role = [];
// person.role = [0, "hello", "world"];

console.log(person);
// object type에는 name 값이 없으므로 컴파일 에러가 발생
// custom type을 지정하여 name이 있는 것을 확인 가능
console.log(person.name);
// console.log(person.nickName);

let favoriteActivities: string[];
// flexible any type
// let favoriteActivities: any[];

// error
// favoriteActivities = "Sports";

// error
// favoriteActivities = ["Sports", 1];

favoriteActivities = ["Sports"];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());

  // error cause TypeScript knwows that hobby is strong
  // console.log(hobby.map());
}

console.log(person.role);

person.role.push("admin");
console.log(person.role);

person.role[1] = 10;
console.log(person.role);

if (person.auth === Role.AUTHOR) {
  console.log("is author", person.auth);
}
