// Old way to use classes
/*class User {
  email: string;
  name: string;
  private city: string = "Jodhpur";
  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}*/
// New way to use classes
var User = /** @class */ (function () {
    function User(email, name, userId) {
        this.email = email;
        this.name = name;
        this.userId = userId;
        this.city = "Jodhpur";
    }
    return User;
}());
var user = new User("u@u.com", "user", "2342");
console.log(user);
