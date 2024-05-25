import { useState, useEffect } from "react";
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

  const [prompt, setPrompt] = useState("");

  console.log(useCaseIndex);

  function toggleCriteria(criterionToToggle) {
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [criterionToToggle]: !prevCriteria[criterionToToggle],
    }));
  }

  useEffect(() => {
    if (useCaseIndex !== null) {
      let newPrompt = "";
      for (const criterion in criteria) {
        if (criteria[criterion]) {
          newPrompt += useCases[useCaseIndex].criteria[criterion] + "\n \n";
        }
      }
      setPrompt(newPrompt);
    }
  }, [criteria, useCaseIndex]);

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
        <fieldset className="criteria-selection">
          <label>
            <input type="checkbox" onChange={() => toggleCriteria("context")} />
            Contexte
          </label>
          <label>
            <input type="checkbox" onChange={() => toggleCriteria("role")} />
            Rôle
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleCriteria("intention")}
            />
            Intention
          </label>
          <label>
            <input type="checkbox" onChange={() => toggleCriteria("task")} />
            Tâche
          </label>
          <label>
            <input type="checkbox" onChange={() => toggleCriteria("example")} />
            Exemple
          </label>

          <label>
            <input type="checkbox" onChange={() => toggleCriteria("result")} />
            Résultat
          </label>
        </fieldset>
      </section>

      <section>
        <h2>2 - Sélectionnez le cas d’usage que vous voulez tester</h2>
        <fieldset className="use-case-selection">
          {useCases.map((useCase, index) => (
            <label>
              <input
                type="radio"
                name="use-case"
                onChange={() => setUseCaseIndex(index)}
              />
              {useCase.description}
            </label>
          ))}
        </fieldset>
      </section>

      {useCaseIndex !== null && (
        <section>
          <h2>
            3 - Copiez-collez le prompt ci-dessous dans ChatGPT puis, complétez
            les parties manquantes (s’il y en a)
          </h2>
          <textarea
            className="prompt-box"
            defaultValue={prompt}
            rows="20"
            cols="33"
            maxlength="10000"
            wrap="true"
          ></textarea>
        </section>
      )}
    </main>
  );
}

export default App;
