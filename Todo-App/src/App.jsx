import { useState , useEffect} from 'react'
import './App.css'
import { TodoProvider  } from './context'
import TodoForm from './components/TodoForm'
import TodoItem  from './components/TodoItem'


function App() {

  const [todos, setTodos] = useState([]) // 4. creating an null default todo when the broweser restarts

  // 5. now adding all the functalities for the functions given in TodoContext.js

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo } , ...prev] ) // purane todo ke upar new todo added    
  }

  // updateTodo ki kahani ye h ki map kro each and every todo pr and match the todo id with our id and agar id match kr gyi to
  // update the todo with the new todo else prevtodo hi rehene do

  const updateTodo = (todo, id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed} : prevTodo))
  }

  // 6. now se use useeffect fot creating local storage whenever the browoser loads // 

 
  useEffect(() => {  
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos) // agar todo present ho to local storage mai todo ko embed krdena 
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
  

  

  return (
    <TodoProvider value={{todos, updateTodo, deleteTodo , toggleComplete , addTodo }}>
    <div className="bg-[#172842] min-h-screen py-8 w-full ">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */} 

              <TodoForm/>


          </div>
          <div className="flex flex-wrap gap-y-3">

          {todos.map((todo) => (
              <div key={todo.id}
              className='w-full'>
                <TodoItem todo = {todo}/>
              </div>
            
            ))}
       
          </div>
      </div>
  </div>
    </TodoProvider>
  )
}

export default App
