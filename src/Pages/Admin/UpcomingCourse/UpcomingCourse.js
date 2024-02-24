import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { showFile } from "../../../Functions/CustomFunction";
import Spinner from "../../../components/Spinner";
import { createResourceApi, getResourceApi, removeResourceApi, updateResourceApi } from "../../../Api/Admin/ResourceApi";
import { getSubjectsApi } from "../../../Api/Admin/SubjectApi";
import { getAllCurriculumApi } from "../../../Api/Admin/CurriculumApi";
import { createUpcomingCourseApi, getUpcomingCourseApi, removeUpcomingCourseApi } from "../../../Api/Admin/UpcomingCourseApi";


export const UpcomingCourse = (props) => {


    const [spin, setSpin] = useState(false);
    const [curriculum, setCurriculum] = useState([])
    const [subject, setSubject] = useState([])
    const [upcomingCourseState, setUpcomingCourseState] = useState({
        title: '',
        description: '',
        startDate: '',
        curriculumId: '',
    });
    const [upcomingCourse, setUpcomingCourse] = useState([]);


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

        getUpcomingCourseApi().then(data => {
            console.log(data)
            setSpin(false)
            if (data.error) throw data.message
            setUpcomingCourse([...data.data])
        }).catch(err => {
            console.log(err)
        })


    }, []);


    const handleChange = e => {

        setUpcomingCourseState({
            ...upcomingCourseState,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        console.log(upcomingCourseState)
        e.preventDefault()

        setSpin(true);
        createUpcomingCourseApi(upcomingCourseState).then(data => {
            console.log(data)
            setSpin(false); //
            window.alert(data.message);

            document.getElementById('addUpcomingCourseModal').close()

        })



    }


    const remove = (id) => {
        setSpin(true);
        removeUpcomingCourseApi(id).then(data => {
            setSpin(false);
            window.alert(data.message);
        })
    }



    return (
        <div>

            <div>

                <div className="my-10 ">
                    <button className="btn btn-primary" onClick={e => document.getElementById('addUpcomingCourseModal').showModal()}>Add Upcoming Course</button>
                </div>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {upcomingCourse.map(item => {
                        return (
                            <div className={`card border hover:border-red-800 hover:shadow-lg card-body`}>
                                <div className=" card-title">{item.title}</div>
                                <div className=" text-sm">{new Date(item.startDate).toLocaleString()}</div>
                                <div className="my-5">{item.description}</div>
                                <div className="my-5"># {item.curriculumId.curriculum}</div>

                                <div onClick={e => remove(item._id)} className="btn btn-error btn-sm">Remove</div>

                            </div>
                        )
                    })}

                </div>

                <dialog id="addUpcomingCourseModal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <h3 className="font-bold text-lg">Add New Upcoming Course</h3>
                        <form onSubmit={e => handleSubmit(e)} className="" action="">

                            <div className='mb-5'>
                                <span className="label label-text">Curriculum*: </span>
                                <select required className='select select-bordered w-full' name="curriculumId" onChange={(e) => handleChange(e)} id="">
                                    {curriculum.map((item, index) => <option selected={upcomingCourseState.curriculumId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.curriculum}</option>)}
                                </select>
                            </div>


                            <label className="label label-text" htmlFor="">Title*</label>
                            <input name="title" value={upcomingCourseState.title} onChange={e => handleChange(e)} required placeholder="" className="input input-bordered w-full my-3" type="text" />

                            <label className="label label-text" htmlFor="">Description</label>
                            <textarea name="description" value={upcomingCourseState.description} onChange={e => handleChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                            <label className="label label-text" htmlFor="">Start Date*</label>
                            <input name="startDate" value={upcomingCourseState.startDate} onChange={e => handleChange(e)} required className="input input-bordered mb-3 w-full" type="date" />

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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingCourse);
