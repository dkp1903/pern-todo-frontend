import React, { Fragment, useState } from 'react'

const InputTodo = () => {

    const URL = 'http://localhost:5000/todos'
    let  [description, setDescription] = useState('')
    let [priority, setPriority] = useState()
    let [completed, markCompleted] = useState(false)
    let [date, setDate] = useState(new Date().toString())

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({description, priority, completed, date})

            })
            console.log(response)
        } catch(error) {
                console.error(error.message)
        }
    }
    return(
        <Fragment>
            <h1 className='text-center mt-5'>
                PERN Todo List
            </h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
            <input type='checkbox'className='form-control mt-2 mr-3' value={completed} onChange = {e => 
                markCompleted(completed = !completed)}/>
                <input type='text' className='form-control mr-3' placeholder='describe'value={description} onChange = {e => 
                setDescription(e.target.value)}/>
                <input type='number'className='form-control mr-3' placeholder='Priority(1-5)' value={priority} onChange = {e => 
                setPriority(e.target.value)}/>
                <input type='text'className='form-control mr-3' value={date} onChange = {e => 
                setDate(e.target.value)}/>
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo