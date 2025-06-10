/// Generics in TS are way to write code that can work with multiple data types, instead of being limited to a single data type.
/// Generics allow yo to write functions, classes, and interfaces that take one or more type parameters, which act as placeholders for the actual data types
/// that will be used when the function, class or interface is used.

// using generics with arr
var score = [];
var names = [];
// using genrics with function
function identityOne(val) {
    return val;
}
function identityTwo(val) {
    return val;
}
// Here we can pass any type wheather it's string, number and boolean
function identityThree(val) {
    return val;
}
identityThree(true);
// Here we using generics on functions with interface 
function identityFour(val) {
    return val;
}
console.log(identityFour({ brand: "UserBrand", type: 3 }));
