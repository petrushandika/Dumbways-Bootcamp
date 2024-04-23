class Car {
  constructor(name, year, rent) {
    this.name = name;
    this.year = year;
    this.rent = rent;
    this.info = function() {
      return `Mobil: ${this.name}, Tahun: ${this.year}, dan Harga Sewa per Hari: ${this.rent}`;
    }
  }

  // carInfo() {
  //   return `Mobil: ${this.name}, Tahun: ${this.year}, dan Harga Sewa per Hari: ${this.rent}`;
  // } 
}

const carOne = new Car("Mitshubishi Expander", 2024, 500000);
// console.log(carOne.carInfo());
console.log(carOne.info());
