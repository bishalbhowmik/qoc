import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getAChapterApi } from '../../../Api/Admin/ChapterApi'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import { getFocusApi } from '../../../Api/Admin/FocusApi'
import { getModulesApi } from '../../../Api/Admin/ModuleApi'
import { showFile } from '../../../Functions/CustomFunction'
import Spinner from '../../../components/Spinner'


export const StudentChapter = (props) => {

    const location = useLocation()
    const [modules, setModules] = useState([])
    const [materials, setMaterials] = useState([])
    const [spin, setSpin] = useState(false)
    const [focus, setFocus] = useState([]);
    const [exam, setExam] = useState([])
    const [state, setState] = useState({
        module: '',
        paid: false
    })

    useEffect(() => {

        if (location.state) {

            let { chapter } = location.state
            setSpin(true)
            getAChapterApi(chapter._id).then(data => {
                console.log(data)
                if (data.error) throw data.message
                setMaterials([...data.data.materials])
            }).catch(err => console.log(err))


            getAllExamApi({ chapterId: chapter._id }).then(data => {
                if (data.error) throw data.message
                setExam(data.data.filter(item => !item.hasOwnProperty('moduleId')))

            })
                .catch(err => {

                })

            getModulesApi(chapter._id).then(data => {
                setSpin(false)
                if (data.error) throw data.message
                setModules([...data.data])
            }).catch(err => {
                console.log(err)
            })


            getFocusApi({ chapterId: chapter._id }).then((data) => {
                console.log(data)
                if (data.error) throw data.message;
                setFocus(data.data.filter(item => !item.hasOwnProperty('moduleId')));
            }).catch(err => { })
        }

    }, [location]);



    let moduleShow
    if (modules.length === 0) {
        moduleShow = <div className='text-center col-span-full'>Not module found</div>
    }
    else {
        moduleShow = modules.map((item, index) => {
            return (
                <Link to='/student-dashboard/module' state={{ module: item }} className='card  text-white bg-red-950 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.module}</div>
                    </div>
                </Link>
            )
        })
    }



    return (
        <div>


            <div className='my-10 text-2xl text-center font-bold'>Chapter: {location.state ? location.state.chapter.chapter : ''}</div>

            <div className='bg-red-800 p-3 mb-16 text-xl text-center'> <span className='text-white rounded'>All MODULES</span></div>


            <div className='grid grid-cols-2 md:grid-cols-4 gap-5  mt-10'>
                {moduleShow}
            </div>

            <div>

                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>MATERIALS</span></div>

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
                    <div className='text-center my-20 bg-red-800 p-3 text-xl'><span className=' text-white rounded'>Paper Solution</span></div>

                    {exam.length === 0 ? <div className='p-40 text-center col-span-12'>Not Exam found</div> : exam.map(item => {
                        return (<div className='card glass my-10 shadow-lg m-auto'>
                            <div className="card-body">
                                <div className='text-center text-2xl font-bold'>{item.exam}</div>

                                <div className='my-5'>
                                    <div className='font-bold mb-2'>Broad Questions: </div>
                                    {item.broadQuestionsId && item.broadQuestionsId.length != 0 && item.broadQuestionsId.map((item, index) => {
                                        return (
                                            <div>
                                                <strong>{index + 1}.</strong> {item.question} <br />
                                                {item.questionAttachment && <button className='btn btn-sm mt-5' onClick={() => showFile(item.questionAttachment)}>See attachment</button>}
                                            </div>
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

                                <div className='my-5'>
                                    <div className='font-bold mb-2'>Upload Solution: </div>
                                    <input type="file" name="" id="" />
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StudentChapter)