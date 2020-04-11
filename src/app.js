const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const repositoryIndex = repositories.findIndex(repository => repository.id == request.params.id);
  if (repositoryIndex === -1) {
    return response.status(400).json({error: "Repositório não encontrado."});
  }
  const { title, url, techs } = request.body;
  repositories[repositoryIndex] = {...repositories[repositoryIndex], ...{title, url, techs}};
  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const repository = repositories.find(repository => repository.id === request.params.id);
  if (repository === undefined) {
    return response.status(400).json({error: "Repositório não encontrado."});
  }
  repository.likes++;
  return response.json(repository);
});

module.exports = app;
