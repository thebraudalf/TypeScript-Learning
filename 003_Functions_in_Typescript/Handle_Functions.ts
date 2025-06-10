// number datatype is used to return number specific value
function addTwo(num: number): number {
  return num + 2;
}
console.log(addTwo(5));

// handling multiple return datatypes value via any
function getValue(myVal: number): any {
  if (myVal > 5) {
    return true;
  }
  return "200 Ok";
}

console.log(getValue(3));

// number datatype is used to return number specific value in arrow function
const getHello = (s: string): string => {
  return `Hello${s}`;
};

// we can check paramter types via context switching
const heros = ["thor", "spiderma", "ironman"];
//const heros = [1, 2, 3];

heros.map((hero): string => {
  return `hero is ${hero}`;
  //return 1;
});

// logging errors via void return type
function consoleError(errorMsg: string): void {
  console.log(errorMsg);
}

// handling errors via never return type
function handleError(errorMsg: string): never {
  throw new Error(errorMsg);
}

export {};
