import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getStudentAllTuition } from '../../../Api/Student/TuitionApi'

const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}

export const Tutor = (props) => {

  const [tuition, setTuition] = useState([])

  useEffect(() => {

    getStudentAllTuition(props.decodedToken._id).then(data => {

      if (data.error) throw data.message
      console.log(data)
      setTuition([...data.data])

    }).catch(err => {
      console.log(err)
    })

  }, [props])


  let tuitionShow

  if (tuition.length === 0){
    tuitionShow = <div className='p-48 text-center col-span-12'>No Tuition found</div>
  }
  else{
    tuitionShow = tuition.map((item, index) => {
    return (
      <div className=' col-span-12 md:col-span-4 card bg-neutral text-neutral-content'>
        <div className="card-body">
          <div className="text-xl">
            {item.subject} <br /> <br />
            Teacher Name: {item.confirmedTeacherId.username} <br />
            Contact: {item.confirmedTeacherId.mobile} <br /> <br />
            Time: {item.time} <br /> <br />

          </div>

          <span className={`inline-flex badge ${item.confirmed ? 'badge-success' : 'badge-error'}`}>Confirmed</span> <br />
        </div>

      </div>
    )
  })
  }
  




  return (
    <div>

      <div className="text-center mb-16">
        <h1 className='text-3xl text-black font-bold mb-2'>Discover Your Perfect Mentor</h1>
        <p style={{ letterSpacing: '1.3px' }} className='text-lg text-[#979797]'>Unlock Learning Potential with a Personalized Journey - Find the Right Tutor to Fuel Your Academic Success.</p>
      </div>


      <Link className='btn btn-neutral' to='/student-dashboard/create-tuition'>Post Tuition</Link>

      <div className='grid grid-cols-12 gap-4 mt-5'>
        {tuitionShow}
      </div>
    </div>
  )
}




export default connect(mapStateToProps)(Tutor)