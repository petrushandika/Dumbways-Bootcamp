const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const { start } = require("repl");

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
app.get("/contact", contact);
app.get("/blog-detail/:id", blogDetail);

const data = [];

// Service
function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("contact");
}

function blog(req, res) {
  res.render("blog", { data });
}

function addBlog(req, res) {
  const { title, start, end, description, node, react, angular, golang } = req.body;
  // let prj = req.body
  // console.log(prj)

  data.push({ 
    title,
    start,
    end,
    description,
    node,
    react,
    angular,
    golang,
  });
  res.redirect("blog");
}

function blogDetail(req, res) {
  const { id } = req.params;

  const data = {
    id,
    title,
    start,
    end,
    description,
    node,
    react,
    angular,
    golang,
  };

  res.render("blog-detail", { data: data });
}

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
