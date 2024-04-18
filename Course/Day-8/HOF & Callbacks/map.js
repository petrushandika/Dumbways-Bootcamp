const numbers = [1, 2, 3, 4, 5];

const number = numbers.map(number => number * 2);

console.log(numbers);
console.log(number);

const person = [
    {firstName: "Petrus", lastName: "Handika"},
    {firstName: "Jamal", lastName: "Udin"},
    {firstName: "Didin", lastName: "Lapuk"},
]

const result = person.map((person) => {
    return [person.firstName, person.lastName]
})

console.log(result);