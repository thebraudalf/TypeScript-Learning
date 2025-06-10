var newUser = {
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
