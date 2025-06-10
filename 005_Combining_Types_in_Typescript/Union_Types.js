"use strict";
// union types
Object.defineProperty(exports, "__esModule", { value: true });
// using union types in var
var score = 33;
score = 44;
score = "55";
// using union types in objects
var user = { name: "User", id: 1343 };
//
user = { username: "newUser", id: 1347 };
// using union types in functions
function getDbId(id) {
    if (typeof id === "string") {
        return id.toLowerCase();
    }
    return id;
}
console.log(getDbId(3));
console.log(getDbId("4323"));
// using union types in arrays
var data = [1, 2, 3, "4", true];
// using union types as values
var seatAllotment;
seatAllotment = "aisle";
seatAllotment = "middle";
