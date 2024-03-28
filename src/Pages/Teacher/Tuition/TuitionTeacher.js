import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getConfirmedTuitionApi } from '../../../Api/Teacher/TuitionApi'


const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}

export const TuitionTeacher = (props) => {

  const [confirmedTuition, setConfirmedTuition] = useState([])

  useEffect(() => {

    getConfirmedTuitionApi(props.decodedToken._id).then(data => {

      console.log(data)

      if (data.error) throw data.message
      setConfirmedTuition([...data.data])
    }).catch(err => console.log(err))

  }, [props])



  let confirmedTuitionShow

  if (confirmedTuition.length === 0) return <div className='p-48 text-center'>No Tuition found</div>

  confirmedTuitionShow = confirmedTuition.map((item, index) => {
    return (
      <div className=' col-span-12 md:col-span-6 card bg-slate-700 text-neutral-content'>
        <div className="card-body">
          <div className="text-xl">
            Code: {item.tuitionNumber} <br />
            {item.subject} <br /> <br />

            Student: {item.studentId.username} <br />
            Mobile: {item.studentId.mobile} <br />
            Location: {item.location} <br /> <br />

            Time: {item.time} <br />
            Days in Week: {item.daysInWeek} <br />
            Salary: {item.salary} /= <br />
          </div>
        </div>

      </div>
    )
  })


  return (
    <div>

      <div className='grid grid-cols-12 gap-4 mt-5'>
        {confirmedTuitionShow}
      </div>
    </div>
  )
}


export default connect(mapStateToProps)(TuitionTeacher)