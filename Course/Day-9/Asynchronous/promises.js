// Promise => resolved, rejected, and pending
const promise = new Promise((resolved, rejected) => {
  const isPay = true;

  if (isPay) return resolved("You already pay!");

  rejected("You have not pay anymore!");
});

promise
  .then((value) => console.log(value))
  .catch((error) => console.log(error));

const anyPromise = new Promise((resolve, reject) => {
  let isMeet = false;

  if (isMeet) {
    setTimeout(() => {
      resolve("You are already meet some people!");
    }, 2500);
  } else {
    setTimeout(() => {
      reject("You have not meet some people!");
    }, 5000);
  }
});

anyPromise
  .then((response) => {
    console.log(`OK! ${response}`);
  })
  .catch((error) => console.log(`NOT OK! ${error}`));

const film = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        title: "Avengers",
        duration: 150,
        price: 50000,
      },
    ]);
  }, 1000);
});

const weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        country: "Indonesia",
        city: "Jakarta",
        status: "Thunder",
      },
    ]);
  }, 500);
});

film.then((response) => console.log(response));
weather.then((response) => console.log(response));

// Show one array include two array
Promise.all([film, weather]).then((response) => console.log(response));

// Show different array
Promise.all([film, weather]).then((response) => {
  const [film, weather] = response;
  console.log(film);
  console.log(weather);
});
