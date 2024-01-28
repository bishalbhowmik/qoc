import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { addModuleMaterialsApi, createModuleApi, getAModuleApi, getModulesApi, removeModuleMaterialsApi } from '../../../Api/Admin/ModuleApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import { showFile } from '../../../Functions/CustomFunction'


export const Module = (props) => {

    const location = useLocation()
    const [exam, setExam] = useState([])
    const [materials, setMaterials] = useState([])
    const [state, setState] = useState({
        module: '',
        paid: false
    })
    const [updateMaterial, setUpdateMaterial] = useState({})

    useEffect(() => {

        if (location.state) {

            

            let { module } = location.state

            getAModuleApi(module._id).then(data => {
                console.log(data)
                if (data.error) throw data.message
                setMaterials([...data.data.materials])
            }).catch(err => console.log(err))


            getAllExamApi({ moduleId: module._id }).then(data => {
                if (data.error) throw data.message
                setExam([...data.data])

            })
                .catch(err => {

                })

        }
    }, [location]);


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }


    const removeMaterial = (position) => {
        removeModuleMaterialsApi(location.state.module._id, position).then(data => {
            console.log(data)
            window.alert(data.message)
        })
    }

    const addMaterial = (e) => {

        e.preventDefault()
        addModuleMaterialsApi(location.state.module._id, updateMaterial).then(data => {
            console.log(data)
            window.alert(data.message)
        })

    }




    return (
        <div>
            <div className='my-10 text-2xl text-center font-bold'>Module: {location.state ? location.state.module.module : ''}</div>

            <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span></div>

            
            <div>
                
                <div className='flex flex-col md:flex-row justify-center'>
                    {materials.map((item, index) => {
                        return (<div className='my-5 flex border p-2 shadow bg-slate-100 me-3'>
                            <div onClick={() => showFile(item)} className="btn btn-outline">{item.name}</div>
                            <button onClick={() => removeMaterial(index)} className='btn btn-error'>X</button>
                        </div>)
                    })}


                </div>

                <div className='my-10'>
                    <form onSubmit={e => addMaterial(e)} action="">
                        <input required multiple onChange={e => setUpdateMaterial({ ...updateMaterial, materials: e.target.files })} className='file-input' type="file" name="materials" id="" />
                        <button className='btn btn-info' type='submit'>Add Materials</button>
                    </form>
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
                                    {item.solution && <object className='' height='700px' data={bufferToDataUrl(item.solution.contentType, item.solution.data)} type=""></object>}
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




            {/* Modal Start*/}

            <dialog id="addModuleModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Add New Module</h3>


                    <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

                        <div className='mb-5'>
                            <span className="label label-text">Module Name: </span>
                            <input required name='module' onChange={e => handleChange(e)} value={state.module} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div className='mb-5'>
                            <span className="label label-text">Paid: </span>
                            <select className='select select-bordered w-full' onChange={e => handleChange(e)} name="paid" id="">
                                {/* <option disabled>Select</option> */}
                                <option value={true}>Yes</option>
                                <option value={false} selected>No</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <span className="label label-text">Materials: </span>
                            <input onChange={e => handleChange(e)} multiple name='materials' type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>

                        <button className='btn btn-warning block' type="submit">Confirm</button>
                    </form>
                </div>
            </dialog>




        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Module)