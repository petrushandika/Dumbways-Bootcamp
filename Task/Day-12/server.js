const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

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

function blog(req, res) {
  res.render("blog", { data });
}

function addBlog(req, res) {
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

  const defaultImage = "https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg";

  const technology = {
    node: nodeImage || 'assets/images/node.svg',
    react: reactImage || 'assets/images/react.svg',
    angular: angularImage || 'assets/images/angular.svg',
    golang: golangImage || 'assets/images/golang.svg'
  };

  data.unshift({
    image: image || defaultImage,
    title,
    start,
    end,
    description,
    nodeImage: technology.node,
    reactImage: technology.react,
    angularImage: technology.angular,
    golangImage: technology.golang,
  });

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const { id } = req.params;

  data.splice(id, 1);
  res.redirect("/blog");
}

function editBlog(req, res) {
  const { title, start, end, description, nodeImage, reactImage, angularImage, golangImage, id } = req.body;

  data[id] = {
    title,
    start,
    end,
    description,
    nodeImage,
    reactImage,
    angularImage,
    golangImage
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

function blogDetail(req, res) {
  const { id } = req.params;

  const data = {
    id,
    title,
    start,
    end,
    description,
    nodeImage,
    reactImage,
    angularImage,
    golangImage,
  };

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