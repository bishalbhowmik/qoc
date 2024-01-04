import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { checkAssignmentPremiumApi, createAssignmentApi, createAssignmentPaymentApi, getAllAssignmentApi } from '../../../Api/Student/AssignmentApi'

export const AssignmentHelp = (props) => {


  const [state, setState] = useState({
    title: '',
  })
  const [message, setMessage] = useState('')
  const [assignment, setAssignment] = useState([])

  useEffect(() => {

    checkAssignmentPremiumApi().then(data => {
      if (data.error) throw data.message
      else {
        getAllAssignmentApi({ studentId: props.decodedToken.studentId }).then(data => {
          setAssignment(data.data)
        })

      }

    }).catch(err => setMessage(err))


  }, [props])



  const handleChange = e => {

    if (e.target.type === 'file') {
      setState({ ...state, [e.target.name]: e.target.files[0] })
    }
    else {
      setState({ ...state, [e.target.name]: e.target.value })
    }
  }


  const handleSubmit = e => {
    e.preventDefault()
    createAssignmentApi({ ...state, studentId: props.decodedToken._id }).then(data => {
      if (data.error) throw data.message
      setMessage(data.message)
    }).catch(err => setMessage(err))
  }



  const buyPremium = () => {

    createAssignmentPaymentApi({}).then(data => {
      console.log(data)
    })
  }

  return (
    <div>

      <div role="alert" className="alert mb-7">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{message}</span>
        <div>
          {/* <button className="btn btn-sm">Deny</button> */}
          <button onClick={buyPremium} className="btn btn-sm btn-primary">Buy Premium</button>
        </div>
      </div>

      <button className='btn' onClick={() => document.getElementById('createAssignmentModal').showModal()}>Post Assignment</button>




      <dialog id="createAssignmentModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">Post a New Assignment</h3>

          <form className='my-5' onSubmit={e => handleSubmit(e)} action="">
            <input required placeholder='Enter title' className='input input-bordered' onChange={e => handleChange(e)} value={state.title} type="text" name='title' />

            <input required className='input file-input' type="file" name="assignment" onChange={e => handleChange(e)} id="" />
            <br />
            <button className='btn btn-success mt-4' type="submit">Submit</button>

            <div className='p-3 text-center text-capitalize'>{message}</div>

          </form>

        </div>
      </dialog>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentHelp)