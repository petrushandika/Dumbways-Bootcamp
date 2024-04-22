const cow = [
  [50, 55, 60, 65, 70],
  [55, 60, 65, 70, 75],
  [60, 65, 70, 75, 80],
  [65, 70, 75, 80, 85],
  [70, 75, 80, 85, 90],
  [75, 80, 85, 90, 95],
  [80, 85, 90, 95, 100],
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

console.log(
  `Rata-rata berat badan sapi selama seminggu: ${averageWeight.toFixed(2)} kg`
);
