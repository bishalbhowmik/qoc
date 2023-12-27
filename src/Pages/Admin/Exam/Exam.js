import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { getModulesApi } from '../../../Api/Admin/ModuleApi'
import { getSubjectsApi } from '../../../Api/Admin/SubjectApi'
import { createExamApi, getAllExamApi } from '../../../Api/Admin/ExamApi'
import { Link } from 'react-router-dom'

export const Exam = (props) => {

  const [message, setMessage] = useState('')
  const [curriculum, setCurriculum] = useState([])
  const [subject, setSubject] = useState([])
  const [chapter, setChapter] = useState([])
  const [module, setModule] = useState([])
  const [exam, setExam] = useState([])
  const [state, setState] = useState({

    exam: '',
    curriculumId: '',
    subjectId: '',
    chapterId: '',
    moduleId: '',

    numberOfMcq: '',
    numberOfBroadQuestion: '',
    startTime: '',
    endTime: '',
    negativeMarking: '',
    perMcqMarks: '',
    totalMarks: ''
    

  })

  useEffect(() => {

    getAllCurriculumApi().then(data => {
      if (data.error) {
        setCurriculum([])
        setSubject([])
        setChapter([])
        setModule([])
      }
      else {
        setCurriculum(['', ...data.data])
      }
    })

    getAllExamApi().then(data => {
      if(data.error) throw data.message
      setExam([...data.data])

    })
    .catch(err => {
      window.alert(err)
    })

  }, [])


  const handleChange = (e) => {

    if (e.target.value != '') {
      if (e.target.name === 'curriculumId') {

        getSubjectsApi(e.target.value).then(data => {
          if (data.error) {
            setSubject([])
            setChapter([])
            setModule([])
            setState({ ...state, [e.target.name]: e.target.value, subjectId: '', chapterId: '', moduleId: '' })
          }
          else {
            setSubject(['', ...data.data])
            setChapter([])
            setModule([])
            setState({ ...state, [e.target.name]: e.target.value, chapterId: '', moduleId: '', subjectId: '' })

          }

        })

      }

      else if (e.target.name === 'subjectId') {
        getChaptersApi(e.target.value).then(data => {
          if (data.error) {
            setChapter([])
            setModule([])
            setState({ ...state, [e.target.name]: e.target.value, chapterId: '', moduleId: '', })

          }
          else {
            setChapter(['', ...data.data])
            setModule([])
            setState({ ...state, [e.target.name]: e.target.value, moduleId: '', chapterId: '' })

          }
        })
      }

      else if (e.target.name === 'chapterId') {
        getModulesApi(e.target.value).then(data => {
          if (data.error) {
            setModule([])
            setState({ ...state, [e.target.name]: e.target.value, moduleId: '' })

          }
          else {
            setModule(['', ...data.data])
            setState({ ...state, [e.target.name]: e.target.value, moduleId: '' })
          }
        })
      }

      else if (e.target.name === 'moduleId') {
        setState({ ...state, [e.target.name]: e.target.value })
      }
      else {
        setState({
          ...state,
          [e.target.name]: e.target.value
        })

      }
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createExamApi(state).then(data => {
      if(data.error) throw data.message
      setMessage(data.message)
    })
    .catch(err => {
      setMessage(err)
    })

  }


  let examShow
  if(exam.length === 0){ examShow = <div className='p-5 bg-neutral text-white my-5'>No Exam Created</div>}
  else{
    examShow = exam.map(item => {
      return (
        <Link to={`/admin-dashboard/exam-details/${item._id}`} className='card card-body glass my-10 me-5 bg-slate-700 text-white'>
          <div className='flex justify-between'>
            <div className='font-bold'>Exam Name: {item.exam}</div>
            <div className=''>Total Marks: {item.totalMarks}</div>
          </div>
          <div className='flex justify-between'>
            <div className=''>Start Time: {new Date(item.startTime).toLocaleString()}</div>
            <div className=''>End Time: {new Date(item.endTime).toLocaleString()}</div>
          </div>
          <div className='flex justify-between'>
            <div className=''>Negative Marking: {item.negativeMarking}</div>
            <div className=''>Per MCQ Marks: {item.mcqsId.length}</div>
          </div>
          <div className='flex justify-between'>
            <div className=''>Number of MCQ: {item.numberOfMcq}</div>
            <div className=''>Number of Broad Question: {item.broadQuestionsId.length}</div>
          </div>
        </Link>
      )
    })
  }


  return (
    <div>

      <button className='btn' onClick={() => document.getElementById('createExamModal').showModal()}>Create Exam</button>

      <div>
        {examShow}
      </div>















      <dialog id="createExamModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">Create Exam</h3>


          <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

            <div className='mb-5'>
              <span className="label label-text">Name of Exam:</span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.exam} name='exam' type="text" />
            </div>

            <div className='mb-5'>
              <span className="label label-text">Curriculum: </span>
              <select required className='select select-bordered w-full' name="curriculumId" onChange={(e) => handleChange(e)} id="">
                {/* <option selected>Select</option> */}
                {curriculum.map((item, index) => <option selected={state.curriculumId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.curriculum}</option>)}
              </select>
            </div>

            <div className='mb-5'>
              <span className="label label-text">Subject: </span>
              {/* {console.log(subject)} */}
              <select required className='select select-bordered w-full' name="subjectId" onChange={(e) => handleChange(e)} id="">
                {subject.map((item, index) => <option selected={state.subjectId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.subject}</option>)}
              </select>
            </div>

            <div className='mb-5'>
              <span className="label label-text">Chapter: </span>
              {/* {console.log(chapter)} */}
              <select className='select select-bordered w-full' name="chapterId" onChange={(e) => handleChange(e)} id="">

                {chapter.map((item, index) => <option selected={state.chapterId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.chapter}</option>)}
              </select>
            </div>

            <div className='mb-5'>
              <span className="label label-text">Module: </span>
              <select className='select select-bordered w-full' name="moduleId" onChange={(e) => handleChange(e)} id="">
                {module.map((item, index) => <option selected={state.moduleId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.module}</option>)}
              </select>
            </div>

            <div className='mb-5'>
              <span className="label label-text">Total Marks:</span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.totalMarks} name='totalMarks' type="number" />
            </div>

            <div className='mb-5'>
              <span className="label label-text">Number of MCQ:</span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.numberOfMcq} name='numberOfMcq' type="number" />
            </div>


            <div className='mb-5'>
              <span className="label label-text">Negative Marking (%):</span>
              <input className='input input-bordered w-full' onChange={e=>handleChange(e)} value={state.negativeMarking} name='negativeMarking' type="number" /> 
            </div>
            <div className='mb-5'>
              <span className="label label-text">Per MCQ Marks: </span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.perMcqMarks} name='perMcqMarks' type="number" />
            </div>

            <div className='mb-5'>
              <span className="label label-text">Number of Broad Question:</span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.numberOfBroadQuestion} name='numberOfBroadQuestion' type="number" />
            </div>

            <div className='mb-5'>
              <span className="label label-text">Start Time: </span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.startTime} name='startTime' type="datetime-local" />
            </div>

            <div className='mb-5'>
              <span className="label label-text">End Time: </span>
              <input className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.endTime} name='endTime' type="datetime-local" />
            </div>


            <button className='btn btn-warning block' type="submit">Confirm</button>
            <div className='p-5 bg-neutral text-white my-5'>{message}</div>
          </form>
        </div>
      </dialog>


    </div>
  )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Exam)