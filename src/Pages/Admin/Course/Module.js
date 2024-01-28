import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { addModuleMaterialsApi, createModuleApi, getAModuleApi, getModulesApi, removeModuleMaterialsApi } from '../../../Api/Admin/ModuleApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { getAllExamApi, uploadSolutionApi } from '../../../Api/Admin/ExamApi'
import { showFile } from '../../../Functions/CustomFunction'
import Spinner from '../../../components/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { createFocusApi, getFocusApi, removeFocusApi, updateFocusApi } from '../../../Api/Admin/FocusApi'


export const Module = (props) => {

    const location = useLocation()
    const [exam, setExam] = useState([])
    const [materials, setMaterials] = useState([])
    const [spin, setSpin] = useState(false)
    const [selectedFocus, setSelectedFocus] = useState(null);
    const [focusState, setFocusState] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        chapterId: '',
        subjectId: '',
        curriculumId: '',
        moduleId: '',
    });
    const [focus, setFocus] = useState([]);
    const [state, setState] = useState({
        module: '',
        paid: false
    })
    const [updateMaterial, setUpdateMaterial] = useState({})
    const [solution, setSolution] = useState({});


    useEffect(() => {

        if (location.state) {


            let { module } = location.state

            setSpin(true)
            getAModuleApi(module._id).then(data => {

                if (data.error) throw data.message
                setMaterials([...data.data.materials])
            }).catch(err => console.log(err))


            getAllExamApi({ moduleId: module._id }).then(data => {
                setSpin(false)
                if (data.error) throw data.message
                setExam([...data.data])

            }).catch(err => console.log(err))


            getFocusApi({ moduleId: module._id }).then((data) => {

                if (data.error) throw data.message;
                setFocus([...data.data]);
            }).catch(err => { })

        }
    }, [location]);


    const removeMaterial = (position) => {
        setSpin(true)
        removeModuleMaterialsApi(location.state.module._id, position).then(data => {
            setSpin(false)
            window.alert(data.message)
        })
    }

    const addMaterial = (e) => {

        e.preventDefault()
        setSpin(true)
        addModuleMaterialsApi(location.state.module._id, updateMaterial).then(data => {
            setSpin(false)
            window.alert(data.message)
        })

    }


    const uploadSolution = (e, examId) => {
        e.preventDefault()

        setSpin(true)

        uploadSolutionApi(examId, solution).then(data => {
            setSpin(false)
            window.alert(data.message)
        })

    }


    const handleFocusChange = e => {
        setFocusState({
            ...focusState,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
        })
    }


    const handleFocusSubmit = e => {
        e.preventDefault()

        setSpin(true);
        createFocusApi({ ...focusState, subjectId: location.state.module.subjectId._id, curriculumId: location.state.module.curriculumId._id, chapterId: location.state.module.chapterId._id, moduleId: location.state.module._id }).then(data => {
            setSpin(false); //
            window.alert(data.message);
        })

        document.getElementById('addFocusModal').close()

    }


    const updateFocus = (item) => {

        setSelectedFocus(item)
        setFocusState({
            ...focusState,
            title: item.title,
            description: item.description,
            startTime: item.startTime,
            endTime: item.endTime,
        })

        document.getElementById('updateFocusModal').showModal()

    }


    const handleUpdatedFocusSubmit = (e) => {
        e.preventDefault()
        setSpin(true);
        updateFocusApi(selectedFocus._id, focusState).then(data => {
            setSpin(false);
            window.alert(data.message);
            document.getElementById('updateFocusModal').close()
        })
    }

    const removeFocus = (id) => {
        setSpin(true);
        removeFocusApi(id).then(data => {
            setSpin(false);
            window.alert(data.message);
        })
    }





    return (
        <div>
            <div className='my-10 text-2xl text-center font-bold'>Module: {location.state ? location.state.module.module : ''}</div>

            <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span></div>


            <div>

                <div className='flex flex-col md:flex-row'>
                    {materials.map((item, index) => {
                        return (<div className='my-3 flex border-2 p-2 shadow me-3 hover:badge-outline rounded'>
                            <div><span onClick={() => showFile(item)} className="p-3 hover:text-red-800 cursor-pointer">{item.name} </span><span onClick={() => removeMaterial(index)} className='hover:text-red-800 p-3 fa-xl rounded cursor-pointer'> <FontAwesomeIcon icon={faCircleXmark} /> </span></div>

                        </div>)
                    })}
                </div>

                <div className='my-10'>
                    <form onSubmit={e => addMaterial(e)} action="">
                        <input required multiple onChange={e => setUpdateMaterial({ ...updateMaterial, materials: e.target.files })} className='file-input' type="file" name="materials" id="" />
                        <button className='btn btn-info' type='submit'>Add Materials</button>
                    </form>
                </div>



                <div className="bg-red-800 p-3 text-center my-10 text-xl">
                    <span className="text-white rounded">Focus</span>
                </div>

                <div>

                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {focus.map(item => {
                            return (
                                <div className={`card border hover:border-red-800 hover:shadow-lg card-body ${(new Date() >= new Date(item.endTime) || new Date() <= new Date(item.startTime) ? ' bg-red-100' : '')}`}>
                                    <div className=" card-title">{item.title}</div>
                                    <div className=" text-sm">{new Date(item.startTime).toLocaleString()} ~ {new Date(item.endTime).toLocaleString()}</div>
                                    <div className="my-5">{item.description}</div>
                                    <div onClick={e => showFile(item.attachment)} className="btn btn-sm btn-outline">See Attachment</div>


                                    <div onClick={e => updateFocus(item)} className="btn btn-warning btn-sm">Update</div>
                                    <div onClick={e => removeFocus(item._id)} className="btn btn-error btn-sm">Remove</div>

                                </div>
                            )
                        })}


                        <dialog id="updateFocusModal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>

                                <h3 className="font-bold text-lg">Update Focus</h3>
                                <form onSubmit={e => handleUpdatedFocusSubmit(e)} className="" action="">
                                    <label className="label label-text" htmlFor="">Title*</label>
                                    <input name="title" value={focusState.title} onChange={e => handleFocusChange(e)} placeholder="" className="input input-bordered w-full my-3" type="text" />

                                    <label className="label label-text" htmlFor="">Description</label>
                                    <textarea name="description" value={focusState.description} onChange={e => handleFocusChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                                    <label className="label label-text" htmlFor="">Start Time*</label>
                                    <input name="startTime" value={focusState.startTime} onChange={e => handleFocusChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                                    <label className="label label-text" htmlFor="">End Time*</label>
                                    <input name="endTime" value={focusState.endTime} onChange={e => handleFocusChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                                    <label className="label label-text" htmlFor="">Attachment*</label>
                                    <input name="attachment" onChange={e => handleFocusChange(e)} className="file-input w-full mb-3" type="file" />

                                    <button className="btn btn-warning mb-3" type="submit">Add</button>
                                </form>
                            </div>

                            {spin && <Spinner />}
                        </dialog>


                    </div>

                    <div className="my-10 "><button className="btn btn-primary" onClick={e => document.getElementById('addFocusModal').showModal()}>Add Focus</button></div>
                    <dialog id="addFocusModal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg">Add New Focus</h3>
                            <form onSubmit={e => handleFocusSubmit(e)} className="" action="">
                                <label className="label label-text" htmlFor="">Title*</label>
                                <input name="title" value={focusState.title} onChange={e => handleFocusChange(e)} required placeholder="" className="input input-bordered w-full my-3" type="text" />

                                <label className="label label-text" htmlFor="">Description</label>
                                <textarea name="description" value={focusState.description} onChange={e => handleFocusChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                                <label className="label label-text" htmlFor="">Start Time*</label>
                                <input name="startTime" value={focusState.startTime} onChange={e => handleFocusChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

                                <label className="label label-text" htmlFor="">End Time*</label>
                                <input name="endTime" value={focusState.endTime} onChange={e => handleFocusChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

                                <label className="label label-text" htmlFor="">Attachment*</label>
                                <input name="attachment" onChange={e => handleFocusChange(e)} required className="file-input w-full mb-3" type="file" />

                                <button className="btn btn-warning mb-3" type="submit">Add</button>
                            </form>
                        </div>

                        {spin && <Spinner />}
                    </dialog>
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
                                    {item.solution && <button onClick={() => showFile(item.solution)} className="btn btn-neutral" >
                                        {item.solution.name}
                                    </button>}
                                </div>

                                <div className="my-5">
                                    <form onSubmit={(e) => uploadSolution(e, item._id)} action="">
                                        <div className="font-bold mb-2">Upload Solution: </div>
                                        <input onChange={(e) => setSolution({ ...solution, [e.target.name]: e.target.files[0], })} type="file" name="solution" id="" />
                                        <button type="submit">Upload</button>
                                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Module)