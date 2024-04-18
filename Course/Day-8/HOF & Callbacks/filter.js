const numbers = [1, 2, 3, 4, 5];

const number = numbers.filter((number) => number <= 3);
console.log(number);

const songs = [
  { name: "Best Part", duration: 3.55 },
  { name: "Easy On Me", duration: 4.35 },
  { name: "I Love You But I'm Letting Go", duration: 2.45 },
  { name: "Baby", duration: 5.2 },
  { name: "Jagung Rebus", duration: 2.55 },
];

const filteredSong = songs.filter((song) => song.duration >= 3);
filteredSong.forEach((song) => {
  console.log(`${song.name} ${song.duration.toFixed(2)}`);
});

const items = [
  { name: "Asus", price: 15000000 },
  { name: "Xiaomi", price: 2750000 },
  { name: "PS 5", price: 7500000 },
];

const filterredItem = items.filter((item) => item.price < 5000000);
if (filterredItem.length > 0) {
    filterredItem.forEach((item) => {
        console.log(`${item.name}`);
    })
} else {
    console.log(`Stock item price up to 5000000 is sold!`);
}

console.log(filterredItem);