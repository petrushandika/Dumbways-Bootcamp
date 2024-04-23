const btn = document.querySelector(".btn");
btn.addEventListener("click", makeRequest);

async function makeRequest() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    let output = document.querySelector(".all-posts");
    data.forEach((element) => {
      output.innerHTML += `
        <div> (ID): ${element.id} </div>
        <div> (Title): ${element.title} </div>
        <div> (Body): ${element.body} </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}
