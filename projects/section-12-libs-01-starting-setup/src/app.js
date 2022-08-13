"use strict";
exports.__esModule = true;
// typescript don't know third part library
// so you should install @types/lodash
var lodash_1 = require("lodash");
// const _ = require("lodash");
var product_module_1 = require("./product.module");
require("reflect-metadata");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
console.log(lodash_1["default"].shuffle([1, 2, 3, 4, 5]));
console.log(globalVar);
var p1 = new product_module_1.Product("A Book", 302);
console.log(p1.getInformation());
var products = [
    {
        title: "A Carpet",
        price: 29.29
    },
    {
        title: "A book",
        price: 10.99
    },
];
// const loadedProducts = products.map((prod) => {
//     return new Product(prod.title, prod.price);
// });
var loadedProducts = (0, class_transformer_1.plainToClass)(product_module_1.Product, products);
for (var _i = 0, loadedProducts_1 = loadedProducts; _i < loadedProducts_1.length; _i++) {
    var prod = loadedProducts_1[_i];
    console.log(prod.getInformation());
}
var newProd = new product_module_1.Product("", -5.99);
(0, class_validator_1.validate)(class_validator_1.validate).then(function (errors) {
    if (errors.length > 0) {
        console.log("VALIDATION ERRORS");
        console.log(errors);
    }
    else {
        console.log(newProd);
    }
});
