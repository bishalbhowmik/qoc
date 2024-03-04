import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCurriculumApi, deleteCurriculumApi, getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import Spinner from '../../../components/Spinner'

const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}


export const Course = (props) => {


  const [curriculum, setCurriculum] = useState([])
  const [spin, setSpin] = useState(false)
  const [state, setState] = useState({
    curriculum: ''
  })




  useEffect(() => {

    setSpin(true)
    getAllCurriculumApi().then(data => {

      setSpin(false)

      if (data.error) throw data.message
      setCurriculum([...data.data])

    }).catch(err => console.log(err))

  }, [])


  const handleSubmit = (e) => {

    e.preventDefault()

    setSpin(true)

    addCurriculumApi(state).then(data => {
      setSpin(false)
      if (data.error) throw data.message
      console.log(data.message)

    }).catch(err => console.log(err))
  }

  const handleChange = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.type === 'text' ? e.target.value : e.target.files
    })

  }


  const deleteCurriculum = id => {

    if (window.confirm("Along with curriculum deletion, all data (Subjects, Chapters, Module, Exam, Mcqs, Broadquestions, Resources etc.) in database dependent on it will be deleted. Are you want to procced?")) {

      deleteCurriculumApi(id).then(data => {
        // console.log(data)
        window.alert(data.message)
      })
    }

  }


  let curriculumShow
  if (curriculum.length === 0) {
    curriculumShow = <div className='p-40 text-center col-span-12'>Not Curriculum found</div>
  }
  else {
    curriculumShow = curriculum.map((item, index) => {
      return (
        <div className='card  col-span-6 md:col-span-3  glass bg-inherit hover:bg-slate-600 hover:text-white '>
          <Link to='/admin-dashboard/curriculum' state={{ curriculum: item }} className=''>
            <div className="card-body items-center">
              <div className="card-title text-center">{item.curriculum}</div>
            </div>
          </Link>
          <div onClick={() => deleteCurriculum(item._id)} className="btn btn-ghost">delete Curriculum</div>
        </div>

      )
    })
  }






  return (
    <div>


      <div className='my-16 text-2xl text-center font-bold'>ALL CURRICULUMS</div>

      <button onClick={() => document.getElementById('addCurriculumModal').showModal()} className='btn btn-success'>Add Curriculum</button>


      <div className='grid gap-10 grid-cols-12 mt-10'>
        {curriculumShow}
      </div>





      <dialog id="addCurriculumModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">Add New Curriculum</h3>


          <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

            <div className='mb-5'>
              <span className="label label-text">Curriculum Name: </span>
              <input name='curriculum' onChange={e => handleChange(e)} value={state.curriculum} type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>

            <span className="label label-text">Outline / Materials: </span>
            <input onChange={e => handleChange(e)} multiple name='outlines' type="file" className="file-input file-input-bordered w-full max-w-xs mb-5" />




            <button className='btn btn-warning block' type="submit">Confirm</button>
          </form>
        </div>
      </dialog>

      {spin && <Spinner />}
    </div>
  )
}



export default connect(mapStateToProps)(Course)