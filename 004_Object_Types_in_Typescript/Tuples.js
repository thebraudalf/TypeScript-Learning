"use strict";
// using union types
//const user: (string | number)[] = [1, "user"];
Object.defineProperty(exports, "__esModule", { value: true });
// using tuples
var user;
user = ["user", 1, true];
console.log(user);
var newUser = [112, "example@google.com"];
newUser[1] = "user.com";
newUser.push(432);
console.log(newUser);
