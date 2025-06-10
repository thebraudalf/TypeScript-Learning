/// Difference 1:
// we can add new or change fields after being created in interface
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

interface User {
  githubToken: string;
}

/// Difference 2:
// extending an interface
interface Admin extends User {
  role: "admin" | "ta" | "learner";
}

const user1: Admin = {
  dbId: 22,
  email: "user1@gmail.com",
  userId: 2211,
  role: "admin",
  startTrail: () => {
    return "Trail started";
  },
  getCoupon: (name: string, off: number) => {
    return off;
  },
  githubToken: "Token",
};
user1.email = "user@google.com";
//user1.dbId = 234;
console.log(user1);
console.log(user1.getCoupon("User10", 15));

/// Difference 1:
// we cannot add new or change fields after being created in type
type newUser = {
  name: string;
};

/*type newUser = {
  startTrail: () => string;
  };*/

/// Difference 2:
// extending a type via intersections
type newUserAgain = newUser & {
  startTrail: () => string;
};

const user2: newUserAgain = {
  name: "User2",
  startTrail: () => "Trail started",
};

export {};
