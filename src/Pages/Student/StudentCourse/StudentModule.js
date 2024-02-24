import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { createModuleApi, getAModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'
import { showFile } from '../../../Functions/CustomFunction'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import bufferToDataUrl from 'buffer-to-data-url'
import Spinner from '../../../components/Spinner'
import { getFocusApi } from '../../../Api/Admin/FocusApi'

export const StudentModule = (props) => {

    const [exam, setExam] = useState([])
    const [materials, setMaterials] = useState([])
    const [focus, setFocus] = useState([]);
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
            
            
            getFocusApi({ moduleId: module._id }).then((data) => {
                console.log(data)
                if (data.error) throw data.message;
                setFocus(data.data.filter(item => new Date() >= new Date() >= new Date(item.startTime) && new Date() <= new Date(item.endTime)));
            }).catch(err => { })

        }
    }, [location]);

    return (
        <div>
            <div className='my-10 text-2xl text-center font-bold'>Module: {location.state ? location.state.module.module : ''}</div>

            <div>

                <div className='bg-red-800 p-3 text-center my-20 text-xl'> <span className='text-white rounded'>MATERIALS</span></div>

                <div className='flex flex-col md:flex-row'>
                    {materials.map(item => {
                        return (
                            <div onClick={()=>showFile(item)} className="btn btn-outline md:me-4 p-2 mt-2">
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
                                <div className=" text-sm">{new Date(item.startTime).toLocaleString()} ~ {new Date(item.endTime).toLocaleString()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentModule)