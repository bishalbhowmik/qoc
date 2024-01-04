import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addCurriculumApi, getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { Link } from 'react-router-dom'


const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}


export const StudentCourse = (props) => {


  const [curriculum, setCurriculum] = useState([])

  useEffect(() => {

    getAllCurriculumApi().then(data => {

      if (data.error) throw data.message
      setCurriculum([...data.data])

    }).catch(err => console.log(err))

  }, [])



  let curriculumShow
  if (curriculum.length === 0) return <div className='p-40 text-center'>Not Curriculum found</div>

  curriculumShow = curriculum.map((item, index) => {
    return (
      <Link to='/student-dashboard/curriculum' state={{ curriculum: item }} className='card  col-span-6 md:col-span-3  glass bg-inherit hover:bg-slate-600 hover:text-white '>
        <div className="card-body items-center">
          <div className="card-title text-center">{item.curriculum}</div>
        </div>
      </Link>
    )
  })




  return (
    <div>


      <div className='my-16 text-2xl text-center font-bold'>ALL CURRICULUMS</div>

      <div className='grid gap-10 grid-cols-12 mt-10'>
        {curriculumShow}
      </div>

    </div>
  )
}



export default connect(mapStateToProps)(StudentCourse)