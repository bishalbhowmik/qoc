import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { getASubjectsApi } from '../../../Api/Admin/SubjectApi'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import { showFile } from '../../../Functions/CustomFunction'


export const TeacherSubject = (props) => {
    const location = useLocation()
    const [chapter, setChapter] = useState([])
    const [outlines, setOutlines] = useState([])
    const [materials, setMaterials] = useState([])
    const [exam, setExam] = useState([])
    const [state, setState] = useState({
        chapter: '',
        paid: false
    })

    useEffect(() => {

        if (location.state) {

            const { subject } = location.state

            getASubjectsApi(subject._id).then(data => {
                if (data.error) throw data.message
                setOutlines([...data.data.outlines])
                setMaterials([...data.data.materials])
            }).catch(err => console.log(err))


            getAllExamApi({ subjectId: subject._id }).then(data => {
                if (data.error) throw data.message
                setExam([...data.data])

            })
                .catch(err => {

                })


            getChaptersApi(subject._id).then(data => {
                if (data.error) throw data.message
                setChapter([...data.data])
            }).catch(err => {
                console.log(err)
            })
        }

    }, [location]);


    let chapterShow
    if (chapter.length === 0) {
        chapterShow = <div className='text-center col-span-12'>Not chapter found</div>
    }
    else {
        chapterShow = chapter.map((item, index) => {
            return (
                <Link to='/teacher-dashboard/chapter' state={{ chapter: item }} className='card  col-span-6 md:col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.chapter}</div>
                    </div>
                </Link>
            )
        })
    }



    return (
        <div>


            <div className='my-10 text-2xl text-center font-bold'>Subject: {location.state ? location.state.subject.subject : ''}</div>

            <div className='bg-red-800 p-3 mb-16 text-xl text-center'><span className='text-white rounded'>ALL CHAPTERS</span> </div>

            <div className='grid gap-10 grid-cols-12 mt-10'>
                {chapterShow}
            </div>

            <div>
                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>OUTLINES</span> </div>


                <div className='flex flex-col md:flex-row'>
                    {outlines.map(item => {
                        return (
                            <div onClick={() => showFile(item)} className="btn btn-outline md:me-4 p-2 mt-2">
                                {item.name}
                            </div>
                        )
                    })}
                </div>


                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>MATERIALS</span> </div>

                <div className='flex flex-col md:flex-row'>
                    {materials.map(item => {
                        return (
                            <div onClick={() => showFile(item)} className="btn btn-outline md:me-4 p-2 mt-2">
                                {item.name}
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
                                            <div>{index + 1}. {item.question}</div>
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
                                    {item.solution && <object className='' height='700px' data={bufferToDataUrl(item.solution.contentType, item.solution.data)} type=""></object>}
                                </div>

                            </div>
                        </div>)

                    })}


                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(TeacherSubject)