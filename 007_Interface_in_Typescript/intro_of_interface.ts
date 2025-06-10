// interface in typescript provide a way to define a contract for a type, which includes a set of properties,methods and events. It's used to enforce a structure  for an object, class, or func args.

interface User {
  readonly dbId: number;
  email: string;
  userId: number;
  googleId?: string;
  // Two ways to define func
  /* 1. */ //startTrail: () => string;
  /* 2. */ startTrail(): string;

  getCoupon(couponName: string, value: number): number;
}

const user1: User = {
  dbId: 22,
  email: "user1@gmail.com",
  userId: 2211,
  startTrail: () => {
    return "Trail started";
  },
  getCoupon: (name: "User10", off: 10) => {
    return 10;
  },
};
user1.email = "user@google.com";
//user1.dbId = 234;
console.log(user1);

export {};
