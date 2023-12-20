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

    console.log(state)

    createTuitionApi({ ...state, time: new Date().toTimeString(state.time) }).then(data => {
      console.log(data)
    })

  }


  return (
    <div>


      <form onSubmit={e => handleSubmit(e)} action="" >

        <label className='mt-7 block' htmlFor="">Subject</label>
        <input className='"form-control border block' name='subject' onChange={e => handleChange(e)} value={state.subject} type="text" />

        <label className='mt-7 block' htmlFor="">Salary</label>
        <input className='"form-control border block' name='salary' onChange={e => handleChange(e)} value={state.salary} type="number" />

        <label className='mt-7 block' htmlFor="">Time</label>
        <input className='"form-control border block' name='time' onChange={e => handleChange(e)} value={state.time} type="time" />

        <label className='mt-7 block' htmlFor="">Days in Week</label>
        <input className='"form-control border block' name='daysInWeek' onChange={e => handleChange(e)} value={state.daysInWeek} type="number" />

        <label className='mt-7 block' htmlFor="">Language</label>
        <input className='"form-control border block' name='language' onChange={e => handleChange(e)} value={state.language} type="text" />

        <label className='mt-7 block' htmlFor="">Gender</label>
        <input className='"form-control border block' name='tutorGender' onChange={e => handleChange(e)} value={state.tutorGender} type="text" />

        <label className='mt-7 block' htmlFor="">Location</label>
        <input className='"form-control border block' name='location' onChange={e => handleChange(e)} value={state.location} type="text" />

        <label className='mt-7 block' htmlFor="">Tuition Type</label>
        <input className='"form-control border block' name='tuitionType' onChange={e => handleChange(e)} value={state.tuitionType} type="text" />

        <label className='mt-7 block' htmlFor="">Other requirements</label>
        <input className='"form-control border block' name='otherRequirements' onChange={e => handleChange(e)} value={state.otherRequirements} type="text" />


        <button className='btn btn-success mt-7' type="submit">Create</button>

      </form>

    </div>
  )
}


export default connect(mapStateToProps)(CreateTuition)