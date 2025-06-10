"use strict";
// interface in typescript provide a way to define a contract for a type, which includes a set of properties,methods and events. It's used to enforce a structure  for an object, class, or func args.
Object.defineProperty(exports, "__esModule", { value: true });
var user1 = {
    dbId: 22,
    email: "user1@gmail.com",
    userId: 2211,
    startTrail: function () {
        return "Trail started";
    },
    getCoupon: function (name, off) {
        return 10;
    },
};
user1.email = "user@google.com";
//user1.dbId = 234;
console.log(user1);
