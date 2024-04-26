const form = document.querySelector("form");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `
    Full Name: ${fullname.value} 
    Email : ${email.value} 
    Phone : ${phone.value} 
    Subject : ${subject.value} 
    Message : ${mess.value}`

    Email.send({
        SecureToken : "0758d482-7276-4bc8-be83-52389e95eb1f",
        Host : "smtp.elasticemail.com",
        Username : "petrushandikasinaga@gmail.com",
        Password : "62C6B30E0E5D12F9F0291002C6277E682178",
        To : 'petrushandikasinaga@gmail.com',
        From : "petrushandikasinaga@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => Swal.fire({
        title: "Success",
        text: "Message sent successfully",
        icon: "success"
      })
    );
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTextEmail = document.querySelector(".error-text.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTextEmail.innerText = "Enter a valid email address";
    } else {
      errorTextEmail.innerText = "Please enter your Email Address";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullname.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !mess.classList.contains("error")
  ) {
    console.log("OK");
  }

  sendEmail();

  form.reset();
  return false;
});
