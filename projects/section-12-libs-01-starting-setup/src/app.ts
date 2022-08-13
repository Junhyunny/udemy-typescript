// typescript don't know third part library
// so you should install @types/lodash
import _ from "lodash";
// const _ = require("lodash");

import { Product } from "./product.module";

import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { validate } from "class-validator";

console.log(_.shuffle([1, 2, 3, 4, 5]));

// HTML 파일에 정의한 변수를 가져온다
declare var globalVar: any;
console.log(globalVar);

const p1 = new Product("A Book", 302);
console.log(p1.getInformation());

const products = [
    {
        title: "A Carpet",
        price: 29.29,
    },
    {
        title: "A book",
        price: 10.99,
    },
];

// const loadedProducts = products.map((prod) => {
//     return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}

const newProd = new Product("", -5.99);
validate(newProd).then((errors) => {
    if (errors.length > 0) {
        console.log("VALIDATION ERRORS");
        console.log(errors);
    } else {
        console.log(newProd);
    }
});
