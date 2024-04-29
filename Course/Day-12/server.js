const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

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

function blog(req, res) {
  res.render("blog", { data });
}

function addBlog(req, res) {
  const { title, description, image } = req.body;

  data.unshift({
    title,
    description,
    image:
      image ||
      "https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg",
  });

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const { id } = req.params;

  data.splice(id, 1);
  res.redirect("/blog");
}

function editBlog(req, res) {
  const { title, description, id } = req.body;

  data[id] = {
    title,
    description,
  };

  res.redirect("/");
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

function contact(req, res) {
  res.render("contact");
}

function blogDetail(req, res) {
  const { id } = req.params;

  if (id >= 0 && id < data.length) {
    const blog = data[id];
    res.render("blog-detail", { data: blog });
  } else {
    res.status(404).send("Blog not found");
  }
}

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
