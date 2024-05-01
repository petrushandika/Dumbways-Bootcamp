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

app.get("/contact", contact);
app.get("/blog-detail/:id", blogDetail);

const data = [];

// Service
function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  // const query = "SELECT * FROM blogs";
  // const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  const data = await blogModel.findAll();

  console.log("data", data);

  res.render("blog", { data });
}

async function addBlog(req, res) {
  const { title, description } = req.body;

  // const query = `INSERT INTO public.blogs(
  //   title, description, image, "createdAt", "updatedAt")
  //   VALUES ('${title}', '${description}', 'https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg=', now(), now());`;

  // const data = await sequelize.query(query, { type: QueryTypes.INSERT });

  const data = await blogModel.create({
    title,
    description,
    image:
      "https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg=",
  });

  console.log(data);

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  // const query = `DELETE FROM blogs WHERE id=${id}`;
  // const data = await sequelize.query(query, { type: QueryTypes.DELETE });

  const data = await blogModel.destroy({
    where: { id },
  });

  console.log(data);

  res.redirect("/blog");
}

async function editBlog(req, res) {
  const { title, description, id } = req.body;

  // const query = `UPDATE blogs SET title='${title}', description='${description}' WHERE id=${id}`;
  // const data = await sequelize.query(query, { type: QueryTypes.UPDATE });

  const data = await blogModel.update(
    {
      title,
      description,
    },
    {
      where: { id },
    }
  );

  console.log(data);

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

function contact(req, res) {
  res.render("contact");
}

async function blogDetail(req, res) {
  const { id } = req.params;

  // const query = `SELECT * FROM blogs WHERE id=${id}`;
  // const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  // console.log("blog-detail", data[0]);

  const data = await blogModel.findOne({
    where: { id },
  });

  console.log(data);

  res.render("blog-detail", { data: data });
}

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
