const User = {
  name: "User",
  email: "user@gmail.com",
  isActive: false,
};

function createUser({ name: string, isPaid: boolean = false }) {}

//createUser({ name: "User", isPaid: false });
let newUser = { name: "User", isPaid: false, email: "user@gmail.com" };
console.log(createUser(newUser));

function createCourse(): { name: string; price: number } {
  return { name: "reactJs", price: 399 };
}
console.log(createCourse());

export {};
