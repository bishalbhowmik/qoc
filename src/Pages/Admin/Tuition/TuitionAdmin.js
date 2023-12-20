import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { approveTuitionApi, confirmTuitionApi, getAllTuitionApi } from '../../../Api/Admin/TuitionApi'


const mapStateToProps = (state) => ({})

export const TuitionAdmin = (props) => {


  const [tuition, setTuition] = useState([])
  const [selectedTuition, setSelectedTuition] = useState({})
  const [selectedTeacherId, setSelectedTeacherId] = useState('')

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


  let tuitionShow

  if (tuition.length === 0) return <div className='p-48 text-center'>No Tuition found</div>

  tuitionShow = tuition.map((item, index) => {
    return (
      <div className='col-span-3 card bg-neutral text-neutral-content'>
        <div className="card-body">

          ID: {item.tuitionNumber} <br />
          <div className="card-title">
            Subject: {item.subject} <br />
          </div>
          <button className='btn btn-success ' onClick={() => approve(item._id)}>{item.approved ? 'Approved' : 'Approve'}</button>
          <button className='btn btn-warning ' onClick={() => assignTeacherModal(item)}>{item.confirmed ? 'Confirmed' : 'Assign Teacher'}</button>
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
    </div>
  )
}




export default connect(mapStateToProps)(TuitionAdmin)