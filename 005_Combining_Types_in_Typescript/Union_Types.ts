// union types

// using union types in var
let score: number | string | boolean = 33;
score = 44;
score = "55";

// using union types in type aliases
type User = {
  name: string;
  id: number;
};

type Admin = {
  username: string;
  id: number;
};

// using union types in objects
let user: User | Admin = { name: "User", id: 1343 };
user = { username: "newUser", id: 1347 };

// using union types in functions
function getDbId(id: number | string) {
  if (typeof id === "string") {
    return id.toLowerCase();
  }
  return id;
}
console.log(getDbId(3));
console.log(getDbId("4323"));

// using union types in arrays
const data: (number | string | boolean)[] = [1, 2, 3, "4", true];

// using union types as values
let seatAllotment: "aisle" | "middle" | "window";
seatAllotment = "aisle";
seatAllotment = "middle";

export {};
