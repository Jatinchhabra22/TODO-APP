import {createContext, useContext } from "react"

export const TodoContext = createContext({ // 1.  creating a context with default values 
    
        todos :[ 
        {
            id : 1,
            todoMsg : "hello",
            completed : false,
        } 
    ],
    addTodo : (todo) => {},
    deleteTodo : (id) => {},
    updateTodo : (todo, id) => {},
    toggleComplete : (id) => {},
    
})

export const useTodo = () => {
    return useContext(TodoContext) // 2. creating context for todocontext 
}

export const TodoProvider = TodoContext.Provider // 3. creating provider for the todoProvider