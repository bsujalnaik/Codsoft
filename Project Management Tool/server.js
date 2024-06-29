const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/project_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  deadline: Date,
});

const taskSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  assignedTo: String,
  deadline: Date,
  status: String,
});

const Project = mongoose.model('Project', projectSchema);
const Task = mongoose.model('Task', taskSchema);

app.post('/projects', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.send(project);
});

app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

app.get('/tasks/:projectId', async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.send(tasks);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
