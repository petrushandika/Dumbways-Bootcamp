// Inheritance
class Animal {
  // Instance object
  constructor(name) {
    this.name = name;
  }
  // Method
  expression() {
    return `Unknown Expression`;
  }
}

class Dog extends Animal {
  // Instance object
  constructor(name) {
    // Super method
    super(name)
  }
  
  expression() {
    return `Woff!`
  }
}

const animal = new Animal("Akbar");
console.log(animal.name);
console.log(animal.expression());

// Inheritance
class Employee {
  // Instance object
  constructor(firstName, lastName, job) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.job = job;
  }
  // Method
  info() {
    return `Name: ${this.firstName} ${this.lastName}, Job: ${this.job}`;
  }
  // Method
  greet(username) {
    return `Hello there ${username}, Your name is ${this.firstName} ${this.lastName} and Your Job is ${this.job}`;
  }

  // Method show Manager info
  managerInfo(manager) {
    if (manager) {
      return `Your Manager's name is ${manager.firstName} ${manager.lastName}`;
    } else {
      return `You don't have a manager assigned yet`;
    }
  }
}

class Manager extends Employee {
  // Instance object
  constructor(firstName, lastName, department) {
    // Super method
    super(firstName, lastName, "Manager");
    this.department = department;
  }
  // Method
  info() {
    return `Name: ${this.firstName} ${this.lastName}, Department: ${this.department}`;
  }
  // Method
  greet(username) {
    return `Hello there ${username}, Your name is ${this.firstName} ${this.lastName} and Your Department is ${this.department}`;
  }
  // Method show Employee info
  employeeInfo(employee) {
    return `Your Employee name is ${employee.firstName} ${employee.lastName}`;
  }
}

const employeeOne = new Employee("Jamal", "Udin", "Programmer");
const employeeTwo = new Employee("Madison", "Corner", "Staff Administration");
const manager = new Manager("Petrus", "Handika", "Head of IT");

console.log(manager.employeeInfo(employeeOne));
console.log(manager.employeeInfo(employeeTwo));
console.log(employeeOne.managerInfo(manager));