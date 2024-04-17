class Testimonial {
  constructor(image, content, author) {
    this.image = image;
    this.content = content;
    this.author = author;
  }
}

const testimonialOne = new Testimonial(
  "https://res.cloudinary.com/dk0z4ums3/image/upload/v1613385371/attached_image/ini-tanda-dan-cara-untuk-berhenti-menjadi-people-pleaser.jpg",
  "Hatur nuhun atuh bang",
  "Michelle Olivia"
);

const testimonialTwo = new Testimonial(
  "https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg",
  "Barudak well pisan atuh",
  "Ola Ramlan"
);

const testimonialThree = new Testimonial(
  "https://img.freepik.com/photos-gratuite/joyeuse-femme-bouclee-au-gingembre-chandail-jaune-inclinant-tete-souriant-approbation-montrer-accord-ok-signe-clin-oeil-accord-satisfait-du-bon-choix-donner-permission-laisser-commentaires-positifs_176420-54724.jpg",
  "Gachor ini mah bang",
  "Isaiah Veronica"
);

const testimonialData = [testimonialOne, testimonialTwo, testimonialThree];

function renderTestimonial() {
  const testimonialContent = document.getElementById("testimonial");

  testimonialData.forEach((testimonial) => {
    const testimonialItem = `
    <div class="card-item">
          <div class="card-image">
            <a href=""><img src="${testimonial.image}" alt="people" /></a>
          </div>
          <div class="comment">
            <p class="comment-text">"${testimonial.content}"</p>
          </div>
          <div class="creator">
            <p class="creator-text">- ${testimonial.author}</p>
          </div>
        </div>
    `;
    testimonialContent.insertAdjacentHTML("beforeend", testimonialItem);
  });
}

document.addEventListener("DOMContentLoaded", renderTestimonial)
