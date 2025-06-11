// using instanceof narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// using type predicates
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFirst(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getFood(pet: Fish | Bird) {
  if (isFirst(pet)) {
    pet;
    return "fish food";
  } else {
    pet;
    return "bord food";
  }
}
