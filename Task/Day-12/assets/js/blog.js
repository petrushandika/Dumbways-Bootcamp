const dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const description = document.getElementById("description").value;
  const languages = document.querySelectorAll(".programming");
  const node = document.getElementById("node").checked;
  const react = document.getElementById("react").checked;
  const angular = document.getElementById("angular").checked;
  const golang = document.getElementById("golang").checked;
  const upload = document.getElementById("upload").files[0];
  const imageURL = URL.createObjectURL(upload);

  if (title === "") {
    alert("Please Write Your Blog Title!");
    return;
  } else if (start === "") {
    alert("Please Write Your Start Date Blog!");
    return;
  } else if (end === "") {
    alert("Please Write Your End Date Blog!");
    return;
  } else if (description === "") {
    alert("Please Write Your Description Blog!");
    return;
  } else if (languages.length === 0) {
    alert("Please Select Your Programming Language Blog!");
    return;
  } else if (!imageURL) {
    alert("Please Upload Your Image Blog!");
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

  dataBlog.push({
    title: title,
    startDate: start,
    endDate: end,
    description: description,
    node: node,
    react: react,
    angular: angular,
    golang: golang,
    upload: imageURL,
    duration: duration,
  });

  console.log(dataBlog);

  newData();
}

function newData() {
  document.getElementById("blog").innerHTML = "";

  for (let i = 0; i < dataBlog.length; i++) {
    const blog = dataBlog[i];
    let nodeImage = "",
      reactImage = "",
      angularImage = "",
      golangImage = "";

    if (blog.node == true) {
      nodeImage = '<img src="../assets/images/node.svg" class="icon-small">';
    }
    if (blog.react == true) {
      reactImage = '<img src="../assets/images/react.svg" class="icon-small">';
    }
    if (blog.angular == true) {
      angularImage = '<img src="../assets/images/angular.svg" class="icon-small">';
    }
    if (blog.golang == true) {
      golangImage = '<img src="../assets/images/golang.svg" class="icon-small">';
    }

    document.getElementById("blog").innerHTML += `
    <div
    class="card-item col rounded-1 d-flex flex-column justify-content-center b-s"
  >
    <div class="card-image w-100">
      <a href="detail-blog.html">
        <img
          src="${blog.upload}"
          alt="mobile"
          class="w-100 h-8 mt-3 rounded-1"
        />
      </a>
    </div>
    <div class="item w-100">
      <a
        href="detail-blog.html"
        class="text-decoration-none text-black"
      >
        <div class="description">
          <div class="heading">
            <h3 class="fs-5 mt-3">${blog.title}</h3>
            <span class="time">${blog.duration}</span>
          </div>
          <p>
          ${blog.description}
          </p>
        </div>
      </a>
      <div class="language mb-3 d-flex gap-3">
      ${nodeImage}
      ${reactImage}
      ${angularImage}
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
