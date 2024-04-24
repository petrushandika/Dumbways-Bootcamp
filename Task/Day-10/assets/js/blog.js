const dataProject = [];

function addProject(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const description = document.getElementById("description").value;
  const language = document.querySelectorAll(".programming");
  const node = document.getElementById("node").checked;
  const react = document.getElementById("react").checked;
  const vue = document.getElementById("vue").checked;
  const golang = document.getElementById("golang").checked;
  const upload = document.getElementById("upload").files[0];
  const imageURL = URL.createObjectURL(upload);

  if (title === "") {
    return alert("Please write your title project!");
  } else if (start === "") {
    return alert("Please choose your start date!");
  } else if (end === "") {
    return alert("Please choose your end date!");
  } else if (description === "") {
    return alert("Please write your description project!");
  } else if (language.length === "") {
    return alert("Please select your programming language project!");
  } else if (!imageURL) {
    return alert("Please upload your image project!");
  }

  if (start > end) {
    alert("The End Date Cannot Be Less Than Start Date");
    return;
  }

  let startDate = start.split("/");
  let endDate = end.split("/");

  let startDatePost = startDate[2] + "-" + startDate[1] + "-" + startDate[0];
  let endDatePost = endDate[2] + "-" + endDate[1] + "-" + endDate[0];

  let newStartDate = new Date(startDatePost);
  let newEndDate = new Date(endDatePost);

  let timeDiff = newEndDate - newStartDate;

  let diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let diffMonths = Math.floor(diffDays / 30.44);
  let diffYears = Math.floor(diffMonths / 12);

  let duration;

  if (diffYears > 0) {
    duration = `${diffYears} Years`;
  } else if (diffMonths > 0) {
    duration = `${diffMonths} Months`;
  } else {
    duration = `${diffDays} Days`;
  }

  dataProject.push({
    title: title,
    startDate: start,
    endDate: end,
    description: description,
    node: node,
    react: react,
    vue: vue,
    golang: golang,
    upload: imageURL,
    duration: duration,
  });

  console.log(dataProject);

  newData();
}

function newData() {
  document.getElementById("project").innerHTML = "";

  for (let i = 0; i < dataProject.length; i++) {
    const project = dataProject[i];

    let nodeImage = "",
      reactImage = "",
      vueImage = "",
      golangImage = "";

    if (project.node == true) {
      nodeImage = '<img src="assets/images/node.svg">';
    }
    if (project.react == true) {
      reactImage = '<img src="assets/images/react.svg">';
    }
    if (project.vue == true) {
      vueImage = '<img src="assets/images/vuejs.svg">';
    }
    if (project.golang == true) {
      golangImage = '<img src="assets/images/golang.svg">';
    }

    document.getElementById("project").innerHTML += `
    <div class="col">
    <div class="card" style="width: 18rem">
      <img
        src="${project.upload}"
        class="card-img-top h-5"
        alt="..."
      />
      <div class="card-body">
        <div class="d-flex flex-column">
          <h5 class="card-title">${project.title}</h5>
          <span>Duration: ${project.duration}</span>
        </div>
        <p class="card-text">
          ${project.description}
        </p>
        <div class="w-0 d-flex gap-3 my-3">
          ${nodeImage}
          ${reactImage}
          ${vueImage}
          ${golangImage}
        </div>
        <div class="d-flex gap-2">
          <a href="#" class="btn btn-secondary w-100">Edit</a>
          <a href="#" class="btn btn-secondary w-100">Delete</a>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
