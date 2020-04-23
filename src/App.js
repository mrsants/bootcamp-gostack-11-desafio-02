import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const response = await api.get("/repositories");

    setRepositories(response.data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    await api.post("/repositories", {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    loadRepositories();
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    loadRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        Desafio ReactJS
        {repositories.map((repository, index) => {
          return (
            <li key={index}>
              Repositório {index + 1}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
