import { useState, useEffect } from "react";
import useTodo from "../hooks/usereducer";
import Message from "../components/message";
import "../App.css";
import background from "../assets/background.png";

function TodoList() {
  const [input, setInput] = useState(""); // permet d'entrer la tache que l'on veut faire

  const { tasks, dispatch } = useTodo(); // hook personalise

  const completedCount = tasks.filter((task) => task.done).length; // permet de filtrer les taches et d'afficher ce qui sont cochees

  const restCount = tasks.length - completedCount; // permet d'afficher le nombre de taches qui n'ont pas ete fait

  const [toast, setToast] = useState(null); // etat initial du message

  const [confirm, setConfirm] = useState(null); // etat initial du modal de confirmation

  // permet d'afficher le temps a un nombre de temps
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  // fonction permettant d'ajouter le texte de l'input dans la liste en affichant le message du toast
  const handleTask = () => {
    dispatch({ type: "add", payload: input });
    setInput("");
    setToast("Tache ajoutee !");
  };
  // fonction de cocher chaque tache raison pour laquelle le payload est l'id
  const handlecheck = (id) => {
    dispatch({ type: "toogle", payload: id });
  };
  // fonction permettant de supprimer chaque tache
  const handleclear = (id) => {
    dispatch({ type: "remove", payload: id });
  };
  // tout supprimer
  const handleClear = (id) => {
    dispatch({ type: "clear", payload: id });
  };
  return (
    <div id="container" style={{backgroundImage: `url(${background})`}}>
      <div id="page-container">
        <h3>To Do List</h3>
        <Message message={toast} />
        <div id="input-container">
        <input
          type="text"
          value={input}
          id="input"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={handleTask} id="add">
          +
        </button>
        </div>
        <div id="list">
          <div id="confirmation">
            {/*le bouton clique affiche la nouvelle valeur de confirmation */}
            <div id="clear-nametask">
              <p id="name">liste de taches</p>
              <button onClick={() => setConfirm(tasks)} id="clear">
            
               clear
              </button>
            </div>
            {/* si et seulement si le bouton confirmer a ete clique afficher cette fonction */}
            {confirm && (
              <div id="confirm">
                <div id="confirm-box">
                <p id="confirm-clear">Tout effacer ??</p>
                <button
                  id="accept"
                  onClick={() => {
                    handleClear(confirm);
                    setConfirm(null);
                  }}
                >
                  OK
                </button>
                <button id="refuse" onClick={() => setConfirm(null)}>
                  Annuler
                </button>
              </div>
              </div>
            )}
          </div>
          <div id="tasks">
            {/* si le nombre de tache est 0 affiche le paragraphe si non afficher le tableau */}
            {tasks.length === 0 ? (
              <p id="no-task"> aucune tache pour l'instant</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} id="list-task">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handlecheck(task.id)}
                  />
                  <p className={task.done ? "barre" : ""} id="task">{task.text}</p>
                  <button onClick={() => handleclear(task.id)} id="delete">
                    🗑{" "}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div id="description">
          <p>{completedCount} terminees</p>
          <p id="tiret">\</p>
          <p>{restCount} en attente</p>
        </div>
      </div>
    </div>
  );
}
export default TodoList;
