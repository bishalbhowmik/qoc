import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import { getFocusApi } from '../../../Api/Admin/FocusApi'
import { getASubjectsApi } from '../../../Api/Admin/SubjectApi'
import { showFile } from '../../../Functions/CustomFunction'
import Spinner from '../../../components/Spinner'

export const StudentSubject = (props) => {

    const location = useLocation()
    const [chapter, setChapter] = useState([])
    const [outlines, setOutlines] = useState([])
    const [materials, setMaterials] = useState([])
    const [spin, setSpin] = useState(false)
    const [exam, setExam] = useState([])
    const [focus, setFocus] = useState([]);
    const [state, setState] = useState({
        chapter: '',
        paid: false
    })

    useEffect(() => {

        // const subject = useState()

        if (location.state) {

            const { subject } = location.state

            setSpin(true)
            getASubjectsApi(subject._id).then(data => {
                if (data.error) throw data.message
                setOutlines([...data.data.outlines])
                setMaterials([...data.data.materials])
            }).catch(err => console.log(err))


            getAllExamApi({ subjectId: subject._id }).then(data => {
                if (data.error) throw data.message
                setExam(data.data.filter(item => !item.hasOwnProperty('chapterId') && !item.hasOwnProperty('moduleId')))

            })
                .catch(err => {

                })


            getChaptersApi(subject._id).then(data => {
                console.log('update: ', data)
                setSpin(false)
                if (data.error) throw data.message
                setChapter([...data.data])
            }).catch(err => {
                console.log(err)
            })

            getFocusApi({ subjectId: subject._id }).then((data) => {
                console.log(data)
                if (data.error) throw data.message;
                setFocus(data.data.filter(item => !item.hasOwnProperty('chapterId') && !item.hasOwnProperty('moduleId')));
            }).catch(err => { })
        }

    }, [location]);


    let chapterShow
    if (chapter.length === 0) {
        chapterShow = <div className='text-center col-span-full'>Not chapter found</div>
    }
    else {
        chapterShow = chapter.map((item, index) => {
            return (
                <Link to='/student-dashboard/chapter' state={{ chapter: item }} className='card text-white bg-red-950 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.chapter}</div>
                    </div>
                </Link>
            )
        })
    }



    return (
        <div>


            <div className='mb-10 text-2xl text-center font-bold'>Subject: {location.state ? location.state.subject.subject : ''}</div>

            <div className='bg-red-800 p-3 mb-16 text-xl text-center'><span className='text-white rounded'>ALL CHAPTERS</span> </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-5  mt-10'>
                {chapterShow}
            </div>

            <div>
                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>OUTLINES</span> </div>


                <div className='flex flex-wrap  flex-col md:flex-row'>
                    {outlines.map(item => {
                        return (
                            <div onClick={() => showFile(item)} className="btn btn-outline md:me-4 p-2 mt-2">
                                {item.name}
                            </div>
                        )
                    })}
                </div>


                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>MATERIALS</span> </div>

                <div className='flex flex-wrap  flex-col md:flex-row'>
                    {materials.map(item => {
                        return (
                            <div onClick={() => showFile(item)} className="btn btn-outline md:me-4 p-2 mt-2">
                                {item.name}
                            </div>
                        )
                    })}
                </div>


                <div className="bg-red-800 p-3 text-center my-10 text-xl">
                    <span className="text-white rounded">Focus</span>
                </div>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {focus.map(item => {
                        return (
                            <div className="card border hover:border-red-800 hover:shadow-lg card-body">
                                <div className=" card-title">{item.title}</div>
                                <div className=" text-sm">{new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })} ~ {new Date(item.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
                                <div className="my-5">{item.description}</div>
                                <div onClick={e => showFile(item.attachment)} className="btn btn-sm btn-outline">See Attachment</div>

                            </div>
                        )
                    })}
                </div>


                <div>
                    <div className='text-center my-10 bg-red-800 p-3 text-xl'><span className=' text-white rounded'>Paper Solution</span></div>

                    {exam.length === 0 ? <div className='p-40 text-center col-span-12'>Not Exam found</div> : exam.map(item => {
                        return (<div className='card glass my-10 shadow-lg m-auto'>
                            <div className="card-body">
                                <div className='text-center text-2xl font-bold'>{item.exam}</div>

                                <div className='my-5'>
                                    <div className='font-bold mb-2'>Broad Questions: </div>
                                    {item.broadQuestionsId && item.broadQuestionsId.length != 0 && item.broadQuestionsId.map((item, index) => {
                                        return (
                                            <div><strong>{index + 1}.</strong> {item.question} <br />
                                                {/* {item.questionAttachment && <object height='500px' width='500px' data={process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + item.questionAttachment.name} type=""></object>} */}
                                                {item.questionAttachment && <button className='btn btn-sm mt-5' onClick={() => showFile(item.questionAttachment)}>See attachment</button>}</div>
                                        )
                                    })}
                                </div>

                                <div className='my-5'>
                                    <div className='font-bold mb-2'>Mcq: </div>
                                    {item.mcqsId && item.mcqsId.length != 0 && item.mcqsId.map((item, index) => {
                                        return (
                                            <div>{index + 1}. {item.question}</div>
                                        )
                                    })}
                                </div>

                                <div className='my-5'>
                                    <div className='font-bold mb-2'>Solution: </div>
                                    {item.solution && <button onClick={() => showFile(item.solution)} className="btn btn-neutral" >{item.solution.name}</button>}
                                </div>

                            </div>
                        </div>)

                    })}


                </div>
            </div>

            {spin && <Spinner />}

        </div>
    )
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(StudentSubject)