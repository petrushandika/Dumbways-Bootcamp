function eCommerce() {
  const limitDiscount = 500000;
  const discount = 0.10;

  const totalShopping = parseInt(prompt("Masukkan total belanjaan:"));

  if (isNaN(totalShopping)) {
    alert(`Input tidak valid!`);
  }

  let totalDiscount = totalShopping;

  if (totalShopping > limitDiscount) {
    const discountResult = totalShopping * discount;
    totalDiscount = totalShopping - discountResult;
  }

  return totalDiscount;
}

const result = eCommerce();

if (result) {
  alert(`Total belanjaan dengan diskon: Rp.${result}`);
}
