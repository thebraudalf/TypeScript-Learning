// using instanceof narrowing
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
function isFirst(pet) {
    return pet.swim !== undefined;
}
function getFood(pet) {
    if (isFirst(pet)) {
        pet;
        return "fish food";
    }
    else {
        pet;
        return "bord food";
    }
}
