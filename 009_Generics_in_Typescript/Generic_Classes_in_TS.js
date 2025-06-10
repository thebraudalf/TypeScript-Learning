// Generic constraints
function func(valOne, valTwo) {
    return {
        valOne: valOne,
        valTwo: valTwo,
    };
}
// using generics with classes
var Sellable = /** @class */ (function () {
    function Sellable() {
        this.cart = [];
    }
    Sellable.prototype.addToCart = function (product) {
        this.cart.push(product);
    };
    return Sellable;
}());
var sellCourse = new Sellable;
var productArr = { name: "Harry Potter", author: "User", subject: "Fiction" };
sellCourse.addToCart(productArr);
console.log(sellCourse.cart);
