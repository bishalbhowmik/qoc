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


export const Course = (props) => {


  const [curriculum, setCurriculum] = useState([])
  const [state, setState] = useState({
    curriculum: ''
  })




  useEffect(() => {

    getAllCurriculumApi().then(data => {

      if (data.error) throw data.message
      setCurriculum([...data.data])

    }).catch(err => console.log(err))

  }, [])


  const handleSubmit = (e) => {

    e.preventDefault()

    addCurriculumApi(state).then(data => {

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


  let curriculumShow
  if (curriculum.length === 0) {
    curriculumShow = <div className='p-40 text-center col-span-12'>Not Curriculum found</div>
  }
  else {
    curriculumShow = curriculum.map((item, index) => {
      return (
        <Link to='/admin-dashboard/curriculum' state={{ curriculum: item }} className='card col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white '>
          <div className="card-body items-center">
            <div className="card-title text-center">{item.curriculum}</div>
          </div>
        </Link>
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


    </div>
  )
}



export default connect(mapStateToProps)(Course)