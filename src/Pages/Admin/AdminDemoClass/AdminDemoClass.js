import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { showFile } from "../../../Functions/CustomFunction";
import Spinner from "../../../components/Spinner";
import { createDemoClassApi, getDemoClassApi, removeDemoClassApi, updateDemoClassApi } from "../../../Api/Admin/DemoClassApi";
import { getSubjectsApi } from "../../../Api/Admin/SubjectApi";
import { getAllCurriculumApi } from "../../../Api/Admin/CurriculumApi";
import { getChaptersApi } from "../../../Api/Admin/ChapterApi";


export const AdminDemoClass = (props) => {


    const [spin, setSpin] = useState(false);
    const [selectedDemoClass, setSelectedDemoClass] = useState(null);
    const [curriculum, setCurriculum] = useState([])
    const [subject, setSubject] = useState([])
    const [chapter, setChapter] = useState([])
    const [demoClassState, setDemoClassState] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        chapterId: '',
        subjectId: '',
        curriculumId: '',
        classTime: '',
        classLink: ''
    });
    const [demoClass, setDemoClass] = useState([]);


    useEffect(() => {

        setSpin(true)
        getAllCurriculumApi().then(data => {

            if (data.error) {
                setCurriculum([])
                setSubject([])
            }
            else {
                setCurriculum(['', ...data.data])
            }
        })

        getDemoClassApi().then(data => {
            setSpin(false)
            if (data.error) throw data.message
            setDemoClass([...data.data])
        }).catch(err => {
            console.log(err)
        })


    }, []);


    const handleDemoClassChange = e => {


        if (e.target.value != '') {
            if (e.target.name === 'curriculumId') {


                setSpin(true)

                getSubjectsApi(e.target.value).then(data => {
                    setSpin(false)
                    if (data.error) {
                        setSubject([])
                        setDemoClassState({ ...demoClassState, [e.target.name]: e.target.value, subjectId: '' })
                    }
                    else {
                        setSubject(['', ...data.data])
                        setDemoClassState({ ...demoClassState, [e.target.name]: e.target.value, subjectId: '' })

                    }

                })

            }
            else if (e.target.name === 'subjectId') {
                setSpin(true)
                getChaptersApi(e.target.value).then(data => {
                    setSpin(false)
                    if (data.error) {
                        setChapter([])

                        setDemoClassState({ ...demoClassState, [e.target.name]: e.target.value, chapterId: '', moduleId: '', })

                    }
                    else {
                        setChapter(['', ...data.data])
                        setDemoClassState({ ...demoClassState, [e.target.name]: e.target.value, moduleId: '', chapterId: '' })

                    }
                })
            }

            setDemoClassState({
                ...demoClassState,
                [e.target.name]: e.target.value
            })
        }
    }


    const handleDemoClassSubmit = e => {
        e.preventDefault()
        console.log(demoClassState)
        setSpin(true);
        createDemoClassApi(demoClassState).then(data => {
            console.log(data)
            setSpin(false); //
            window.alert(data.message);

            document.getElementById('addDemoClassModal').close()

        })



    }


    const updateDemoClass = (item) => {

        setSelectedDemoClass(item)
        setDemoClassState({
            ...demoClassState,
            curriculumId: item.curriculumId,
            subjectId: item.subjectId,
            title: item.title,
            description: item.description,
            startTime: item.startTime,
            endTime: item.endTime,
            chapterId: item.chapterId,
            classTime:  item.classTime ,
            classLink:  item.classLink
        })

        document.getElementById('updateDemoClassModal').showModal()

    }


    const handleUpdatedDemoClassSubmit = (e) => {
        e.preventDefault()
        setSpin(true);
        updateDemoClassApi(selectedDemoClass._id, demoClassState).then(data => {
            setSpin(false);
            window.alert(data.message);
            document.getElementById('updateDemoClassModal').close()
        })
    }

    const removeDemoClass = (id) => {
        setSpin(true);
        removeDemoClassApi(id).then(data => {
            setSpin(false);
            window.alert(data.message);
        })
    }



    return (
        <div>

            <div>

                <div className="my-10 ">
                    <button className="btn btn-primary" onClick={e => document.getElementById('addDemoClassModal').showModal()}>Add Demo Class</button>
                </div>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {demoClass.map(item => {
                        return (
                            <div className={`card border hover:border-red-800 hover:shadow-lg card-body ${(new Date() >= new Date(item.endTime) || new Date() <= new Date(item.startTime) ? ' bg-red-100' : '')}`}>
                                <div className=" card-title">{item.title}</div>
                                <div className=" text-sm">{new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })} ~ {new Date(item.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
                                <div className="my-5">{item.description}</div>
                                <div onClick={e => showFile(item.attachment)} className="btn btn-sm btn-outline">See Attachment</div>


                                <div onClick={e => updateDemoClass(item)} className="btn btn-warning btn-sm">Update</div>
                                <div onClick={e => removeDemoClass(item._id)} className="btn btn-error btn-sm">Remove</div>

                            </div>
                        )
                    })}


                    <dialog id="updateDemoClassModal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg">Update DemoClass</h3>
                            <form onSubmit={e => handleUpdatedDemoClassSubmit(e)} className="" action="">
                                <label className="label label-text" htmlFor="">Title*</label>
                                <input name="title" value={demoClassState.title} onChange={e => handleDemoClassChange(e)} placeholder="" className="input input-bordered w-full my-3" type="text" />

                                <label className="label label-text" htmlFor="">Description</label>
                                <textarea name="description" value={demoClassState.description} onChange={e => handleDemoClassChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                                <label className="label label-text" htmlFor="">Start Time*</label>
                                <input name="startTime" value={demoClassState.startTime} onChange={e => handleDemoClassChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                                <label className="label label-text" htmlFor="">End Time*</label>
                                <input name="endTime" value={demoClassState.endTime} onChange={e => handleDemoClassChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                                <label className="label label-text" htmlFor="">Class Link*</label>
                                <input name="classLink" value={demoClassState.classLink} onChange={e => handleDemoClassChange(e)} className="input input-bordered mb-3 w-full" type="text" />

                                <label className="label label-text" htmlFor="">Class Time*</label>
                                <input name="classTime" value={demoClassState.classTime} onChange={e => handleDemoClassChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />


                                <button className="btn btn-warning mb-3" type="submit">Add</button>
                            </form>
                        </div>

                        {spin && <Spinner />}
                    </dialog>


                </div>

                <dialog id="addDemoClassModal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <h3 className="font-bold text-lg">Add New Demo Class</h3>
                        <form onSubmit={e => handleDemoClassSubmit(e)} className="" action="">

                            <div className='mb-5'>
                                <span className="label label-text">Curriculum*: </span>
                                <select required className='select select-bordered w-full' name="curriculumId" onChange={(e) => handleDemoClassChange(e)} id="">
                                    {/* <option selected>Select</option> */}
                                    {curriculum.map((item, index) => <option selected={demoClassState.curriculumId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.curriculum}</option>)}
                                </select>
                            </div>

                            <div className='mb-5'>
                                <span className="label label-text">Subject: </span>
                                {/* {console.log(subject)} */}
                                <select className='select select-bordered w-full' name="subjectId" onChange={(e) => handleDemoClassChange(e)} id="">
                                    {subject.map((item, index) => <option selected={demoClassState.subjectId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.subject}</option>)}
                                </select>
                            </div>

                            <div className='mb-5'>
                                <span className="label label-text">Chapter: </span>
                                {/* {console.log(subject)} */}
                                <select className='select select-bordered w-full' name="chapterId" onChange={(e) => handleDemoClassChange(e)} id="">
                                    {chapter.map((item, index) => <option selected={demoClassState.chapterId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.chapter}</option>)}
                                </select>
                            </div>


                            <label className="label label-text" htmlFor="">Title*</label>
                            <input name="title" value={demoClassState.title} onChange={e => handleDemoClassChange(e)} required placeholder="" className="input input-bordered w-full my-3" type="text" />

                            <label className="label label-text" htmlFor="">Description</label>
                            <textarea name="description" value={demoClassState.description} onChange={e => handleDemoClassChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                            <label className="label label-text" htmlFor="">Start Time (Visibility)*</label>
                            <input name="startTime" value={demoClassState.startTime} onChange={e => handleDemoClassChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

                            <label className="label label-text" htmlFor="">End Time (Visibility)*</label>
                            <input name="endTime" value={demoClassState.endTime} onChange={e => handleDemoClassChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

                            <label className="label label-text" htmlFor="">Class Time*</label>
                            <input name="classTime" value={demoClassState.classTime} onChange={e => handleDemoClassChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />


                            <label className="label label-text" htmlFor="">Class Link*</label>
                            <input name="classLink" value={demoClassState.classLink} onChange={e => handleDemoClassChange(e)} required className="input input-bordered mb-3 w-full" type="text" />
                            

                            <button className="btn btn-warning mb-3" type="submit">Add</button>
                        </form>
                    </div>

                    {spin && <Spinner />}
                </dialog>
            </div>




            {/* Modal Start*/}


            {spin && <Spinner />}
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDemoClass);
