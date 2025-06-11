// Discriminated Union in TS is a pattern that allows you to define a type that can represent several different possibilities or varients.

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Rectangle {
  kind: "rectangle";
  length: number;
  width: number;
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Rectangle;

// Here we can get error because of new interface
//type Shape = Circle | Square | Rectangle | Triangle;

function getTrueShape(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else if (shape.kind === "square") {
    return shape.side * shape.side;
  }
  return shape.length * shape.width;
}

// Exhaustiveness checking
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
    case "rectangle":
      return shape.length * shape.width;
    default:
      const _defaultForShape: never = shape;
      return _defaultForShape;
  }
}
