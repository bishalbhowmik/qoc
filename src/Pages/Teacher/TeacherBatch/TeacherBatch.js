import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import { checkBatchPremiumApi, createBatchApi, createBatchPaymentApi, getAllBatchApi } from '../../../Api/Teacher/batchApi'

export const TeacherBatch = (props) => {

  const [state, setState] = useState({
    teacherId: '',
    title: '',
    description: '',
    startDate: '',
    fees: '',
  })
  const [message, setMessage] = useState({ message: '', error: true })
  const [batch, setBatch] = useState([])
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)
    checkBatchPremiumApi().then(data => {
      setSpin(false)
      if (data.error) throw data.message

      else {
        setMessage({ message: data.message, error: data.error })

        setSpin(true)

        getAllBatchApi({teacherId: props.decodedToken._id}).then(data => {
          setSpin(false)
          if (data.error) throw data.message
          setBatch([...data.data])
        }).catch(err => {
          console.log(err)
        })

      }

    }).catch(err => setMessage({ message: err, error: true }))


  }, [props])



  const handleChange = e => {

    setState({ ...state, [e.target.name]: e.target.value })

  }


  const handleSubmit = e => {
    e.preventDefault()
    console.log(state)

    createBatchApi({ ...state, teacherId: props.decodedToken._id }).then(data => {
      console.log(data)
      if (data.error) throw data.message
      setMessage({ message: data.message, error: data.error })
    }).catch(err => {
      window.alert(err)
      setMessage({ message: err, error: true })
    })
  }



  const buyPremium = () => {

    createBatchPaymentApi({ teacherId: props.decodedToken._id }).then(data => {
      if (data.data.status === 'SUCCESS') {
        window.location.replace(data.data.GatewayPageURL)
      }
      else {
        window.alert(data.message)
      }
    })
  }


  let batchShow
  if (batch.length === 0) batchShow = <div className='col-span-12 text-center'>No Batch found</div>

  else {
    batchShow = batch.map((item, index) => {
      return (
        <Link to='' key={index} className='col-span-12 md:col-span-4 border p-3 mb-3 text-center rounded'>
          <div className='font-bold'>{item.title}</div>
        </Link>
      )
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

      <button className='btn' onClick={() => document.getElementById('createBatchModal').showModal()}>Post Batch</button>

      <div className='grid gap-10 grid-cols-12 mt-10'>
        {batchShow}
      </div>



      <dialog id="createBatchModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">Post a New Batch</h3>

          <form className='my-5' onSubmit={e => handleSubmit(e)} action="">

            <label className='label label-text mt-4' htmlFor="">Title</label>
            <input required placeholder='Enter title' className='w-full input input-bordered' onChange={e => handleChange(e)} value={state.title} type="text" name='title' /> <br />

            <label className='label label-text mt-4' htmlFor="">Description</label>
            <textarea required placeholder='Enter description' className='w-full textarea textarea-bordered' onChange={e => handleChange(e)} value={state.description} type="text" name='description' /> <br />

            <label className='label label-text mt-4' htmlFor="">Start Date</label>
            <input required placeholder='' className='w-full input input-bordered' onChange={e => handleChange(e)} value={state.startDate} type="datetime-local" name='startDate' /> <br />

            <label className='label label-text mt-4' htmlFor="">Joining Fees</label>
            <input required placeholder='Enter Joining Fees' className='w-full input input-bordered' onChange={e => handleChange(e)} value={state.fees} type="number" name='fees' /> <br />

            <button className='btn btn-success mt-4' type="submit">Submit</button>

            <div className='p-3 text-center text-capitalize'>{message.message}</div>

          </form> 

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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherBatch)