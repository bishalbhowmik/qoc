import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { deleteTeacherApi, getTeacher, setPremiumApi } from '../../../Api/Admin/TeacherApi'
import Spinner from '../../../components/Spinner'
import { updateTeacherInfoApi } from '../../../Api/Teacher/TeacherApi'

export const Teacher = (props) => {

  const [teacher, setTeacher] = useState([])
  const [spin, setSpin] = useState(false)
  const [selected, setSelected] = useState(null)
  const [teacherState, setTeacherState] = useState({

    review: '',
    grading: '',
    featured: ''

  })

  useEffect(() => {

    setSpin(true)
    getTeacher({}).then(data => {
      setSpin(false)
      if (data.error) throw data.message
      setTeacher([...data.data])
    }).catch(err => console.log(err))

  }, [])


  const setPremium = (id) => {

    if (window.confirm('Are you sure you want to?')) {

      setSpin(true)
      setPremiumApi(id).then(data => {
        getTeacher({}).then(data => {
          setSpin(false)
          if (data.error) throw data.message
          setTeacher([...data.data])
        }).catch(err => console.log(err))
      })
    }

  }


  const seeDetails = (item) => {

    // console.log(item)
    setSelected(null)

    document.getElementById('teacherDetailsModal').showModal()
    setSelected(item)
    setTeacherState({
      review: item.review,
      grading: item.grading,
      featured: item.featured
    })
  }




  const deleteTeacher = id => {
    if (window.confirm('Are you sure you want to remove teacher?')) {
      setSpin(true)
      deleteTeacherApi(id).then(data => {
        getTeacher({}).then(data => {
          setSpin(false)
          if (data.error) throw data.message
          setTeacher([...data.data])
        }).catch(err => console.log(err))
        window.alert(data.message);
      })
    }
  }


  // const handleUpdateChange = e => {
  //   setTeacherState({ ...teacherState, [e.target.name]: e.target.value })
  // }

  const handleUpdateSubmit = e => {
    e.preventDefault()

    setSpin(true)
    updateTeacherInfoApi(selected._id, teacherState).then(data => {

      getTeacher({}).then(data => {
        setSpin(false)
        if (data.error) throw data.message
        setTeacher([...data.data])
      }).catch(err => console.log(err))

      window.alert(data.message)
    })
  }


  let teacherShow


  if (teacher.length === 0) { teacherShow = <div className='text-center text-xl my-10'>No Teacher Found</div> }
  else {
    teacherShow = teacher.map((item, index) => {

      return (
        <tr className="hover">
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td>{item.degree}</td>
          <td>{item.review}</td>
          <td>{item.grading}</td>
          <td>{item.contactAgree}</td>
          <td>{item.batch && new Date() < new Date(item.batch.endTime) ? <FontAwesomeIcon className='fas fa-xl text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='fas fa-xl text-red-500' icon={faCircleXmark} />}</td>
          <td>{item.premiumEnd && new Date(item.premiumEnd).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</td>
          <td>{item.batch && new Date() > new Date(item.batch.endTime) ? <button onClick={() => setPremium(item._id)} className='btn btn-ghost'>Set</button> : ''}</td>
          <td><button className='btn btn-info btn-sm' onClick={e => seeDetails(item)}>Details</button></td>
          <td><button className='btn btn-error btn-sm' onClick={e => deleteTeacher(item._id)}>Remove</button></td>
        </tr>
      )

    })
  }





  return (
    <div>
      <div className="overflow-x-auto">

        <h2 className='text-center my-10 text-2xl'>All Teachers</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Degree</th>
              <th>Review</th>
              <th>Grading</th>
              <th>Agreement</th>
              <th>Premium</th>
              <th>Premium End</th>
              <th>Set Premium</th>
              <th>{''}</th>
              <th>{''}</th>

            </tr>
          </thead>
          <tbody> {teacherShow} </tbody>
        </table>
      </div>


      <dialog id="teacherDetailsModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {
            selected && <>


              <h3 className="font-bold text-lg mb-10">Details of {selected && selected.username}</h3>

              <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
                <div className='p-2 border shadow'>
                  <span>Review:</span> {selected.review}
                </div>

                <div className='p-2 border shadow'>
                  <span>Grading:</span> {selected.grading}
                </div>

                <div className='p-2 border shadow'>
                  <span>Features:</span> {selected.featured ? "Yes" : "No"}
                </div>
              </div>



              <form onSubmit={e => handleUpdateSubmit(e)} className='py-10' action="">

                <h3 className='text-center my-5 font-bold text-xl'>Edit Field</h3>

                <label htmlFor="" className='label label-text'>Review</label>
                <input className='input input-bordered w-full' name='review' type="number" value={teacherState.review} onChange={e => setTeacherState({ ...teacherState, [e.target.name]: e.target.value })} />

                <label htmlFor="" className='label label-text'>Grading</label>
                <input className='input input-bordered w-full' name='grading' type="number" value={teacherState.grading} onChange={e => setTeacherState({ ...teacherState, [e.target.name]: e.target.value })} />
                
                <label htmlFor="" className='label label-text'>Features</label>
                <select className=' select select-bordered w-full' name="featured" id="" onChange={e => setTeacherState({ ...teacherState, [e.target.name]: e.target.value })} >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>


                <button type='submit' className='btn btn-success mt-5'>Update</button>
              </form>


            </>
          }





        </div>
      </dialog>

      {spin ? <Spinner /> : ''}

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)