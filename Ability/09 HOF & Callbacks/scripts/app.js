const fruitType = (fruits, callback) => {
  const group = {};

  fruits.forEach((fruit) => {
    const key = callback(fruit);

    if (!group[key]) {
      group[key] = [];
    }

    group[key].push(fruit);
  });

  return group;
};

const fruits = [
  { name: 'Apple', type: 'Pome' },
  { name: 'Pear', type: 'Pome' },
  { name: 'Orange', type: 'Citrus' },
  { name: 'Lemon', type: 'Citrus' },
  { name: 'Banana', type: 'Berry' },
  { name: 'Strawberry', type: 'Berry' },
];

const groupType = (fruit) => fruit.type;

const groupFruits = fruitType(fruits, groupType);

console.log(groupFruits);
