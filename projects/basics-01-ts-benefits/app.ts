// automatically type inferrence
const person = {
  name: "Junhyunny",
  age: 30,
  hobbies: ["Sprots", "Cooking"],
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
// } = {
//   name: "Junhyunny",
//   age: 30,
// };

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
