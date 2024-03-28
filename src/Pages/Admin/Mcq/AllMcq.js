
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { getSubjectsApi } from '../../../Api/Admin/SubjectApi'
import { getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { getModulesApi } from '../../../Api/Admin/ModuleApi'
import { getMcqByCriteriaApi } from '../../../Api/Admin/McqApi'
import Spinner from '../../../components/Spinner'

export const AllMcq = (props) => {


    const [curriculum, setCurriculum] = useState([])
    const [subject, setSubject] = useState([])
    const [chapter, setChapter] = useState([])
    const [spin, setSpin] = useState(false)
    const [module, setModule] = useState([])
    const [mcq, setMcq] = useState([])
    const [state, setState] = useState({
        curriculumId: '',
        subjectId: '',
        chapterId: '',
        moduleId: '',
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

        getMcqByCriteriaApi({}).then(data => {
            setSpin(false)
            if (data.error) throw data.message
            setMcq([...data.data])
        })
            .catch(err => {
                console.error(err)
                setMcq([])
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
        getMcqByCriteriaApi(state).then(data => {
            window.alert(data.message)
            setSpin(false)
           if(data.error) throw data.message
            setMcq([...data.data])
        })
        .catch(err => {
            console.error(err)
            setMcq([])
        })
    }



    let mcqShow
    if (mcq.length === 0) {
        mcqShow = 'No mcq available'
    }
    else {
        mcqShow = mcq.map((item, index) => {
            return (
                <div className='card card-body border my-3'>
                    <div className='font-bold'>{index + 1}. {item.question}</div>
                    <div className='flex justify-between mt-3'>
                        {item.options.map(item => <div>{item.option}. {item.value}</div>)}
                    </div>
                </div>
            )
        })
    }



    return (
        <div>


            <h2 className='text-2xl my-10 font-bold text-center'>All MCQ</h2>

            <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

                <div className='flex'>
                    <div className='mb-5 me-7'>
                        <span className="label label-text">Curriculum: </span>
                        <select className='select select-bordered' name="curriculumId" onChange={(e) => handleChange(e)} id="">
                            {/* <option selected>Select</option> */}
                            {curriculum.map((item, index) => <option selected={state.curriculumId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.curriculum}</option>)}
                        </select>
                    </div>

                    <div className='mb-5 me-7'>
                        <span className="label label-text">Subject: </span>
                        {/* {console.log(subject)} */}
                        <select className='select select-bordered' name="subjectId" onChange={(e) => handleChange(e)} id="">
                            {subject.map((item, index) => <option selected={state.subjectId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.subject}</option>)}
                        </select>
                    </div>

                    <div className='mb-5 me-7'>
                        <span className="label label-text">Chapter: </span>
                        {/* {console.log(chapter)} */}
                        <select className='select select-bordered' name="chapterId" onChange={(e) => handleChange(e)} id="">

                            {chapter.map((item, index) => <option selected={state.chapterId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.chapter}</option>)}
                        </select>
                    </div>

                    <div className='mb-5 me-7'>
                        <span className="label label-text">Module: </span>
                        <select className='select select-bordered' name="moduleId" onChange={(e) => handleChange(e)} id="">
                            {module.map((item, index) => <option selected={state.moduleId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.module}</option>)}
                        </select>
                    </div>
                </div>


                <button className='btn btn-info block' type="submit">Search</button>
            </form>



            <div className='my-10'>
                {mcqShow}
            </div>

            {spin && <Spinner />}

        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AllMcq)