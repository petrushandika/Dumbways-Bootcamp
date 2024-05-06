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
        return (document.getElementById("testimonial").innerHTML = `
      <h3>Data Not Found!</h3>
      `);
      }
  
      const testimonialHTMl = testimonials.map((testimonial) => {
        return `
          <div
              class="card-item col rounded-1 d-flex flex-column justify-content-center b-s"
            >
              <div class="card-image w-100">
                <a href="detail-blog.html">
                  <img
                    src="${testimonial.image}"
                    class="w-100 h-auto mt-3 rounded-1"
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
                      <p class="fs-5 mt-3"><i class="fs-6">${testimonial.content}</i></p>
                    </div>
                    <div class="author d-flex justify-content-end">
                    <p class="fs-6">
                      - ${testimonial.author}
                    </p>
                  </div>
                  </div>
                </a>
              </div>
            </div>
      `;
      });
  
      document.getElementById("testimonial").innerHTML = testimonialHTMl.join("");
    } catch (error) {
      console.log(error);
    }
  }
  
  async function ratingTestimonial(rating) {
    try {
      const testimonials = await renderTestimonialData("https://api.npoint.io/11333ff3e1df73c80833")
  
      const filterTestimonial = testimonials.filter(
        (testimonial) => testimonial.rating === rating
      );
  
      if (!filterTestimonial.length) {
        return (document.getElementById("testimonial").innerHTML = `
      <h3>Data Not Found!</h3>
      `);
      }
  
      const testimonialHTMl = filterTestimonial.map((testimonial) => {
        return `
        <div
        class="card-item col rounded-1 d-flex flex-column justify-content-center b-s"
      >
        <div class="card-image w-100">
          <a href="detail-blog.html">
            <img
              src="${testimonial.image}"
              class="w-100 h-auto mt-3 rounded-1"
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
                <p class="fs-5 mt-3"><i class="fs-6">${testimonial.content}</i></p>
              </div>
              <div class="author d-flex justify-content-end">
              <p class="fs-6">
                - ${testimonial.author}
              </p>
            </div>
            </div>
          </a>
        </div>
      </div>
      `;
      });
  
      document.getElementById("testimonial").innerHTML = testimonialHTMl.join("");
    } catch (error) {
      console.log(error);
    }
  }
  
  allTestimonial();
  