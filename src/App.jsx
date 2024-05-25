import { useState } from "react";
import useCases from "./useCases.json";
import "./App.css";

function App() {
  const [criteria, setCriteria] = useState({
    context: false,
    role: false,
    intention: false,
    task: false,
    example: false,
    result: false,
  });

  const [useCaseIndex, setUseCaseIndex] = useState(null);

  console.log(useCaseIndex);

  function toggleCriteria(criterionToToggle) {
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [criterionToToggle]: !prevCriteria[criterionToToggle],
    }));
  }

  function getPrompt() {
    let prompt = "";
    for (const criterion in criteria) {
      if (criteria[criterion]) {
        prompt += useCases[useCaseIndex].criteria[criterion] + "\n";
      }
    }
    return prompt;
  }

  return (
    <main>
      <header>
        <h1>Prompter avec CRITER</h1>
      </header>

      <section>
        <h2>
          1 - Sélectionnez les critères que vous avez fait tomber dans le
          chamboule-tout.
        </h2>
        <form>
          <input
            type="checkbox"
            id="context"
            onChange={() => toggleCriteria("context")}
          />
          <label for="context"> Contexte</label>
          <input
            type="checkbox"
            id="role"
            onChange={() => toggleCriteria("role")}
          />
          <label for="role"> Rôle</label>
          <input
            type="checkbox"
            id="intention"
            onChange={() => toggleCriteria("intention")}
          />
          <label for="intention"> Intention</label>
          <input
            type="checkbox"
            id="task"
            onChange={() => toggleCriteria("task")}
          />
          <label for="task"> Tâche</label>
          <input
            type="checkbox"
            id="example"
            onChange={() => toggleCriteria("example")}
          />
          <label for="example"> Exemple</label>
          <input
            type="checkbox"
            id="result"
            onChange={() => toggleCriteria("result")}
          />
          <label for="result"> Résultat</label>
        </form>
      </section>

      <section>
        <h2>2 - Sélectionnez le cas d’usage que vous voulez tester</h2>
        <form>
          {useCases.map((useCase, index) => (
            <>
              <input
                type="radio"
                id={`use-case-${index}`}
                name="use-case"
                onChange={() => setUseCaseIndex(index)}
              />
              <label for={`use-case-${index}`}> {useCase.description}</label>
            </>
          ))}
        </form>
      </section>

      {useCaseIndex !== null && (
        <section>
          <h2>
            3 - Copiez-collez le prompt ci-dessous dans ChatGPT puis, complétez
            les parties manquantes (s’il y en a)
          </h2>

          <input type="text" value={getPrompt()} />
        </section>
      )}
    </main>
  );
}

export default App;
