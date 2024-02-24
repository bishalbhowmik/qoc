import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTuitionApi } from '../../../Api/Student/TuitionApi'


const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken

  }
}

export const CreateTuition = (props) => {

  const [message, setMessage] = useState('')

  const [state, setState] = useState({
    studentId: props.decodedToken._id,
    subject: '',
    salary: '',
    time: '',
    daysInWeek: '',
    language: '',
    tutorGender: '',
    location: '',
    tuitionType: '',
    otherRequirements: '',
  })

  const handleChange = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    createTuitionApi({ ...state, time: new Date().toTimeString(state.time) }).then(data => {
      console.log(data)
      setMessage(data.message)

    })

  }


  return (
    <div>

      <div className='text-center my-10 text-2xl font-bold'>Post New Tuition </div>
      <div className='border bg-slate-50 p-5 md:px-10 rounded-lg w-11/12 m-auto'>
        <form onSubmit={e => handleSubmit(e)} action="" >

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className=' col-span-1'>
              <label className=' block label label-text' htmlFor="">Subject</label>
              <input className='input input-bordered w-full' name='subject' onChange={e => handleChange(e)} value={state.subject} type="text" />
            </div>
            <div className='col-span-1'>
              <label className='block label label-text' htmlFor="">Salary</label>
              <input className='input input-bordered w-full' name='salary' onChange={e => handleChange(e)} value={state.salary} type="number" />
            </div>
            <div className='col-span-1'>
              <label className='mt-7 block label label-text' htmlFor="">Time</label>
              <input className='input input-bordered w-full' name='time' onChange={e => handleChange(e)} value={state.time} type="time" />  
            </div>
            <div className='col-span-1'>
               <label className='mt-7 block label label-text' htmlFor="">Days in Week</label>
                <input className='input input-bordered w-full' name='daysInWeek' onChange={e => handleChange(e)} value={state.daysInWeek} type="number" />
            </div>
            <div className='col-span-1'>
              <label className='mt-7 block label label-text' htmlFor="">Language</label>
              <input className='input input-bordered w-full' name='language' onChange={e => handleChange(e)} value={state.language} type="text" />
            </div>
            <div className='col-span-1'>
              <label className='mt-7 block label label-text' htmlFor="">Location</label>
              <input className='input input-bordered w-full' name='location' onChange={e => handleChange(e)} value={state.location} type="text" />
            </div>
            <div className='col-span-1'>
              <label className='mt-7 block label label-text' htmlFor="">Tuition Type</label>
              <select name='tuitionType' className='input input-bordered w-full'>
                <option value="">Select Tuition Type</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className='col-span-1'>
              <label className='mt-7 block label label-text' htmlFor="">Other requirements</label>
              <input className='input input-bordered w-full' name='otherRequirements' onChange={e => handleChange(e)} value={state.otherRequirements} type="text" />
            </div>

          </div>

          


          

         

          

          

          

          

          


          <button className='btn btn-success mt-7' type="submit">Create</button>

          {message != '' && <div className='my-5 p-4 bg-green-200 rounded font-bold'>{message}</div>}

        </form>
      </div>

    </div>
  )
}


export default connect(mapStateToProps)(CreateTuition)