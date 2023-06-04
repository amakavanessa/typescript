type numString = number | string;
type convertTo = "as-number" | "as-text"; //this a union type, cos it accepts different types of specified types and it is also an alias cos it is custom

function combine(
  input1: numString,
  input2: numString,
  resultConversion: convertTo
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 10, "as-number");
console.log(combinedAges);
const combineNames = combine("Precious", " Amaka", "as-text");
console.log(combineNames);
const combineWhat = combine("Precious", "1998", "as-text");
console.log(combineWhat);
