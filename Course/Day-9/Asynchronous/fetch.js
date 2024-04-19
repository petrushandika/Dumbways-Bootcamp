const btn = document.querySelector(".btn");
btn.addEventListener("click", makeRequest);

function makeRequest() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((data) => {
    //   document.querySelector(".id").innerHTML = data.id;
    //   document.querySelector(".title").innerHTML = data.title;
    //   document.querySelector(".body").innerHTML = data.body;
    let output = document.querySelector(".all-posts")
    data.forEach(element => {
        output.innerHTML += `
        <div> (ID): ${element.id} </div>
        <div> (Title): ${element.title} </div>
        <div> (Body): ${element.body} </div>
        `
    })
    })
    .catch((error) => console.error(error));
}