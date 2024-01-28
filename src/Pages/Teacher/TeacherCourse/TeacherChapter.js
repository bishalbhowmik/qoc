import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { showFile } from '../../../Functions/CustomFunction'
import { getAChapterApi } from '../../../Api/Admin/ChapterApi'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import Spinner from '../../../components/Spinner'


export const TeacherChapter = (props) => {
    const location = useLocation()
    const [modules, setModules] = useState([])
    const [materials, setMaterials] = useState([])
    const [exam, setExam] = useState([])
    const [spin, setSpin] = useState(false)
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
                setExam([...data.data])

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
        }

    }, [location]);



    let moduleShow
    if (modules.length === 0) {
        moduleShow = <div className='text-center col-span-full'>Not module found</div>
    }
    else {
        moduleShow = modules.map((item, index) => {
            return (
                <Link to='/teacher-dashboard/module' state={{ module: item }} className='card text-white bg-red-950 glass hover:bg-slate-600 hover:text-white '>
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


            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-10'>
                {moduleShow}
            </div>

            <div>

                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>MATERIALS</span></div>

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
                    <div className='text-center my-20 bg-red-800 p-3 text-xl'><span className=' text-white rounded'>Paper Solution</span></div>

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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherChapter)