function renderTestimonialData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.onerror = () => {
      reject("Network Error!");
    };

    xhr.send();
  });
}

async function allTestimonial() {
  try {
    const testimonials = await renderTestimonialData(
      "https://api.npoint.io/11333ff3e1df73c80833"
    );

    if (!testimonials.length) {
      return (document.getElementById(
        "testimonial"
      ).innerHTML = `<h1>Data Not Found!</h1>`);
    }

    const testimonialHTML = testimonials.map((testimonial) => {
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

    document.getElementById("testimonial").innerHTML = testimonialHTML.join("");
  } catch (error) {
    console.error(error);
  }
}

async function filterTestimonial(rating) {
  try {
    const testimonials = await renderTestimonialData(
      "https://api.npoint.io/11333ff3e1df73c80833"
    );

    const filteredTestimonial = testimonials.filter(
      (testimonial) => testimonial.rating == rating
    );

    if (!filteredTestimonial.length) {
      return (document.getElementById(
        "testimonial"
      ).innerHTML = `<h1>Data Not Found</h1>`);
    }

    const testimonialHTML = filteredTestimonial.map((testimonial) => {
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

    document.getElementById("testimonial").innerHTML = testimonialHTML.join("");
  } catch (error) {
    console.error(error);
  }
}

allTestimonial();
