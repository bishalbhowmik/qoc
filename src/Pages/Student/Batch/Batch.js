import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBatchApi, joiningBatchApi } from '../../../Api/Student/BatchApi'
import Spinner from '../../../components/Spinner'

export const Batch = (props) => {

  const [batch, setBatch] = useState([])
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)
    getAllBatchApi({ pastPaperSolution: false }).then(data => {

      setSpin(false)
      if (data.error) throw data.message

      setBatch([...data.data])

    }).catch(err => { console.log(err) })

  }, [])


  const joinBatch = (batch) => {

    setSpin(true)

    joiningBatchApi({ batchId: batch._id, studentId: props.decodedToken._id }).then(data => {

      setSpin(false)

      if (!data.error) {
        if (batch.fees === 0) {
          window.alert(data.message)
          window.location.replace('/student-dashboard/my-batch')
        }
        else window.location.replace(data.data.bkashURL)
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
        <div key={index} className='border p-3 mb-3 rounded shadow hover:shadow-lg'>

          <div className='grid grid-cols-12'>
            <div className='col-span-12 md:col-span-4 flex justify-center p-3'>
              <Link className='flex align-middle' to=''><img className='rounded-full w-2/5 md:w-2/3 m-auto' src={item.teacherId.image && item.teacherId.image.contentType && item.teacherId.image != '' ? process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + item.teacherId.image.name : '/male.png'} alt="picture" /></Link>
            </div>
            <div className='col-span-12 md:col-span-8'>

              <div className='text-xl font-bold mb-5'>{item.title}</div>
              <div className='text-lg'><strong>Teacher: </strong>{item.teacherId.username}</div>
              <div className='text-lg'><strong>Email: </strong>{item.teacherId.email}</div>
              <div className='text-lg'><strong>Joining Fee: </strong>{item.fees} BDT</div>
              <div className='text-lg'><strong>Start Date: </strong> {new Date(item.startDate).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
              <div className='mt-5'>{item.description}</div>
            </div>
          </div>

          <div onClick={e => joinBatch(item)} className='col-span-12'><button className={`rounded hover:font-bold text-white ${item.fees === 0 ? 'bg-green-500 hover:bg-green-600' : ' bg-red-400 hover:bg-red-500'} btn-block btn-sm mt-5`}>Join</button></div>

        </div>
      )
    })
  }


  return (
    <div className=''>

      <div className="text-center mb-16">
        <h1 className='text-3xl text-black font-bold mb-2'>Elevate Learning Together, Batch by Batch</h1>
        <p style={{ letterSpacing: '1.3px' }} className='text-lg text-[#979797]'>Join Forces in Dedicated Batches for Personalized Tutoring and Collective Academic Excellence.</p>
      </div>

      <Link to='/student-dashboard/my-batch' className='btn btn-accent'>My Batch</Link>

      <div className='container grid grid-cols-1 md:grid-cols-2 gap-5 my-10'>
        {batchShow}
      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Batch)