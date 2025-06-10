// using readonly through this we cannot change readonly property
// also using optional properties
type User = {
  readonly _id: string;
  name: string;
  email: string;
  isActive: boolean;
  creditCardDetails?: number;
};

let newUser: User = {
  _id: "12345",
  name: "User",
  email: "user@email.com",
  isActive: false,
};
console.log(newUser);

newUser.name = "NewUser";

// we cannot change the _id property
//newUser._id = "343423";

console.log(newUser);

// we can add multiple types to create another type with '&' operator
type cardNumber = {
  cardNumber: string;
};

type cardDate = {
  cardDate: string;
};

type cardDetails = cardNumber &
  cardDate & {
    cvv: number;
  };
