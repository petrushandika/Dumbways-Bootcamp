const dataProject = [];

function addProject(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const upload = document.getElementById('upload').value;
    
    if (title === "") {
        return `Please Add Your Title!`;
    } else if (content === "") {
        return `Please Add Your Content!`;
    } else if (upload === "") {
        return `Please Add Your File Upload`;
    }

    dataProject.push({
        title: title,
        content: content,
        upload: upload
    });

    console.log(dataProject);
}
