import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { getSubjectsApi } from '../../../Api/Admin/SubjectApi'
import { getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { getModulesApi } from '../../../Api/Admin/ModuleApi'
import AllMcq from './AllMcq'
import { createMcq, getAllMcqApi } from '../../../Api/Admin/McqApi'
import Spinner from '../../../components/Spinner'

export const Mcq = (props) => {

    const [curriculum, setCurriculum] = useState([])
    const [subject, setSubject] = useState([])
    const [chapter, setChapter] = useState([])
    const [module, setModule] = useState([])
    const [spin, setSpin] = useState(false)
    const [state, setState] = useState({
        question: '',
        option: [],
        a: '',
        b: '',
        c: '',
        d: '',
        answer: '',
        hints: '',
        difficulty: 'easy',
        explanation: '',
        curriculumId: '',
        subjectId: '',
        chapterId: '',
        moduleId: '',
    })

    useEffect(() => {

        setSpin(true)
        getAllCurriculumApi().then(data => {
            setSpin(false)
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

    }, [])


    const handleChange = (e) => {

        if (e.target.value != '') {

            if (e.target.name === 'curriculumId') {
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
        createMcq(state).then(data => {
            setSpin(false)
            window.alert(data.message)
            setState({
                ...state,
                question: '',
                option: [],
                a: '',
                b: '',
                c: '',
                d: '',
                answer: '',
                hints: '',
                explanation: '',
            })
        })
    }

    return (
        <div>

            <button className='btn btn-neutral' onClick={() => document.getElementById('addMcqModal').showModal()}>Add Mcq</button>


            <AllMcq />



            <dialog id="addMcqModal" className="modal">
                <div className="modal-box w-10/12 max-w-5xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Add MCQ to Database</h3>


                    <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

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
                            <span className="label label-text">Question: </span>
                            <textarea required name='question' onChange={e => handleChange(e)} value={state.question} type="text" placeholder="Type here" className="input input-bordered w-full textarea" />
                        </div>

                        <div className='mb-5'>Options: </div>

                        <div className='mb-5'>
                            <span className="me-3">A </span>
                            <input required onChange={e => handleChange(e)} name='a' value={state.a} type="text" className="file-input file-input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div className='mb-5'>
                            <span className="me-3">B </span>
                            <input required onChange={e => handleChange(e)} name='b' value={state.b} type="text" className="file-input file-input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div className='mb-5'>
                            <span className="me-3">C </span>
                            <input onChange={e => handleChange(e)} name='c' value={state.c} type="text" className="file-input file-input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div className='mb-5'>
                            <span className="me-3">D </span>
                            <input onChange={e => handleChange(e)} name='d' value={state.d} type="text" className="file-input file-input-bordered w-full max-w-xs mb-5" />
                        </div>

                        <div className='mb-5'>
                            <span className="label label-text">Correct Answer: </span>
                            <input required name='answer' onChange={e => handleChange(e)} value={state.answer} type="text" placeholder="Type A, B, C or D" className="input input-bordered w-full" />
                        </div>

                        <div className='mb-5'>
                            <span className="label label-text">Hints: </span>
                            <input name='hints' onChange={e => handleChange(e)} value={state.hints} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div className='mb-5'>
                            <span className="label label-text">Explanation: </span>
                            <input name='explanation' onChange={e => handleChange(e)} value={state.explanation} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div className='mb-5'>
                            <span className="label label-text">Difficulty: </span>
                            <select name="difficulty" onChange={(e) => handleChange(e)} id="">
                                <option selected value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <button className='btn btn-warning block' type="submit">Confirm</button>
                    </form>
                </div>

                {spin && <Spinner />}
            </dialog>



        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}


export default connect(mapStateToProps, mapDispatchToProps)(Mcq);