// function overloading in typescript allows multiple functions with the same name but with different parameters to be defined.

function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  return a + b;
}

console.log(add(1, 2)); // 3
console.log(add("Hello,", " User")); // Hello, User
