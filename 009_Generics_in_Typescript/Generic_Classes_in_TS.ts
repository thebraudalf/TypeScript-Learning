interface DB {
  connection: string;
  username: string;
  password: string;
}

// Generic constraints
function func<T, U extends DB>(valOne: T, valTwo: U): object {
  return {
    valOne,
    valTwo,
  };
}
//func(3, {});

interface Quiz {
  name: string;
  type: string;
}

interface Course {
  name: string;
  author: string;
  subject: string;
}

// using generics with classes
class Sellable<T> {
  public cart: T[] = [];

  addToCart(product: T) {
    this.cart.push(product);
  }
}

const sellCourse: Sellable<Course> = new Sellable<Course>;
const productArr = { name: "Harry Potter", author: "User", subject: "Fiction" };
sellCourse.addToCart(productArr)
console.log(sellCourse.cart)
