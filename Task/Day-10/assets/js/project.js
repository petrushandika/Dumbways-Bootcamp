const dataProject = [];

function addProject(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const description = document.getElementById("description").value;
  const languages = document.querySelectorAll(".programming");
  const node = document.getElementById("node").checked;
  const react = document.getElementById("react").checked;
  const vue = document.getElementById("vue").checked;
  const golang = document.getElementById("golang").checked;
  const upload = document.getElementById("upload").files[0];
  const imageURL = URL.createObjectURL(upload);

  if (name === "") {
    alert("Please Write Your Project Name!");
    return;
  } else if (start === "") {
    alert("Please Write Your Start Date Project!");
    return;
  } else if (end === "") {
    alert("Please Write Your End Date Project!");
    return;
  } else if (description === "") {
    alert("Please Write Your Description Project!");
    return;
  } else if (languages.length === 0) {
    alert("Please Select Your Programming Language Project!");
    return;
  } else if (!imageURL) {
    alert("Please Upload Your Image Project!");
    return;
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

  // const selectedLanguages = Array.from(languages).map(
  //   (language) => language.value
  // );

  dataProject.push({
    title: name,
    startDate: start,
    endDate: end,
    description: description,
    nodeJs: node,
    reactJs: react,
    vueJs: vue,
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
    <div
    class="card-item col rounded-1 d-flex flex-column justify-content-center b-s"
  >
    <div class="card-image w-100">
      <a href="detail-project.html">
        <img
          src="${project.upload}"
          alt="mobile"
          class="w-100 h-8 mt-3 rounded-1"
        />
      </a>
    </div>
    <div class="item w-100">
      <a
        href="detail-project.html"
        class="text-decoration-none text-black"
      >
        <div class="description">
          <div class="heading">
            <h3 class="fs-5 mt-3">${project.title}</h3>
            <span class="time">${project.duration}</span>
          </div>
          <p>
          ${project.description}
          </p>
        </div>
      </a>
      <div class="language mb-3 d-flex gap-3">
      ${nodeImage}
      ${reactImage}
      ${vueImage}
      ${golangImage}
      </div>
      <div class="button-field pb-3 d-flex gap-1">
        <button
          class="btn w-100 bg-black text-light border-none rounded-1"
        >
          Edit
        </button>
        <button
          class="btn w-100 bg-black text-light border-none rounded-1"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
        `;
  }
}
