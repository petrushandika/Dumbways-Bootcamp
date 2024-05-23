const express = require("express");
const app = express();
app.use(express.json());
const port = 6969;
const { Library } = require("./models");
const { where } = require("sequelize");

app.post("/libraries", addLibraries);
app.get("/libraries", showLibraries);
app.patch("/libraries/:id", updateLibraries);
app.delete("/libraries/:id", deleteLibraries);

async function addLibraries(req, res) {
  const { library_name, address } = req.body;
  const newLibrary = await Library.create({
    library_name,
    address,
  });

  res.status(201).json(newLibrary);
}

async function showLibraries(req, res) {
  const libraries = await Library.findAll();
  res.status(200).json(libraries);
}

async function updateLibraries(req, res) {
  const { id } = req.params;
  const { library_name } = req.body;

  const updated = await Library.update(
    {
      library_name,
    },
    {
      where: { id },
    }
  );

  if (updated[0] === 0) {
    return res.status(404).json({ error: "Library not found!" });
  }

  res.status(200).json({ message: "Library updated!" });
}

async function deleteLibraries(req, res) {
  const { id } = req.params;
  const deleted = await Library.destroy({
    where: { id },
  });

  if (deleted === 0) {
    return res.status(404).json({ error: "Library not found!" });
  }

  res.status(200).json({ message: "Library deleted!" });
}

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
