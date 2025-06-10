// type aliases in Typescript allows us to create a new name for a type.

type User = {
  name: string;
  email: string;
  isActive: boolean;
};

function createUser(user: User): User {
  return { name: user.name, email: user.email, isActive: user.isActive };
}

console.log(
  createUser({ name: "User", email: "user@gmail.com", isActive: true })
);

export {};
