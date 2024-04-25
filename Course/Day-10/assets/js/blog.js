const dataProject = [];

function addProject(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const upload = document.getElementById("upload").files[0];
  const imageURL = URL.createObjectURL(upload);

  if (title === "") {
    return alert("Please write your title project!");
  } else if (description === "") {
    return alert("Please write your description project!");
  } else if (!imageURL) {
    return alert("Please upload your image project!");
  }

  dataProject.push({
    title: title,
    description: description,
    upload: imageURL,
  });

  console.log(dataProject);

  newData();
}

function newData() {
  document.getElementById("project").innerHTML = "";

  for (let i = 0; i < dataProject.length; i++) {
    const project = dataProject[i];

    document.getElementById("project").innerHTML += `
    <div class="col">
            <div class="card" style="width: 18rem">
            <a href="detail.blog.html" class="text-decoration-none text-black">
              <img
                src="${project.upload}"
                alt="any"
              />
              </a>
              <div class="card-body">
              <a href="detail.blog.html" class="text-decoration-none text-black">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">
                  ${project.description}
                </p>
                </a>
                <a href="#" class="btn btn-warning text-light">Learn More</a>
              </div>
            </div>
          </div>
    `;
  }
}
