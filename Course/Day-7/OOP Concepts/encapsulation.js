// Private class field
class Counter {
    // Private variable
    #count = 0;
    // Public methods that can access and modify the private variable
    increment() {
        this.#count++;
    }

    decrement() {
        this.#count--;
    }

    get() {
        return this.#count;
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.get());

counter.decrement();
counter.decrement();
counter.decrement();
counter.decrement();
counter.decrement();
console.log(counter.get());