const student = [
  {
    name: "Sistem Operasi",
    sks: 3,
    grade: "A",
  },
  {
    name: "Sistem Basis Data",
    sks: 3,
    grade: "A",
  },
  {
    name: "Matematika Sistem Informasi",
    sks: 2,
    grade: "B",
  },
  {
    name: "Sistem Informasi Manajemen",
    sks: 1,
    grade: "A",
  },
];

student.forEach((subject) => {
    console.log(`Nama Mata Kuliah: ${subject.name}`);
    console.log(`Jumlah SKS: ${subject.sks}`);
    console.log(`Nilai: ${subject.grade}`);
})
