const cow = [
  [50, 55, 60, 65, 70], // Hari 1
  [55, 60, 65, 70, 75], // Hari 2
  [60, 65, 70, 75, 80], // Hari 3
  [65, 70, 75, 80, 85], // Hari 4
  [70, 75, 80, 85, 90], // Hari 5
  [75, 80, 85, 90, 95], // Hari 6
  [80, 85, 90, 95, 100], // Hari 7
];

let totalWeightPerWeek = 0;
let totalCow = 0;

for (let i = 0; i < cow.length; i++) {
  const totalPerDay = cow[i];
  let totalWeightPerDay = 0;

  for (let j = 0; j < totalPerDay.length; j++) {
    totalWeightPerDay += totalPerDay[j];
  }

  totalWeightPerWeek += totalWeightPerDay;
  totalCow += totalPerDay.length;
}

const averageWeight = totalWeightPerWeek / totalCow;

console.log(`Rata-rata berat badan sapi selama seminggu: ${averageWeight.toFixed(2)} kg`);
