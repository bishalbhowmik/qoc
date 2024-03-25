import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBroadQuestionApi } from '../../../Api/Admin/BroadQuestionApi'
import { getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { createExamApi, deleteExamApi, getAllExamApi } from '../../../Api/Admin/ExamApi'
import { getMcqByCriteriaApi } from '../../../Api/Admin/McqApi'
import { getModulesApi } from '../../../Api/Admin/ModuleApi'
import { getSubjectsApi } from '../../../Api/Admin/SubjectApi'
import Spinner from '../../../components/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Exam = (props) => {

  const [selectedMcq, setSelectedMcq] = useState([]);
  const [selectedBroadQuestion, setSelectedBroadQuestion] = useState([]);

  const [message, setMessage] = useState('')
  const [curriculum, setCurriculum] = useState([])
  const [subject, setSubject] = useState([])
  const [chapter, setChapter] = useState([])
  const [module, setModule] = useState([])
  const [exam, setExam] = useState([])
  const [spin, setSpin] = useState(false)
  const [mcq, setMcq] = useState([])
  const [broadQuestion, setBroadQuestion] = useState([])
  const [state, setState] = useState({

    exam: '',
    curriculumId: '',
    subjectId: '',
    chapterId: '',
    moduleId: '',

    numberOfMcq: 0,
    numberOfBroadQuestion: 0,
    startTime: '',
    endTime: '',
    negativeMarking: 0,
    perMcqMarks: 1,
    totalMarks: '',
    manualQuestion: false


  })

  useEffect(() => {

    setSpin(true)
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

    getAllExamApi({}).then(data => {
      console.log(data)
      setSpin(false)
      if (data.error) throw data.message
      setExam([...data.data])

    })
      .catch(err => {
        // window.alert(err)
      })

  }, [])


  const handleChange = (e) => {

    if (e.target.name === 'mcqCheck') {
      if (e.target.checked) {
        setSelectedMcq([...selectedMcq, e.target.value])
      }
      else {
        setSelectedMcq(selectedMcq.filter(item => item !== e.target.value))
      }
    }

    else if (e.target.name === 'bqCheck') {
      if (e.target.checked) {
        setSelectedBroadQuestion([...selectedBroadQuestion, e.target.value])
      }
      else {
        setSelectedBroadQuestion(selectedBroadQuestion.filter(item => item !== e.target.value))
      }
    }

    else if (e.target.type === 'file') {
      setState({
        ...state,
        attachment: e.target.files[0]
      })
    }


    else if (e.target.value != '') {
      if (e.target.name === 'curriculumId') {
        setSelectedMcq([])
        setSelectedBroadQuestion([])
        setSpin(true)
        getSubjectsApi(e.target.value).then(data => {
          setSpin(false)
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

        setSpin(true)

        setSelectedMcq([])
        setSelectedBroadQuestion([])

        getMcqByCriteriaApi({ subjectId: e.target.value }).then(data => {
          if (!data.error) {
            setMcq([...data.data])
          }
        })

        getBroadQuestionApi({ subjectId: e.target.value }).then(data => {
          setSpin(false)
          if (!data.error) {
            setBroadQuestion([...data.data])
          }

        })



        getChaptersApi(e.target.value).then(data => {
          setSpin(false)
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
        setSpin(true)

        setSelectedMcq([])
        setSelectedBroadQuestion([])

        getMcqByCriteriaApi({ chapterId: e.target.value }).then(data => {
          if (!data.error) {
            setMcq([...data.data])
          }
        })
        getBroadQuestionApi({ chapterId: e.target.value }).then(data => {
          setSpin(false)
          if (!data.error) {
            setBroadQuestion([...data.data])
          }

        })

        getModulesApi(e.target.value).then(data => {
          setSpin(false)
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

        setSpin(true)

        setSelectedMcq([])
        setSelectedBroadQuestion([])

        getMcqByCriteriaApi({ moduleId: e.target.value }).then(data => {
          setSpin(false)
          if (!data.error) {
            setMcq([...data.data])
          }
        })
        getBroadQuestionApi({ moduleId: e.target.value }).then(data => {
          setSpin(false)
          if (!data.error) {
            setBroadQuestion([...data.data])
          }

        })

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

    setSpin(true)
    createExamApi({

      ...state,
      startTime: new Date(state.startTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
      endTime: new Date(state.endTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
      mcqsId: selectedMcq,
      broadQuestionsId: selectedBroadQuestion,

    }).then(data => {
      setState({
        exam: '',
        curriculumId: '',
        subjectId: '',
        chapterId: '',
        moduleId: '',

        numberOfMcq: 0,
        numberOfBroadQuestion: 0,
        startTime: '',
        endTime: '',
        negativeMarking: 0,
        perMcqMarks: 1,
        totalMarks: '',
        manualQuestion: false
      })
      setSelectedBroadQuestion([])
      setSelectedMcq([])
      document.getElementById('createExamModal').close()

      setSpin(false)
      if (data.error) throw data.message
      setMessage(data.message)
    })
      .catch(err => {
        setMessage(err)
      })

  }

  const deleteExam = (id) => {
    
    if (window.confirm("Are you sure you want to delete?")) {
      setSpin(true)
      deleteExamApi(id).then(data => {
        setSpin(false)
        window.alert(data.message)
      })
    }
  }


  let examShow
  if (exam.length === 0) { examShow = <div className='p-5 bg-neutral text-white my-5 col-span-full'>No Exam Created</div> }
  else {
    examShow = exam.map(item => {
      return (

        <div className='card card-body glass my-10 bg-indigo-900 text-white hover:shadow-lg'>
          <Link to={`/admin-dashboard/exam-details/${item._id}`} className=''>
            <div className='card-title'> {item.subjectId.subject} - {item.exam}</div>
            <div className='card-body'>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div>
                  <div><strong>Start</strong> - {new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: "Asia/Dhaka" })}</div>
                  <div><strong>End</strong> - {new Date(item.endTime).toLocaleString('en-US', { hour12: true, timeZone: "Asia/Dhaka" })}</div>
                  <div><strong>Total Marks</strong> - {item.totalMarks}</div>
                </div>

                <div>
                  <div><strong>Total Participants</strong> - {item.participants ? item.participants.length : 0} </div>
                </div>
              </div>


            </div>
          </Link>
          <div><button onClick={() => deleteExam(item._id)} className='btn btn-error btn-sm'> <FontAwesomeIcon icon={faTrash} /> Detete</button></div>
        </div>
      )
    })
  }


  return (
    <div>

      <button className='btn' onClick={() => document.getElementById('createExamModal').showModal()}>Create Exam</button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
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

              <label className='flex' htmlFor="">
                <input checked={state.manualQuestion} className='checkbox me-3' onChange={e => setState({ ...state, manualQuestion: e.target.checked })} value={state.manualQuestion} name='manualQuestion' type="checkbox" />
                Upload Manual Question
              </label>




            </div>


            <div className='mb-5'>
              <span className="label label-text">Name of Exam:</span>
              <input required className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.exam} name='exam' type="text" />
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
              <input required className='input input-bordered w-full' min='1' onChange={e => handleChange(e)} value={state.totalMarks} name='totalMarks' type="number" />
            </div>

            {state.manualQuestion ? <div className='mb-5'>
              <label className='label label-text' htmlFor="">Attachment</label>
              <input required onChange={e => handleChange(e)} className=' file-input file-input-bordered w-full' type="file" name="attachment" id="" />
            </div> :

              <>
                <div className='mb-5 border p-5 h-64 overflow-scroll'>
                  <span className="label label-text">Select Mcq: </span>

                  {mcq.map(item => {
                    return (
                      <label className='flex mb-2' htmlFor="">
                        <input
                          type="checkbox"
                          name='mcqCheck'
                          value={item._id}
                          className='checkbox me-2'
                          onChange={e => handleChange(e)}
                        />
                        {item.question}
                      </label>
                    )
                  })}

                </div>


                <div className='mb-5'>
                  <span className="label label-text">Negative Marking (%):</span>
                  <input required className='input input-bordered w-full' min='0' onChange={e => handleChange(e)} value={state.negativeMarking} name='negativeMarking' type="number" />
                </div>
                <div className='mb-5'>
                  <span className="label label-text">Per MCQ Marks: </span>
                  <input required className='input input-bordered w-full' min='1' onChange={e => handleChange(e)} value={state.perMcqMarks} name='perMcqMarks' type="number" />
                </div>

                <div className='mb-5 border p-5 h-64 overflow-scroll'>
                  <span className="label label-text">Select Broad Question: </span>

                  {broadQuestion.map(item => {
                    return (
                      <label className='mb-3 flex' htmlFor="">
                        <input
                          type="checkbox"
                          name='bqCheck'
                          value={item._id}
                          className='checkbox me-2'
                          onChange={e => handleChange(e)}
                        />
                        <span className=''>{item.question}</span>
                      </label>
                    )
                  })}

                </div>
              </>
            }

            <div className='mb-5'>
              <span className="label label-text">Start Time: </span>
              <input required className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.startTime} name='startTime' type="datetime-local" />
            </div>

            <div className='mb-5'>
              <span className="label label-text">End Time: </span>
              <input required className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.endTime} name='endTime' type="datetime-local" />
            </div>


            <div className='mb-5'>
              <span className="label label-text">Description: </span>
              <textarea required className='textarea textarea-bordered w-full' onChange={e => handleChange(e)} value={state.description} name='description' />
            </div>


            <button className='btn btn-warning block' type="submit">Confirm</button>
            <div className='p-5 bg-neutral text-white my-5'>{message}</div>
          </form>
        </div>

        {spin && <Spinner />}
      </dialog>

      {spin && <Spinner />}

    </div>
  )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Exam)