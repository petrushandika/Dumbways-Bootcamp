const testimonials = [
  {
    image:
      "https://res.cloudinary.com/dk0z4ums3/image/upload/v1613385371/attached_image/ini-tanda-dan-cara-untuk-berhenti-menjadi-people-pleaser.jpg",
    content: "Hatur nuhun atuh bang",
    author: "Michelle Olivia",
    rating: 1,
  },
  {
    image:
      "https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg",
    content: "Barudak well pisan atuh",
    author: "Ola Ramlan",
    rating: 2,
  },
  {
    image:
      "https://img.freepik.com/photos-gratuite/joyeuse-femme-bouclee-au-gingembre-chandail-jaune-inclinant-tete-souriant-approbation-montrer-accord-ok-signe-clin-oeil-accord-satisfait-du-bon-choix-donner-permission-laisser-commentaires-positifs_176420-54724.jpg",
    content: "Gachor ini mah bang",
    author: "Isaiah Veronica",
    rating: 3,
  },
];

function allTestimonial() {
  if (!testimonials.length) {
    return (document.getElementById(
      "testimonial"
    ).innerHTML = `<h1>Data Not Found!</h1>`);
  }

  const testimonialHTMl = testimonials.map((testimonial) => {
    return `
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
  });

  document.getElementById("testimonial").innerHTML = testimonialHTMl.join("");
}

function filterTestimonial(rating) {
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  if (!filteredTestimonial.length) {
    return (document.getElementById(
      "testimonial"
    ).innerHTML = `<h1>Data Not Found!</h1>`);
  }

  const testimonialHTMl = filteredTestimonial.map((testimonial) => {
    return `
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
  });

  document.getElementById("testimonial").innerHTML = testimonialHTMl.join("");
}

allTestimonial()
