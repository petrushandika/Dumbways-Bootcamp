class Animal {
  // Instance object
  constructor(name) {
    this.name = name;
  }

  // Overriding method
  makeSound() {
    return `Unkwown Sound!`;
  }
}

class Dog extends Animal {
  // Super method
  constructor(name) {
    super(name);
  }

  // Overriding method
  makeSound() {
    return `Woff!`;
  }
}

class Cat extends Animal {
  // Super method
  constructor(name) {
    super(name);
  }

  // Overriding method
  makeSound() {
    return `Meow!`;
  }
}

function animalInfo(animal) {
  console.log(`Name: ${animal.name}`);
  console.log(`Sound: ${animal.makeSound()}`);
}

const genericAnimal = new Animal("Akbar");
animalInfo(genericAnimal);

const dog = new Dog("Jamal");
animalInfo(dog);

const cat = new Cat("Udin");
animalInfo(cat);
