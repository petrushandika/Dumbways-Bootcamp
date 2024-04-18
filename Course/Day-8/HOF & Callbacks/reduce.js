const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(sum);

const people = [
    {name: "Jamal Udin", age: 40},
    {name: "Petrus Handika", age: 22},
    {name: "Umar Syarifudin", age: 20},
]

const result = people.reduce((acc, cur) => {
    return acc.age > cur ? acc.age : cur;
}, 0)

console.log(result);