const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const config = require("./config/config.json");
const { Sequelize, QueryTypes, where } = require("sequelize");
const sequelize = new Sequelize(config.development);
const blogModel = require("./models").blog;
const User = require("./models").user;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

// app.set = setting variable global, configuration, etc
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./pages"));

// app.use = setting middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// Body parser
app.use(express.urlencoded({ extended: false }));
// extended : false => bring querystring from express default
// extended : true => using querystring third party = qs

app.use(
  session({
    name: "mysession",
    secret: "verysecret", // use env procedure
    resolve: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // https for true value
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

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

app.get("/login", loginView);
app.get("/register", registerView);
app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);

// Service
function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  // const query = "SELECT * FROM blogs";
  // const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  const data = await blogModel.findAll();

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  console.log(isLogin, user);

  res.render("blog", { data, isLogin, user });
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

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  // const query = `DELETE FROM blogs WHERE id=${id}`;
  // const data = await sequelize.query(query, { type: QueryTypes.DELETE });

  const data = await blogModel.destroy({
    where: { id },
  });

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

function registerView(req, res) {
  res.render("register");
}

function loginView(req, res) {
  res.render("login");
}

async function register(req, res) {
  const { name, email, password } = req.body;

  const salt = 10;

  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.redirect("/");
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    req.flash("danger", "Email is Not Found!");
    return res.redirect("/login");
  }

  // if (!user) return console.error("Email is not found!");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    req.flash("danger", "Password is Wrong!");
    return res.redirect("/login");
  }

  // if (!isPasswordValid) return console.error("Password is wrong!");

  req.session.isLogin = true;
  req.session.user = {
    name: user.name,
    email: user.email,
  };

  // console.log("Login berhasil!");
  req.flash("success", "Login Berhasil!");
  res.redirect("/");
}

async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) return console.error("Logout Failed!");

    console.log("Logout success!");
    res.redirect("/");
  });
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

  res.render("blog-detail", { data: data });
}

app.listen(port, () => {
  console.log("Server is running on PORT: ", port);
});
