"use strict";
// type aliases in Typescript allows us to create a new name for a type.
Object.defineProperty(exports, "__esModule", { value: true });
function createUser(user) {
    return { name: user.name, email: user.email, isActive: user.isActive };
}
console.log(createUser({ name: "User", email: "user@gmail.com", isActive: true }));
