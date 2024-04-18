const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number, index) => {
  numbers[index] = number * 2;
});

console.log(numbers);

const names = ["jamal", "ola", "michael", "ridho"];
names.forEach((word, index, arr) => {
  arr[index] = word[0].toUpperCase() + word.substring(1);
});

console.log(names);

let newNumbers = [1, 2, 3, 4, 5];
let sum = 0;
function add(number) {
    sum += number
}

newNumbers.forEach(add);
console.log(sum);