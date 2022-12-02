// Closures
const buildSum = a => b => a + b;

const addFive = buildSum(5)
console.log(addFive(5)); // 10

//Currying
function sumThreeValues(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
}

console.log(sumThreeValues(1)(2)(3)) // 6

//With arrow function
const sumThreeValues2 = a => b => c => a + b + c;
console.log(sumThreeValues2(1)(2)(3)) // 6