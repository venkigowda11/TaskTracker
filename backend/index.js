const express = require("express");
const mongoose = require("mongoose");
const Model = require("./models/task");
const cors = require("cors");

const port = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Connected to Port: ", port);
});

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Connected to DB"));

app.get("/getTask", async (req, res) => {
  const data = await Model.find({});
  res.status(200).json(data);
  console.log(data);
});

app.post("/postTask", async (req, res) => {
  const { task } = req.body;
  const data = new Model({ task });
  try {
    await data.save();
  } catch (err) {
    console.log(err);
  }
  console.log(data);
});

app.patch("/changeMarked/:id", async (req, res) => {
  const { marked } = req.body;
  const id = req.params.id;
  try {
    await Model.findByIdAndUpdate(id, { marked });
    res.status(200).send("Task updated successfully");
  } catch (error) {
    res.status(500).send("Failed to update task");
  }
});
