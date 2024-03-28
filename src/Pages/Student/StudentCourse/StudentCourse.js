import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addCurriculumApi, getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'


const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}


export const StudentCourse = (props) => {


  const [curriculum, setCurriculum] = useState([])
  const [spin, setSpin] = useState(false)

  useEffect(() => {
    setSpin(true)
    getAllCurriculumApi().then(data => {
      setSpin(false)
      if (data.error) throw data.message
      setCurriculum([...data.data])

    }).catch(err => console.log(err))

  }, [])



  let curriculumShow
  if (curriculum.length === 0) curriculumShow =  <div className='text-center col-span-full'>Not Curriculum found</div>

  curriculumShow = curriculum.map((item, index) => {
    return (
      <Link to='/student-dashboard/curriculum' state={{ curriculum: item }} className='card glass bg-inherit text-white bg-red-950 '>
        <div className="card-body items-center">
          <div className="card-title text-center">{item.curriculum}</div>
        </div>
      </Link>
    )
  })




  return (
    <div>


      <div className="text-center mb-16">
        <h1 className='text-3xl text-black font-bold mb-2'>Sharpen Your Edge with Expert Courses</h1>
        <p style={{ letterSpacing: '1.3px' }} className='text-[#979797]'> Unlock a World of Learning Excellence with Engaging and Comprehensive Courses Designed for Every Student's Success. </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-10'>
        {curriculumShow}
      </div>


      {spin && <Spinner />}

    </div>
  )
}



export default connect(mapStateToProps)(StudentCourse)