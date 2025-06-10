"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// passing only number datatype params
function addTwo(num) {
    return num + 2;
}
console.log(addTwo(5));
// passing only string datatype params
function getUpper(val) {
    return val.toUpperCase();
}
console.log(getUpper("User"));
// passing multiple datatypes params
function signUpUser(name, email, password, isPaid) { }
console.log(signUpUser("User", "User@gmail.com", "User@1234", false));
// passing multiple datatypes params in arrow function
var loginUser = function (name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
};
console.log(loginUser("User", "User@gmail.com", false));
