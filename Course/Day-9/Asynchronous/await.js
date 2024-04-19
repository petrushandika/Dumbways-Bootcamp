const promise = new Promise((resolved, rejected) => {
  const isPay = true;

  if (isPay) return resolved("You already pay!");

  rejected("You have not pay anymore!");
});

(async () => {
  try {
    const response = await promise;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
