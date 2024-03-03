import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { approveTuitionApi, confirmTuitionApi, getAllTuitionApi, updateTuitionApi } from '../../../Api/Admin/TuitionApi'


const mapStateToProps = (state) => ({})

export const TuitionAdmin = (props) => {


  const [tuition, setTuition] = useState([])
  const [selectedTuition, setSelectedTuition] = useState({})
  const [selectedTeacherId, setSelectedTeacherId] = useState('')
  const [selectedTuitionState, setSelectedTuitionState] = useState({

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

  useEffect(() => {

    getAllTuitionApi().then(data => {
      if (data.error) throw data.error
      setTuition([...data.data])
      console.log(data.data)
    }).catch(err => {
      console.log(err)
    })

  }, [])


  const approve = (id) => {

    if (window.confirm('Are you sure?')) {

      approveTuitionApi(id).then(data => {
        // if (data.error) throw data.message
        console.log(data)
      })
      // .catch(err => console.log(err))

    }

  }

  const assignTeacherModal = (item) => {

    setSelectedTuition(item)
    document.getElementById('assignTeacherModal').showModal()


  }

  const confirmTeacher = (e) => {

    e.preventDefault()
    console.log(selectedTuition, selectedTeacherId)

    if (window.confirm('Are you sure?')) {

      confirmTuitionApi(selectedTuition._id, selectedTeacherId).then(data => {
        if (data.error) throw data.message
        console.log(data)
      })
        .catch(err => console.log(err))

    }

  }


  const updateTuition = item => {

    setSelectedTuition(item)
    setSelectedTuitionState({
      subject: item.subject,
      salary: item.salary,
      time: item.time,
      daysInWeek: item.daysInWeek,
      language: item.language,
      tutorGender: item.tutorGender,
      location: item.location,
      tuitionType: item.tuitionType,
      otherRequirements: item.otherRequirements,
    })

    document.getElementById('updateTuitionModal').showModal()

  }

  const handleUpdateChange = e => {

    setSelectedTuitionState({
   ...selectedTuitionState,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateSubmit = e => {
    e.preventDefault()

    updateTuitionApi(selectedTuition._id, selectedTuitionState).then(data => {
      console.log(data)
      document.getElementById('updateTuitionModal').close()
    })
   }

  



  let tuitionShow

  if (tuition.length === 0) return <div className='p-48 text-center'>No Tuition found</div>

  tuitionShow = tuition.map((item, index) => {
    console.log(item.time)
    return (
      <div className='col-span-12 md:col-span-4 my-10 card border-x-8 hover:border-red-800 hover:shadow-lg'>
        {/* ID: {item.tuitionNumber} <br />  */}
        <div className="card-body text-sm">
          <div className="card-title mb-4">Subject: {item.subject}</div>
          <div><strong>Location:</strong>{item.location}</div>
          <div><strong>Type:</strong>  {item.tuitionType}</div>
          <div><strong>Gender:</strong>  {item.tutorGender}</div>
          <div><strong>Language:</strong>  {item.language}</div>
          <div><strong>Days:</strong>  {item.daysInWeek} per week</div>
          <div><strong>Other Requirements:</strong>  {item.otherRequirements}</div>
          <div className='mt-3'><strong>Salary:</strong>  {item.salary} BDT</div>
          <div><strong>Time:</strong>  {item.time}</div>

          <div className='mt-5'>

            <div className='btn btn-warning btn-sm me-3' onClick={() => updateTuition(item)}>Edit</div>
            <div className='btn btn-success me-3 btn-sm' onClick={() => approve(item._id)}>{item.approved ? 'Approved' : 'Approve'}</div>
            <div className='btn btn-warning btn-sm me-3' onClick={() => assignTeacherModal(item)}>{item.confirmed ? 'Confirmed' : 'Assign Teacher'}</div>

          </div>
        </div>



      </div>
    )
  })




  return (
    <div>
      <div className="grid gap-4 grid-cols-12">
        {tuitionShow}
      </div>

      <dialog id="assignTeacherModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Select Teacher</h3>


          <form onSubmit={e => confirmTeacher(e)} className='mt-10' action="">
            {selectedTuition.hasOwnProperty('applicants') ? selectedTuition.applicants.map((item, index) => {
              return (
                <div className='border p-2 my-5 rounded'>

                  <label className='label' >
                    <input onChange={e => setSelectedTeacherId(e.target.value)} type="radio" value={item._id} name="radio" className="radio radio-error" />
                    <span className='label-text'>{item.username} - {item.mobile}</span>


                  </label>
                </div>
              )
            }) : <div>No applicants found</div>}

            <button className='btn btn-warning' type="submit">Confirm</button>
          </form>
        </div>
      </dialog>


      <dialog id="updateTuitionModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-5">Update Tuition</h3>
          <form onSubmit={e => handleUpdateSubmit(e)} className="" action="">
            <label className="label label-text" htmlFor="">Subject*</label>
            <input name="subject" value={selectedTuitionState.subject} onChange={e => handleUpdateChange(e)} required placeholder="" className="input input-bordered w-full mb-3" type="text" />

            <label className="label label-text" htmlFor="">Salary*</label>
            <input required name="salary" value={selectedTuitionState.salary} onChange={e => handleUpdateChange(e)} placeholder="" className=" input input-bordered w-full mb-3" type="number" />

            <label className="label label-text" htmlFor="">Time*</label>
            <input required name="time" value={selectedTuitionState.time} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="time" />

            <label className="label label-text" htmlFor="">Days In a Week*</label>
            <input required name="daysInWeek" value={selectedTuitionState.daysInWeek} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="number" />

            <label className="label label-text" htmlFor="">Language*</label>
            <input required name="language" value={selectedTuitionState.language} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="text" />

            <label className="label label-text" htmlFor="">Tutor Gender*</label>
            <input required name="tutorGender" value={selectedTuitionState.tutorGender} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="text" />

            <label className="label label-text" htmlFor="">Location*</label>
            <input required name="location" value={selectedTuitionState.location} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="text" />


            <label className="label label-text" htmlFor="">Tuition Type*</label>
            <input required name="tuitionType" value={selectedTuitionState.tuitionType} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="text" />

            <label className="label label-text" htmlFor="">Other Requirements</label>
            <input required name="otherRequirements" value={selectedTuitionState.otherRequirements} onChange={e => handleUpdateChange(e)} className="input input-bordered mb-3 w-full" type="text" />


            <button className="btn btn-warning mb-3" type="submit">Add</button>
          </form>
        </div>

        {/* {spin && <Spinner />} */}
      </dialog>
    </div>
  )
}




export default connect(mapStateToProps)(TuitionAdmin)