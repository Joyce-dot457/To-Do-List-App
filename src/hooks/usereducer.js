import { useReducer,useEffect } from "react"

function reducer(state,action) {
   if (action.type === 'add') {
      // le bouton add a pour declenchement cette constante
    const newTask={
        id:Date.now(),
        text:action.payload,
        done:false
    }
    return[...state,newTask] // affiche l'etat de depart plus la constante
   }
   if (action.type ==='toogle') {
      // affiche un tableau d'element.Si ces elemen
    return state.map((task)=>{
        if (task.id ===action.payload) {
            return {...task, done: !task.done}
        }
     return task
    })
    }
    if (action.type=== 'remove') {
      // affiche une liste d'elemnts filtrer donc chaque element est le contraire de l'action executee(supprimer) 
       return state.filter((task)=>
       task.id !==action.payload
       ) 
    }
    if (action.type=== 'clear') {
       return []
    }

   return state
}
function initialsReducer() {
   const saved= localStorage.getItem('tasks'); // permet de traduire la liste de taches qui est au depart des valeurs string en tableau lisible par javascript
   if (saved) {
    return JSON.parse(saved)  
   }
  return []

}

function useTodo() {
   // la constante permettant de communiquer les actions avec react avec pour element de depart cette fonction
  const[tasks,dispatch]=useReducer(reducer,initialsReducer())
  useEffect(()=>{
   localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks])

  return{tasks,dispatch}
}
export default useTodo