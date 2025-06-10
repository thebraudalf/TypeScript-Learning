"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// number datatype is used to return number specific value
function addTwo(num) {
    return num + 2;
}
console.log(addTwo(5));
// handling multiple return datatypes value via any
function getValue(myVal) {
    if (myVal > 5) {
        return true;
    }
    return "200 Ok";
}
console.log(getValue(3));
// number datatype is used to return number specific value in arrow function
var getHello = function (s) {
    return "Hello".concat(s);
};
// we can check paramter types via context switching
var heros = ["thor", "spiderma", "ironman"];
//const heros = [1, 2, 3];
heros.map(function (hero) {
    return "hero is ".concat(hero);
    //return 1;
});
// logging errors via void return type
function consoleError(errorMsg) {
    console.log(errorMsg);
}
// handling errors via never return type
function handleError(errorMsg) {
    throw new Error(errorMsg);
}
