class Person {
    // Instance Object
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.info = function() {
            return `Name: ${this.firstName} ${this.lastName}, Age: ${this.age}`;
        }
    }
    // Method
    greet() {
        return `Hello there ${this.firstName} ${this.lastName}`;
    }
}

const person = new Person("Petrus", "Handika", 22);
console.log(person.info());
console.log(person.greet());