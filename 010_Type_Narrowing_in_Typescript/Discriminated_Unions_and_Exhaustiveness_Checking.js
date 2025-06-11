// Discriminated Union in TS is a pattern that allows you to define a type that can represent several different possibilities or varients.
// Here we can get error because of new interface
//type Shape = Circle | Square | Rectangle | Triangle;
function getTrueShape(shape) {
    if (shape.kind === "circle") {
        return Math.PI * Math.pow(shape.radius, 2);
    }
    else if (shape.kind === "square") {
        return shape.side * shape.side;
    }
    return shape.length * shape.width;
}
// Exhaustiveness checking
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return shape.side * shape.side;
        case "rectangle":
            return shape.length * shape.width;
        default:
            var _defaultForShape = shape;
            return _defaultForShape;
    }
}
