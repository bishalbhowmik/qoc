import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createSubjectsApi, getSubjectsApi } from '../../../Api/Admin/SubjectApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import { showFile } from '../../../Functions/CustomFunction'
import axios from 'axios'
import { addCurriculumOutlineApi, getACurriculumApi, removeCurriculumOutlineApi } from '../../../Api/Admin/CurriculumApi'

export const Curriculum = (props) => {

    const location = useLocation()
    const [outlines, setOutlines] = useState([])
    const [subject, setSubject] = useState([])
    
    const [state, setState] = useState({
        subject: '',
        paid: false
    })

    const [updateState, setUpdateState] = useState({})

    useEffect(() => {

        if (location.state) {

            const { curriculum } = location.state

            getACurriculumApi(curriculum._id).then(data => {
                if (data.error) throw data.message
                setOutlines([...data.data.outlines])
            })

            getSubjectsApi(curriculum._id).then(data => {
                if (data.error) throw data.message
                setSubject([...data.data])
            }).catch(err => {
                console.log(err)
            })
        }

    }, [location]);

    console.log(subject)


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(state)

        createSubjectsApi({ ...state, curriculumId: location.state ? location.state.curriculum._id : '' }).then(data => {
            console.log(data)
            // if(data.error) throw data
        })
        // .catch(err => {
        //     console.log(err.data)
        // })
    }


    let subjectShow
    if (subject.length === 0) {
        subjectShow = <div className='p-40 text-center col-span-12'>Not Subject found</div>
    }
    else {
        subjectShow = subject.map((item, index) => {
            return (
                <Link to='/admin-dashboard/subject' state={{ subject: item }} className='card col-span-6 md:col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.subject}</div>
                    </div>
                </Link>
            )
        })
    }


    const removeOutline = (position) => {
        removeCurriculumOutlineApi(location.state.curriculum._id, position).then(data => {
            console.log(data)
        })
    }

    const addOutline = (e) => {

        e.preventDefault()
        addCurriculumOutlineApi(location.state.curriculum._id, updateState).then(data => {
            console.log(data)
        })

    }


    return (
        <div>

            <div className='my-10 text-2xl text-center font-bold'>Curriculum - {location.state ? location.state.curriculum.curriculum : ''}</div>

            <div className='bg-red-800 p-3 mb-16 text-center'><span className='text-white rounded'>ALL SUBJECTS</span></div>

            <button onClick={() => document.getElementById('addSubjectModal').showModal()} className='btn btn-success'>Add Subject</button>




            <div className='grid gap-10 grid-cols-12 mt-10'>
                {subjectShow}
            </div>

            <div>
                <div className='text-center my-10 bg-red-800 p-3'><span className=' text-white rounded'>OUTLINES</span></div>
                <div className='flex flex-col md:flex-row flex-wrap'>
                    {outlines.map((item, index) => {
                        return (<div className='my-10 flex border p-2 shadow bg-slate-100 me-3'>
                            <div onClick={() => showFile(item)} className="btn btn-outline">{item.name}</div>
                            <button onClick={() => removeOutline(index)} className='btn btn-error'>X</button>
                        </div>)
                    })}
                </div>

                <div className='my-10'>
                    <form onSubmit={e => addOutline(e)} action="">
                        <input required multiple onChange={e => setUpdateState({ ...updateState, outlines: e.target.files })} className='file-input' type="file" name="outlines" id="" />
                        <button className='btn btn-info' type='submit'>Add outline</button>
                    </form>
                </div>
            </div>


            {/* Modal Start*/}

            <dialog id="addSubjectModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Add New Subject</h3>


                    <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

                        <div className='mb-5'>
                            <span className="label label-text">Subject Name: </span>
                            <input required name='subject' onChange={e => handleChange(e)} value={state.subject} type="text" placeholder="Type here" className="input input-bordered w-full" />
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
                            <span className="label label-text">Outlines </span>
                            <input onChange={e => handleChange(e)} multiple name='outlines' type="file" className="file-input file-input-bordered w-full max-w-xs" />
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

export default connect(mapStateToProps)(Curriculum)