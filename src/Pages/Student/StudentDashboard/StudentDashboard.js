import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { getAStudent, updateStudent } from '../../../Api/Student/StudentApi'



const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }

}


export const StudentDashboard = (props) => {

  const [state, setState] = useState({
    username: '',
    email: '',
    mobile: '',
    // password: '',
    country: '',
    curriculumId: '',
  })

  const [curriculum, setCurriculum] = useState([])

  useEffect(() => {

    getAllCurriculumApi().then(data => {

      if (data.error) throw data.message

      setCurriculum([...data.data])

    }).catch(err => {
      console.log(err)
    })

    getAStudent(props.decodedToken._id).then(data => {

      if (data.error) throw data.message

      setState({
        ...state,
        username: data.data.username,
        email: data.data.email,
        mobile: data.data.mobile,
        country: data.data.country,
        curriculumId: data.data.curriculum,
        // password: data.data.password,
      })

    }).catch(err => {
      console.log(err)
    })

  }, [props])


  const handleChange = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    updateStudent(props.decodedToken._id, state).then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })

  }


  return (
    <div>

      <form onSubmit={e => handleSubmit(e)} action="">
        <div className='my-3'>
          <label className='label label-text' htmlFor="">Username</label>
          <input className='input input-bordered' type="text" name='username' disabled value={state.username} />
        </div>

        <div className='my-3'>
          <label className='label label-text' htmlFor="">email</label>
          <input className='input input-bordered' type="text" name='email' disabled value={state.email} />
        </div>


        <div className='my-3'>
          <label className='label label-text' htmlFor="">mobile</label>
          <input className='input input-bordered' type="text" name='mobile' onChange={e => handleChange(e)} value={state.mobile} />
        </div>


        <div className='my-3'>
          <label className='label label-text' htmlFor="">country</label>
          <input className='input input-bordered' type="text" name='country' onChange={e => handleChange(e)} value={state.country} />
        </div>

        <div className='my-3'>
          <span className="label label-text">Curriculum: </span>
          <select required className='select select-bordered' name="curriculumId" onChange={(e) => handleChange(e)} >
            <option value="">Select</option>

            {curriculum.map(item => <option key={Math.random()} selected={item._id === state.curriculumId} value={item._id}>{item.curriculum}</option>)}

          </select>
        </div>

        <button type='submit' className="btn">Update</button>

      </form>

    </div>
  )
}


export default connect(mapStateToProps)(StudentDashboard)