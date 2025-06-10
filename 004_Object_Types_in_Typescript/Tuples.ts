// using union types
//const user: (string | number)[] = [1, "user"];

// using tuples
let user: [string, number, boolean];
user = ["user", 1, true];
console.log(user); // [ 'user', 1, true ]

//let rgb: [number, number, number] = [255, 123, 122]

// using tuples with types
type User = [number, string];

// we can push or assign new value of any datatype at every position
const newUser: User = [112, "example@google.com"];
newUser[1] = "user.com";
newUser.push(432);
console.log(newUser); // [ 112, 'user.com', 432 ]

export {};
