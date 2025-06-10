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
class User {
  readonly city: string = "Jodhpur";
  constructor(
    public email: string,
    public name: string,
    private userId: string
  ) {}
}

const user = new User("u@u.com", "user", "2342");
console.log(user);
