import React, {Fragment, useState} from 'react'

const EditTodo = ({ todo }) => {

    const [description, setDescription] = useState(todo.description)
    const [priority, setPriority] = useState(todo.description)
    let [completed, markCompleted] = useState(todo.completed)
    const [date, setDate] = useState(todo.date)

    // Update body function

    const reset = () => {
      try {
        setDescription(todo.description)
        setPriority(todo.priority)
        markCompleted(todo.completed)
        setDate(todo.date)
      } catch (error) {
          console.log(error.message)
      }
    }

    const updateBody = async(e) => {
      e.preventDefault()
      try {
          const body = {description, priority, completed, date}
          const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          })

          window.location = '/'
      } catch (error) {
          console.error(error.message)
      }
    } 
    return <Fragment>
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
          Edit
        </button>


        <div class="modal" id={`id${todo.todo_id}`}  onClick={() => {reset()}}>
          <div class="modal-dialog">
            <div class="modal-content">

              
              <div class="modal-header">
                <h4 class="modal-title">Edit Todo</h4>
                <button type="button" class="close" data-dismiss="modal" onClick={() => {reset()}}>&times;</button>
              </div>

              
              <div class="modal-body">
                  <input type='checkbox'className='form-control mt-2 mr-3'  checked={completed? true : false}  onChange={e => markCompleted(!completed)}/>
                  <input type='text' className='form-control mt-2 mr-3' placeholder='Edit Description' value={description} onChange={e => setDescription(e.target.value)}/>
                  <input type='number'className='form-control mt-2 mr-3' placeholder='Priority(1-5)' value={priority} onChange={e => setPriority(e.target.value)}/>
                  <input type='text'className='form-control mt-2 mr-3' placeholder='Edit Date' value={date} onChange={e => setDate(e.target.value)}/>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateBody(e)}>Edit</button>

                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => {reset()}}>Close</button>
              </div>

            </div>
          </div>
        </div>
  </Fragment>
}

export default EditTodo