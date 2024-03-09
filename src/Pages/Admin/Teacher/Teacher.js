import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { deleteTeacherApi, getTeacher, setPremiumApi } from '../../../Api/Admin/TeacherApi'
import Spinner from '../../../components/Spinner'

export const Teacher = (props) => {

  const [teacher, setTeacher] = useState([])
  const [spin, setSpin] = useState(false)
  const [selected, setSelected] = useState(null)
  const [teacherState, setTeacherState] = useState({

    username: '',
    email: '',
    degree: '',
    review: '',
    grading: '',
    useQocExam: '',
    checkQocExam: '',
    contactAgree: '',
    institution: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    bio: '',
    description: '',

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
      setPremiumApi(id).then(data => {
        console.log(data)
      })
    }

  }


  const seeDetails = (item) => {

    setSelected(item)

    setTeacherState({
      username: item.username,
      email: item.email,
      degree: item.degree,
      review: item.review,
      grading: item.grading,
      useQocExam: item.useQocExam,
      checkQocExam: item.checkQocExam,
      contactAgree: item.contactAgree,
      institution: item.institution,
      gender: item.gender,
      address: item.address,
      city: item.city,
      state: item.state,
      zip: item.zip,
      country: item.country,
      bio: item.bio,
      description: item.description,
    })
    
    document.getElementById('teacherDetailsModal').showModal()

  }

  


  const deleteTeacher = id => {
    if (window.confirm('Are you sure you want to remove teacher?')) {
      deleteTeacherApi(id).then(data => {
        window.alert(data.message);
      })
    }
  }


  const handleUpdateChange = e => {
    setTeacherState({ ...teacherState, [e.target.name]: e.target.value })
  }

  const handleUpdateSubmit = e => {
    // e.preventDefault()
    console.log(teacherState)
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
      {console.log(selected)}
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
          <h3 className="font-bold text-lg">Details of {teacherState && teacherState.username}</h3>

          {selected && <div className='my-10 grid grid-cols-12 gap-4'>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Username: </strong>
              <input value={selected.username} name='username' onChange={e => handleUpdateChange(e)} type="text" />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Mobile: </strong> {selected.mobile}
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Email: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.email} name='email' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Degree: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.degree} name='degree' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Review:  </strong>
              <input type="number" onChange={e => handleUpdateChange(e)} value={selected.review} name='review' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Grading:  </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.grading} name='grading' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Contact Agree:  </strong>{selected.contactAgree}
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Premium:  </strong>{selected && selected.batch && selected.batch.isPremium ? <FontAwesomeIcon className='text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='text-red-500' icon={faCircleXmark} />}
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Premium End:  </strong>{selected && selected.batch.endTime && new Date(selected.batch.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}
            </div>


            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Use Times QOC Exam: </strong>
              <input type="number" onChange={e => handleUpdateChange(e)} value={selected.useQocExam} name='useQocExam' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Check Times QOC Exam: </strong>
              <input type="number" onChange={e => handleUpdateChange(e)} value={selected.checkQocExam} name='checkQocExam' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Institution: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.institution} name='institution' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Address: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.address} name='address' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>City: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.city} name='city' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>State: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.state} name='state' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Zip: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.zip} name='zip' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Country: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.country} name='country' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Bio: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.bio} name='bio' />
            </div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'>
              <strong className='me-2'>Description: </strong>
              <input type="text" onChange={e => handleUpdateChange(e)} value={selected.description} name='description' />
            </div>

            {/* <div><strong className='me-2'>image: </strong>{item.image}</div> */}

          </div>}

          <div onClick={e => handleUpdateSubmit()} className='btn btn-success'>Update</div>

        </div>
      </dialog>

      {spin ? <Spinner /> : ''}

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)