import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { createModuleApi, getAModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { showFile } from '../../../Functions/CustomFunction'
import Spinner from '../../../components/Spinner'


export const TeacherModule = (props) => {

    const [exam, setExam] = useState([])
    const [materials, setMaterials] = useState([])
    const [spin, setSpin] = useState(false)
    const location = useLocation()

    useEffect(() => {

        if (location.state) {

            let { module } = location.state
            setSpin(true)
            getAModuleApi(module._id).then(data => {
                console.log(data)
                if (data.error) throw data.message
                setMaterials([...data.data.materials])
            }).catch(err => console.log(err))


            getAllExamApi({ moduleId: module._id }).then(data => {
                setSpin(false)
                if (data.error) throw data.message
                setExam([...data.data])

            })
                .catch(err => {

                })

        }
    }, [location]);

    return (
        <div>
            <div className='my-10 text-2xl text-center font-bold'>Module: {location.state ? location.state.module.module : ''}</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherModule)