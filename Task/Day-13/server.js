const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const { Query } = require("pg");
const sequelize = new Sequelize(config.development);
const blogModel = require("./models").blog;

// app.set = setting variable global, configuration, etc
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./pages"));

// app.use = setting middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// Body parser
app.use(express.urlencoded({ extended: false }));
// extended : false => bring querystring from express default
// extended : true => using querystring third party = qs

// Routes
app.get("/", home);
app.get("/blog", blog);

app.post("/blog", addBlog);
app.post("/edit-blog", editBlog);
app.post("/delete-blog/:id", deleteBlog);

app.get("/add-blog", addBlogView);
app.get("/edit-blog/:id", editBlogView);

app.get("/testimonial", testimonial);
app.get("/contact", contact);
app.get("/blog-detail/:id", blogDetail);

const data = [];

// Service
function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  const query = "SELECT * FROM blogs";
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("blog", { data });
}

async function addBlog(req, res) {
  const {
    image,
    title,
    start,
    end,
    description,
    nodeImage,
    reactImage,
    angularImage,
    golangImage,
  } = req.body;

  const query = `INSERT INTO blogs(title, start, "end", nodeimage, reactimage, angularimage, golangimage, image, "createdAt", "updatedAt", description) VALUES ('${title}, '${start}', '${end}', '${nodeImage}', '${reactImage}', '${angularImage}', '${golangImage}', '${image}', now(), now(), '${description}')`;

  const data = await sequelize.query(query, { type: QueryTypes.INSERT });

  const startDate = new Date(start);
  const endDate = new Date(end);
  const time = endDate - startDate;

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  function duration() {
    if (days < 30) {
      return days + " Hari";
    } else if (months < 12) {
      return months + " Bulan";
    } else {
      return years + " Tahun";
    }
  }

  data.unshift({
    image:
      image ||
      "https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg",
    title,
    start,
    end,
    duration: duration(),
    year: startDate.getFullYear(),
    description,
    nodeImage,
    reactImage,
    angularImage,
    golangImage,
  });

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM blogs WHERE id=${id}`;

  const data = await sequelize.query(query, { type: QueryTypes.DELETE });

  data.splice(id, 1);
  res.redirect("/blog");
}

async function editBlog(req, res) {
  const {
    image,
    title,
    start,
    end,
    description,
    nodeImage,
    reactImage,
    angularImage,
    golangImage,
    id,
  } = req.body;

  const query = `UPDATE blogs SET image='${image}', title='${title}', start='${start}', end='${end}', description='${description}', node='${nodeImage}', react='${reactImage}', angular='${angularImage}', golang='${golangImage}' WHERE id=${id}`;

  const data = await sequelize.query(query, { type: QueryTypes.UPDATE });

  const startDate = new Date(start);
  const endDate = new Date(end);
  const time = endDate - startDate;

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  function duration() {
    if (days < 30) {
      return days + " Hari";
    } else if (months < 12) {
      return months + " Bulan";
    } else {
      return years + " Tahun";
    }
  }

  data[id] = {
    image:
      image ||
      "https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg",
    title,
    start,
    end,
    duration: duration(),
    year: startDate.getFullYear(),
    description,
    nodeImage,
    reactImage,
    angularImage,
    golangImage,
  };

  const datas = data[id];
  data.splice(id, 1, datas);
  res.redirect("/blog");
}

function addBlogView(req, res) {
  res.render("add-blog");
}

function editBlogView(req, res) {
  const { id } = req.params;

  const selectedData = data[id];
  selectedData.id = id;

  res.render("edit-blog", { data: selectedData });
}

async function blogDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM blogs WHERE id=${id}`;
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("blog-detail", data[0]);

  // const data = {
  //   id,
  //   title,
  //   start,
  //   end,
  //   description,
  //   nodeImage,
  //   reactImage,
  //   angularImage,
  //   golangImage,
  // };

  res.render("blog-detail", { data: data });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contact(req, res) {
  res.render("contact");
}

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
