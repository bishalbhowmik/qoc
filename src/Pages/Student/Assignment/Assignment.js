import bufferToDataUrl from 'buffer-to-data-url'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkAssignmentPremiumApi, createAssignmentApi, getAllAssignmentApi } from '../../../Api/Student/AssignmentApi'
import Spinner from '../../../components/Spinner'

export const AssignmentHelp = (props) => {


  const [state, setState] = useState({
    title: '',
  })
  const [message, setMessage] = useState({ message: '', error: false })
  const [assignment, setAssignment] = useState([])
  const [selected, setSelected] = useState([])
  const [spin, setSpin] = useState(false)
  const [assignmentPremium, setAssignmentPremium] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {

    setSpin(true)
    checkAssignmentPremiumApi().then(data => {
      console.log(data)
      setSpin(false)
      if (data.error) throw data.message

      else {
        setAssignmentPremium(true)
        setUser(data.data)
        setMessage({ message: data.message, error: data.error })
        setSpin(true)
        getAllAssignmentApi({ studentId: props.decodedToken._id }).then(data => {
          setSpin(false)
          console.log(data)
          if (data.error) throw data.message
          setAssignment(data.data)
        }).catch(err => {
          console.log(err)
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
    }).catch(err => {
      window.alert(err)
      setMessage({ message: err, error: true })
    })
  }


  const assignmentModal = (arr) => {
    setSelected([...arr])
    document.getElementById('assignmentAnswerModal').showModal()
  }

  let assignmentShow
  if (assignment.length === 0) assignmentShow = <div className='container col-span-12 text-center'>No assignment found</div>

  else {
    assignmentShow = assignment.map((item, index) => {
      return <Link onClick={() => assignmentModal([...item.answer])} to='' key={index} className='col-span-12 md:col-span-4 border p-3 mb-3 text-center rounded'>
        <div className='font-bold'>{item.title}</div>
      </Link>
    })
  }

  return (
    <div>

      <div className="text-center mb-16">
        <h1 className='text-3xl text-black font-bold mb-2'>Your Ultimate Assignment Help Hub</h1>
        <p style={{ letterSpacing: '1.3px' }} className='text-[#979797]'>Navigate Through Challenges with Expert Guidance and Resources Tailored for Seamless Academic Success.</p>
      </div>

      <div role="alert" className={`alert ${message.error ? 'alert-warning' : 'alert-success'} mb-7 shadow-lg`}>
        {message.error ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}

        <span>{message.message}</span>
      </div>

      <div className='my-7'>
        {assignmentPremium && Object.keys(user).length != 0 && <div className='border inline'>Assignment Count: {user.assignment.count}</div>}
      </div>

      <button className='btn' onClick={() => document.getElementById('createAssignmentModal').showModal()}>Post Assignment</button>

      <div className='grid gap-10 grid-cols-12 mt-10'>
        {assignmentShow}
      </div>



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


      <dialog id="assignmentAnswerModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className='grid grid-cols-12 gap-4'>
            {selected.map((item, index) => {
              return (
                <div className='col-span-12 my-7 p-10'>
                  <div className='font-bold text-2xl my-5'>Solution {index + 1}</div>
                  <div className='font-bold my-5'>{item.name}</div>
                  <object width='100%' className='h-screen' data={bufferToDataUrl(item.contentType, item.data)} type=""></object>
                </div>
              )
            })}
          </div>

        </div>
      </dialog>


      {spin ? <Spinner /> : ''}
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