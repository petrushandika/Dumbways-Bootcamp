const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const { Query } = require("pg");
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

app.get("/testimonial", testimonial);
app.get("/contact", contact);
app.get("/blog-detail/:id", blogDetail);

app.get("/login", loginView);
app.get("/register", registerView);
app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);

const data = [];

// Service
function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  const query = "SELECT * FROM blogs";
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  // const data = await blogModel.findAll();

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  console.log(isLogin, user);

  res.render("blog", { data, isLogin, user });
}
 
async function blogDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM blogs WHERE id=${id}`;
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  const techArray = data[0].tech;

  res.render("blog-detail", { data: data[0], tech: techArray });
}

async function addBlog(req, res) {
  try {
    const { title, start, end, description, tech } = req.body;

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

    const techs = Array.isArray(tech) ? tech : [tech];
    const techArray = "{" + techs.join(",") + "}";
    const query = `INSERT INTO blogs(title, start, "end", duration, description, tech) VALUES ('${title}', '${start}', '${end}', '${duration()}', '${description}', '${techArray}')`;

    console.log("Query:", query);

    await sequelize.query(query, { type: QueryTypes.INSERT });
    res.redirect("/blog");
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Failed to add blog");
  }
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM blogs WHERE id=${id}`;

  const data = await sequelize.query(query, { type: QueryTypes.DELETE });

  data.splice(id, 1);
  res.redirect("/blog");
}

async function editBlog(req, res) {
  try {
    const { id, title, start, end, description, tech } = req.body;

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

    const techs = Array.isArray(tech) ? tech : [tech];
    const techArray = "{" + techs.join(",") + "}";
    const query = `UPDATE blogs SET 
      title='${title}', 
      start='${start}', 
      "end"='${end}', 
      duration='${duration()}', 
      description='${description}', 
      tech='${techArray}'
      WHERE id = ${id}`;

    console.log(query);

    await sequelize.query(query, { type: QueryTypes.UPDATE });
    res.redirect("/blog");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to edit blog");
  }
}

function addBlogView(req, res) {
  res.render("add-blog");
}

async function editBlogView(req, res) {
  const { id } = req.params;
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

  const query = `
      INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashedPassword}', NOW(), NOW())
      `;
  const data = await sequelize.query(query, { type: QueryTypes.INSERT });

  // await User.create({
  //   name,
  //   email,
  //   password: hashedPassword,
  // });

  res.redirect("/login");
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

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    req.flash("danger", "Password is Wrong!");
    return res.redirect("/login");
  }

  req.session.isLogin = true;
  req.session.user = {
    name: user.name,
    email: user.email,
  };

  req.flash("success", "Login Berhasil!");
  res.redirect("/blog");
}

async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) return console.error("Logout Failed!");

    console.log("Logout success!");
    res.redirect("/");
  });
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
