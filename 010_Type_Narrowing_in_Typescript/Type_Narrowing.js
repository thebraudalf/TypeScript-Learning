// Type Guards are a way to narrow down the type of var. This is useful when you want to do something different depending on the type of a var.
function detectType(val) {
    if (typeof val === "string") {
        return val.toLocaleLowerCase();
    }
    return val + 3;
}
function provideId(id) {
    if (!id) {
        console.log("Please provide ID");
        return;
    }
    id.toLowerCase();
}
function printAll(strs) {
    if (strs && typeof strs === "object") {
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var s = strs_1[_i];
            console.log(s);
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
}
printAll(""); // Handling null case
printAll("This is string."); // Handling string case
