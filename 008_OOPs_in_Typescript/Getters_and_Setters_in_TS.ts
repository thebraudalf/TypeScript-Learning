class User {
  private _courseCount = 1;

  readonly city: string = "Jodhpur";
  constructor(public email: string, public name: string) {}

  get getAppleEmail(): string {
    return `apple${this.email}`;
  }

  private deleteToken() {
    console.log("Token deleted.");
  }

  public get courseCount(): number {
    return this._courseCount;
  }

  set courseCount(courseNum) {
    if (courseNum <= 1) {
      throw new Error("Course count should be more than 1");
    }
    this._courseCount = courseNum;
  }
}

const user = new User("u@h.com", "user");
// deleteToken property is private and only accessible within class
//user.deleteToken()

user.courseCount = 5;
console.log(user.getAppleEmail);
console.log(user);
