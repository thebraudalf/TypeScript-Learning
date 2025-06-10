"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = {
    name: "User",
    email: "user@gmail.com",
    isActive: false,
};
function createUser(_a) {
    var string = _a.name, _b = _a.isPaid, boolean = _b === void 0 ? false : _b;
}
//createUser({ name: "User", isPaid: false });
var newUser = { name: "User", isPaid: false, email: "user@gmail.com" };
console.log(createUser(newUser));
function createCourse() {
    return { name: "reactJs", price: 399 };
}
console.log(createCourse());
