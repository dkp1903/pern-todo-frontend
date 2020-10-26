import React, { Fragment, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import EditTodo from './EditTodo'
import './ListTodo.css';


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
    let searchURL = ''
    let a = ''
    const onSubmitSearchByDescription = async (e) => {
        e.preventDefault()
        try {
            console.log('URL=', searchURL)
            let searchResults = []
            if(a !== '')
            {
                await fetch(`${searchURL}${a}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(res => res.json()).then(data => data.forEach((searchResult) => {
                searchResults.push(searchResult)
            }))
           
            setTodos(searchResults)
            
        }
        else
            window.location='/'
            
            
        } catch(error) {
                console.error(error.message)
        }
        
    }

    
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
        <div class="topnav">
 
                <div class="search-container">
    <form className='d-flex' onSubmit={onSubmitSearchByDescription}>
      <input type="text" placeholder="Search.." name="search" onChange = {e => 
                a=e.target.value}/>
      <button type="submit" onClick={onSubmitSearchByDescription}><i class="fa fa-search"></i></button>
    </form>
    </div>
 
                </div>
                <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
            Search By
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onSelect={() => {searchURL = 'http://localhost:5000/todos/description/'}}>Description</Dropdown.Item>
            <Dropdown.Item onSelect={() => {searchURL = 'http://localhost:5000/todos/priority/'}} >Priority</Dropdown.Item>
            <Dropdown.Item onSelect={() => {searchURL = 'http://localhost:5000/todos/completed/'}} >Completed</Dropdown.Item>
            <Dropdown.Item onSelect={() => {searchURL = 'http://localhost:5000/todos/completed/'}} >Date</Dropdown.Item>
        
        </Dropdown.Menu>
</Dropdown>


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