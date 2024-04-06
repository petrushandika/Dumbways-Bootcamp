const dataProject = [];

function addProject(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const content = document.getElementById('content').value;
    const upload = document.getElementById('upload').files[0];
    const imageURL = URL.createObjectURL(upload);
    
    if (title === "") {
        return alert `Please Add Your Title!`;
    } else if (start === "") {
        return alert `Please Add Your Start Date!`;
    } else if (end === "") {
        return alert `Please Add Your End Date!`;
    } else if (content === "") {
        return alert `Please Add Your Content!`;
    } else if (imageURL === "") {
        return alert `Please Add Your File Upload`;
    }

    if (start > end) {
        return alert `The End Date Cannot Be Less Than Start Date`;
    }

    let startDate = start.split("/");
    let endDate = end.split("/");

    let startDatePost = startDate[2] + "-" + startDate[1] + "-" + startDate[0];

    let endDatePost = endDate[2] + "-" + endDate[1] + "-" + endDate[0];

    let newStartDate = new Date(startDatePost);
    let newEndDate = new Date(endDatePost);

    let timeDiff = newStartDate - newEndDate;

    let diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let diffMonths = Math.floor(diffDays / (30.44));
    let diffYears = Math.floor(diffMonths / 12);

    let duration;

    if (diffYears > 0) {
        duration = `${diffYears} Years`;
    } else if (diffMonths > 0) {
        duration = `${diffMonths} Month`
    } else {
        duration = `${diffDays} Days`
    }

    dataProject.push({
        title: title,
        startDate: start,
        endDate: end,
        content: content,
        upload: imageURL,
        duration: duration
    });

    console.log(dataProject);

    newData();
}

function newData() {
    document.getElementById("list").innerHTML = "";

    for (let i = 0; i < dataProject.length; i++) {
        const project = dataProject[i]

        document.getElementById("list").innerHTML += `
        <div id="list">
            <img src="${project.upload}" alt="">
            <h3>${project.title}</h3>
            <p>${project.startdate} - ${project.enddate}</p>
            <p>Durasi : ${project.duration}</p>
            <p>${project.content}</p>
         </div>
        
        `
    }
}



