// Generics

// using generics with arr
const score: Array<number> = [];
const names: Array<string> = [];

// using genrics with function

function identityOne(val: boolean | number): boolean | number {
  return val;
}
function identityTwo(val: any): any {
  return val;
}

// Here we can pass any type wheather it's string, number and boolean
// Old way
function identityThree<Type>(val: Type): Type {
  return val;
}
identityThree(true);


// Here we using generics on functions with interface
// New way
function identityFour<T>(val: T): T {
  return val;
}

interface Bottle {
  brand: string;
  type: number;
}

console.log(identityFour<Bottle>({ brand: "UserBrand", type: 3 }));
