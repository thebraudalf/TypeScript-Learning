// using generics in function array
function getSearchProducts<T>(products: T[]): T {
  const Index = 3;
  return products[Index];
}

// using generics in arrow function array
const getMoreSearchProducts = <T,>(products: T[]): T => {
  const Index = 4;
  return products[Index];
};
console.log(getMoreSearchProducts([1, 2, 3, 4, 5])) // 5

