const dataProject = [];

function addProject(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const description = document.getElementById('description').value;
    const language = document.querySelectorAll('.programming').value;
    const upload = document.getElementById('upload').value;
    
    if (name == "") {
        return `Please Write Your Project Name!`;
    } else if (start == "") {
        return `Please Write Your Start Date Project!`;
    } else if (end == "") {
        return `Please Write Your End Date Project!`;
    } else if (description == "") {
        return `Please Write Your Description Project!`;
    } else if (language == "") {
        return `Please Select Your Programming Language Project!`;
    } else if (upload == "") {
        return `Please Upload Your Image Project!`;
    };

    dataProject.push({
        ["Name"]: name,
        Date: {
            ["Start Date"]: start, 
            ["End Date"]: start 
        },
        Description: description,
        Language: language,
        ["Upload Image"]: upload
    });

    console.log(dataProject);
}