// using generics in function array
function getSearchProducts(products) {
    var Index = 3;
    return products[Index];
}
// using generics in arrow function array
var getMoreSearchProducts = function (products) {
    var Index = 4;
    return products[Index];
};
console.log(getMoreSearchProducts([1, 2, 3, 4, 5]));
