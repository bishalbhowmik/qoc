import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { checkAssignmentPremiumApi, createAssignmentApi, createAssignmentPaymentApi, getAllAssignmentApi } from '../../../Api/Student/AssignmentApi'

export const AssignmentHelp = (props) => {


  const [state, setState] = useState({
    title: '',
  })
  const [message, setMessage] = useState({ message: '', error: false })
  const [assignment, setAssignment] = useState([])

  useEffect(() => {

    checkAssignmentPremiumApi().then(data => {

      if (data.error) throw data.message

      else {
        setMessage({ message: data.message, error: data.error })
        getAllAssignmentApi({ studentId: props.decodedToken.studentId }).then(data => {
          setAssignment(data.data)
        })

      }

    }).catch(err => setMessage({ message: err, error: true }))


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
      setMessage({ message: data.message, error: data.error })
    }).catch(err => setMessage({ message: err, error: true }))
  }



  const buyPremium = () => {

    createAssignmentPaymentApi({ studentId: props.decodedToken._id }).then(data => {
      if (data.data.status === 'SUCCESS') {
        window.location.replace(data.data.GatewayPageURL)
      }
      else {
        window.alert(data.message)
      }
    })
  }

  return (
    <div>

      <div role="alert" className={`alert ${message.error ? 'alert-warning' : 'alert-success'} mb-7 shadow-lg`}>
        {message.error ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        
        <span>{message.message}</span>
        <div>
          {message.error && <button className='btn btn-sm btn-dark' onClick={() => buyPremium()}>Buy Premium</button>}
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

            <div className='p-3 text-center text-capitalize'>{message.message}</div>

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