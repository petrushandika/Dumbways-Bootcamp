class Testimonial {
  constructor(image, comment, author) {
    this.image = image;
    this.comment = comment;
    this.author = author;
  }
}

const insertData = [
  new Testimonial(
    "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713225600&semt=sph",
    "Gacor banget brodi",
    "Khabib Moh"
  ),
  new Testimonial(
    "https://img.freepik.com/free-photo/puzzled-dark-skinned-male-reproaches-someone-threates-with-fist-wears-casual-sweater_273609-8812.jpg",
    "Gaskeun banget ini mah",
    "Umar Khoid"
  ),
  new Testimonial(
    "https://img.freepik.com/free-photo/expressive-redhead-guy-beige-shirt_176420-32315.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712707200&semt=ais",
    "Barudak well",
    "Jamaludin"
  ),
];

function renderTestimonial() {
  const testimonialContent = document.getElementById("testimonial");

  insertData.forEach((testimonial) => {
    const testimonialItem = `
        <div class="card-item">
          <div class="card-image">
            <a href=""><img src="${testimonial.image}" alt="people" /></a>
          </div>
          <div class="comment">
            <p class="comment-text">"${testimonial.comment}"</p>
          </div>
          <div class="creator">
            <p class="creator-text">- ${testimonial.author}</p>
          </div>
        </div>
    `;
    testimonialContent.insertAdjacentHTML("beforeend", testimonialItem);
  });
}

document.addEventListener("DOMContentLoaded", renderTestimonial);