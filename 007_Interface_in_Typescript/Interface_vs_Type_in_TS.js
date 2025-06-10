"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user1 = {
    dbId: 22,
    email: "user1@gmail.com",
    userId: 2211,
    role: "admin",
    startTrail: function () {
        return "Trail started";
    },
    getCoupon: function (name, off) {
        return off;
    },
    githubToken: "Token",
};
user1.email = "user@google.com";
//user1.dbId = 234;
console.log(user1);
console.log(user1.getCoupon("User10", 15));
