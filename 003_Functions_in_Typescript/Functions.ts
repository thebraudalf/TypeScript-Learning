// passing only number datatype params
function addTwo(num: number) {
  return num + 2;
}
console.log(addTwo(5));

// passing only string datatype params
function getUpper(val: string) {
  return val.toUpperCase();
}
console.log(getUpper("User"));

// passing multiple datatypes params
function signUpUser(
  name: string,
  email: string,
  password: string,
  isPaid: boolean
) {}
console.log(signUpUser("User", "User@gmail.com", "User@1234", false));

// passing multiple datatypes params in arrow function
let loginUser = (name: string, email: string, isPaid: boolean = false) => {};
console.log(loginUser("User", "User@gmail.com", false));

export {};
