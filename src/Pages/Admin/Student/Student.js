import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setAssignmentPremiumApi, setCoursePremiumApi } from '../../../Api/Admin/StudentApi'
import { getAllStudent } from '../../../Api/Student/StudentApi'
import Spinner from '../../../components/Spinner'


export const Student = (props) => {

  const [student, setStudents] = useState([])
  const [spin, setSpin] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {

    setSpin(true)

    getAllStudent().then(data => {
      setSpin(false)

      if (data.error) throw data.message
      setStudents([...data.data])

    }).catch(err => window.alert(err))

  }, [])


  const setAssignmentPremium = (id) => {
    if (window.confirm('Are you sure you want to?')) {
      setSpin(true)
      setAssignmentPremiumApi(id).then(data => {
        setSpin(false)
        window.alert(data.message);
      })
    }

  }

  const setCoursePremium = (id) => {

    if (window.confirm('Are you sure you want to?')) {
      setSpin(true)
      setCoursePremiumApi(id).then(data => {
        setSpin(false)
        window.alert(data.message);
      })
    }

  }


  const seeDetails = (item) => {

    setSelected(item)
    document.getElementById('studentDetailsModal').showModal()

  }


  let studentShow


  if (student.length === 0) { studentShow = <div className='text-center text-xl my-10'>No student Found</div> }
  else {
    studentShow = student.map((item, index) => {

      return (
        <tr className="hover">
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>

          <td>{item.assignment && item.assignment.isPremium ? <FontAwesomeIcon className='fas fa-xl text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='fas fa-xl text-red-500' icon={faCircleXmark} />}</td>

          <td>{item.assignment && !item.assignment.isPremium ? <button onClick={() => setAssignmentPremium(item._id)} className='btn btn-outline'>Set</button> : ''}</td>

          <td>{item.course && item.course.isPremium ? <FontAwesomeIcon className='fas fa-xl text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='fas fa-xl text-red-500' icon={faCircleXmark} />}</td>

          <td>{item.course && !item.course.isPremium ? <button onClick={() => setCoursePremium(item._id)} className='btn btn-outline'>Set</button> : ''}</td>
          <td><button className='btn btn-info btn-sm' onClick={e => seeDetails(item)}>Details</button></td>
        </tr>
      )

    })
  }




  return (
    <div>

      <div className="overflow-x-auto">

        <h2 className='text-center my-10 text-2xl'>All students</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Assignment Premium</th>
              <th>Set Premium</th>
              <th>Course Premium</th>
              <th>Set Premium</th>
              <th>{''}</th>

            </tr>
          </thead>
          <tbody> {studentShow} </tbody>
        </table>
      </div>


      <dialog id="studentDetailsModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Details of {selected && selected.username}</h3>

          {selected && <div className='my-10 grid grid-cols-12 gap-4'>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Username: </strong> {selected.username}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Mobile: </strong> {selected.mobile}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Email: </strong> {selected.email}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Course Premium:  </strong>{selected.course.isPremium ? <FontAwesomeIcon className='text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='text-red-500' icon={faCircleXmark} />}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Course Premium End:  </strong>{selected.course.endTime && new Date(selected.course.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Assignment Premium:  </strong>{selected.assignment.isPremium ? <FontAwesomeIcon className='text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='text-red-500' icon={faCircleXmark} />}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Assignment Premium End:  </strong>{selected.assignment.endTime && new Date(selected.assignment.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Use Times QOC Exam: </strong>{selected.useQocExam}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Check Times QOC Exam: </strong>{selected.checkQocExam}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Institution: </strong>{selected.institution}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Address: </strong>{selected.address}</div>

            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>City: </strong>{selected.city}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>State: </strong>{selected.state}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Zip: </strong>{selected.zip}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Country: </strong>{selected.country}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Bio: </strong>{selected.bio}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Description: </strong>{selected.description}</div>
            {/* <div><strong className='me-2'>image: </strong>{item.image}</div> */}

          </div>}

        </div>
      </dialog>

      {spin ? <Spinner /> : ''}

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Student)