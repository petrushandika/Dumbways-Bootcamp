const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const { Query } = require("pg");
const { title } = require("process");
const { type } = require("os");
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
app.get("/detail-blog/:id", blogDetail);

const data = [];

// Service
function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  try {
    const query = "SELECT * FROM blogs";
    const data = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.render("blog", { data });
  } catch (error) {
    console.error("Kesalahan saat mendapatkan data:", error);
    res.status(500).send("Terjadi kesalahan saat memuat blog.");
  }
}

async function addBlog(req, res) {
  const { title, description } = req.body;

  // const defaultImage =
  //   "https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg";

  // const technology = {
  //   node: nodeImage || "assets/images/node.svg",
  //   react: reactImage || "assets/images/react.svg",
  //   angular: angularImage || "assets/images/angular.svg",
  //   golang: golangImage || "assets/images/golang.svg",
  // };

  // data.unshift({
  //   image: image || defaultImage,
  //   title,
  //   start,
  //   end,
  //   description,
  //   nodeImage: technology.node,
  //   reactImage: technology.react,
  //   angularImage: technology.angular,
  //   golangImage: technology.golang,
  // });

  const query = `INSERT INTO public.blogs(
    title, description, image, "createdAt", "updatedAt")
    VALUES ('${title}', '${description}', 'https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg=', now(), now());`;

  const data = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log(data);

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM blogs WHERE id=${id}`;
  const data = await sequelize.query(query, { type: QueryTypes.DELETE });

  console.log(data);

  // data.splice(id, 1);
  res.redirect("/blog");
}

async function editBlog(req, res) {
  const { title, description, id } = req.body;

  const query = `UPDATE blogs SET title='${title}', description='${description}' WHERE id=${id}`;

  const data = await sequelize.query(query, { type: QueryTypes.UPDATE });

  console.log(data);

  // data[id] = {
  //   title,
  //   start,
  //   end,
  //   description,
  //   nodeImage,
  //   reactImage,
  //   angularImage,
  //   golangImage,
  // };

  res.redirect("/");
}

function addBlogView(req, res) {
  res.render("add-blog");
}

async function editBlogView(req, res) {
  const { id } = req.params;

  // const selectedData = data[id];
  // selectedData.id = id;

  const data = await blogModel.findOne({
    where: { id },
  });

  res.render("edit-blog", { data });
}

async function blogDetail(req, res) {
  const { id } = req.params;

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

  const query = `SELECT * FROM blogs WHERE id=${id}`;

  const data = await sequelize.query(query, { type: QueryTypes }.SELECT);

  console.log(data);

  res.render("detail-blog", { data: data });
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
