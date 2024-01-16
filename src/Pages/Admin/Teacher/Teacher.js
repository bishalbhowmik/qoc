import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTeacher, setPremiumApi } from '../../../Api/Admin/TeacherApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../../components/Spinner'

export const Teacher = (props) => {

  const [teacher, setTeacher] = useState([])
  const [spin, setSpin] = useState(false)
  const [selected, setSelected] = useState(null)

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
    document.getElementById('teacherDetailsModal').showModal()

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
          <td>{item.batch && item.batch.isPremium ? <FontAwesomeIcon className='fas fa-xl text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='fas fa-xl text-red-500' icon={faCircleXmark} />}</td>
          <td>{item.premiumEnd && new Date(item.premiumEnd).toLocaleString()}</td>
          <td>{item.batch && !item.batch.isPremium ? <button onClick={() => setPremium(item._id)} className='btn btn-ghost'>Set</button> : ''}</td>
          <td><button className='btn btn-info btn-sm' onClick={e => seeDetails(item)}>Details</button></td>
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
          <h3 className="font-bold text-lg">Details of {selected && selected.username}</h3>

          {selected && <div className='my-10 grid grid-cols-12 gap-4'>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Username: </strong> {selected.username}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Mobile: </strong> {selected.mobile}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Email: </strong> {selected.email}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Degree: </strong> {selected.degree}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Review:  </strong>{selected.review}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Grading:  </strong>{selected.grading}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Contact Agree:  </strong>{selected.contactAgree}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Premium:  </strong>{selected.batch.isPremium ? <FontAwesomeIcon className='text-success' icon={faCircleCheck} /> : <FontAwesomeIcon className='text-red-500' icon={faCircleXmark} />}</div>
            <div className='border shadow p-2 rounded col-span-12 md:col-span-6'><strong className='me-2'>Premium End:  </strong>{selected.batch.endTime && new Date(selected.batch.endTime).toLocaleString()}</div>


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

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)