import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'


const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}


export const TeacherCourse = (props) => {


  const [curriculum, setCurriculum] = useState([])

  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)

    getAllCurriculumApi().then(data => {
      setSpin(false)
      if (data.error) throw data.message
      setCurriculum([...data.data])

    }).catch(err => setSpin(false))

  }, [])



  let curriculumShow
  if (curriculum.length === 0) curriculumShow = <div className='p-40 text-center'>Not Curriculum found</div>

  curriculumShow = curriculum.map((item, index) => {
    return (
      <Link to='/teacher-dashboard/curriculum' state={{ curriculum: item }} className='card  col-span-6 md:col-span-3  glass bg-inherit hover:bg-slate-600 hover:text-white '>
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

      {spin && <Spinner /> }

    </div>
  )
}



export default connect(mapStateToProps)(TeacherCourse)