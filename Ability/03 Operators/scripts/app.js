function damageTotal(attack, defense) {
  let damage = attack - defense;

  if (damage < 0) {
    damage = 0;
  }

  return damage;
}

const damageResult = damageTotal(50, 20);
console.log(`Damage yang diterima oleh karakter ${damageResult}`);
