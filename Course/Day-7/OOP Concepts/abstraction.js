// Abstraction
class Animal {
  // Instance object
  constructor(name) {
    this.name = name;
  }
  // Abstract method (to be implemented by subclasses)
  makeSound() {
    throw new Error("Method makeSound must be implemented");
  }
}

class Dog extends Animal {
  // Instance object
  constructor(name) {
    // Super method
    super(name);
  }

  // Implementing the abstract method
  makeSound() {
    return "Woff!";
  }
}

// Concrete subclass
class Cat extends Animal {
  // Instance object
  constructor(name) {
    // Super method
    super(name);
  }

  // Implementing the abstract method
  makeSound() {
    return "Meow!";
  }
}

const dog = new Dog("Ujang");
console.log(dog.name);
console.log(dog.makeSound());

const cat = new Cat("kattie");
console.log(cat.name);
console.log(cat.makeSound());