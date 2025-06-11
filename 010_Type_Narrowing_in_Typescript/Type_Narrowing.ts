// Type Guards are a way to narrow down the type of var. This is useful when you want to do something different depending on the type of a var.

function detectType(val: string | number) {
  if (typeof val === "string") {
    return val.toLocaleLowerCase();
  }
  return val + 3;
}

function provideId(id: string | null) {
  if (!id) {
    console.log("Please provide ID");
    return;
  }
  id.toLowerCase();
}

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

printAll(""); // Handling null case
printAll("This is string."); // Handling string case
