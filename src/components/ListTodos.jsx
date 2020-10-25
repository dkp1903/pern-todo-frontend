import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo'

const URL = 'http://localhost:5000/todos/'
const ListTodos = () => {

    const [todos, setTodos] = useState([])


    // delete todos function

    const deleteTodo = async(id) =>{
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            })
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    // const completeTodo = async(id) =>{
    //     try {
    //         const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
    //             method: 'PUT'
    //         })
    //         setTodos(todos.filter(todo => todo.todo_id !== id))
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }

    const getTodos = async() => {
        try {
            const response = await fetch(URL)
            const jsonData = await response.json()

            setTodos(jsonData)
        } catch (error) {
                console.error(error.message)
        }
    }
    useEffect(() => {
        getTodos()
    }, [])
    return <Fragment>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Complete</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Date</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo => (
          <tr key={todo.todo_id}>
              <td><button className='btn btn-warn'>{todo.completed ? 'Done' : 'Yet'}</button></td>
              <td>{todo.description}</td>
              <td>{todo.priority}</td>
              <td>{todo.date}</td>
              <td><EditTodo todo={todo}/></td>
              <td><button className='btn btn-danger' onClick = {()=> deleteTodo(todo.todo_id)}>Delete</button></td>
          </tr>
      ))}
      
    </tbody>
  </table>
    </Fragment>
}
export default ListTodos