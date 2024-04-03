function submitHandler() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name == "") {
        return alert `Please Entered Your Name!`;
    } else if (email == "") {
        return alert `Please Entered Your Email Address!`;
    } else if (phone == "") {
        return alert `Please Entered Your Phone Number!`;
    } else if (subject == "") {
        return alert `Please Entered Your Subject!`
    } else if (message == "") {
        return alert `Please Entered Your Text Message`;
    }

    const data = {
        name, email, phone, subject, message
    }

    const emailAdress = "petrushandikasinaga@gmail.com";

    let a = document.createElement("a");
    a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${emailAdress}&su=${subject}&body=${message}`;
    a.click();

    console.log(data);
}