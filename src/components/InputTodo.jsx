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
            window.location = '/'
        } catch(error) {
                console.error(error.message)
        }
    }
    // let a = ''
    // const onSubmitSearchByDescription = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await fetch(`http://localhost:5000/todos/description/${a}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },

    //         })
    //         console.log(response.json())
    //     } catch(error) {
    //             console.error(error.message)
    //     }
    // }
    return(
        <Fragment>
            {/* <div class="topnav">
                <h1 className='text-center mt-5'>
                    PERN Todo List
                </h1>
                <div class="search-container">
    <form className='d-flex' onSubmit={onSubmitSearchByDescription}>
      <input type="text" placeholder="Search.." name="search" onChange = {e => 
                a=e.target.value}/>
      <button type="submit" onClick={onSubmitSearchByDescription}><i class="fa fa-search"></i></button>
    </form>
  </div>
                </div> */}
                               <h1 className='text-center mt-5'>
                    PERN Todo List
                </h1>
            
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type='checkbox'className='form-control mt-2 mr-3'  checked={completed} onChange = {() => 
                markCompleted(!completed)}/>
                <input type='text' className='form-control mr-3' style={{backgroundColor: '#04d9ff', color:'#000', borderRadius: '25px'}} placeholder='describe'value={description} onChange = {e => 
                setDescription(e.target.value)}/>
                <input type='number'className='form-control mr-3' style={{backgroundColor: '#04d9ff', color:'#000', borderRadius: '25px'}} placeholder='Priority(1-5)' value={priority} onChange = {e => 
                setPriority(e.target.value)}/>
                <input type='text'className='form-control mr-3' style={{backgroundColor: '#04d9ff', color:'#000', borderRadius: '25px'}} value={date} onChange = {e => 
                setDate(e.target.value)}/>
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo