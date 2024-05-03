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
    console.log("Error", error);
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

async function blogDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM blogs WHERE id=${id}`;
  const data = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("blog-detail", data[0]);

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
