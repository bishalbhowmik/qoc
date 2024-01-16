import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import bufferToDataUrl from 'buffer-to-data-url'
import { getAllExamApi } from '../../../Api/Admin/ExamApi'
import { showFile } from '../../../Functions/CustomFunction'
import { addSubjectMaterialsApi, addSubjectOutlineApi, getASubjectsApi, removeSubjectMaterialsApi, removeSubjectOutlineApi } from '../../../Api/Admin/SubjectApi'


export const Subject = (props) => {

    const location = useLocation()
    const [chapter, setChapter] = useState([])
    const [outlines, setOutlines] = useState([])
    const [materials, setMaterials] = useState([])
    const [exam, setExam] = useState([])
    const [state, setState] = useState({
        chapter: '',
        paid: false
    })
    const [updateOutline, setUpdateOutline] = useState({})
    const [updateMaterial, setUpdateMaterial] = useState({})

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


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(state)

        createChapterApi({
            ...state,
            subjectId: location.state ? location.state.subject._id : '',
            curriculumId: location.state ? location.state.subject.curriculumId._id : '',

        }).then(data => {
            console.log(data)
            // if(data.error) throw data
        })
        // .catch(err => {
        //     console.log(err.data)
        // })
    }


    let chapterShow
    if (chapter.length === 0) {
        chapterShow = <div className='p-40 text-center col-span-12'>Not chapter found</div>
    }
    else {
        chapterShow = chapter.map((item, index) => {
            return (
                <Link to='/admin-dashboard/chapter' state={{ chapter: item }} className='card  col-span-6 md:col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.chapter}</div>
                    </div>
                </Link>
            )
        })
    }


    const removeOutline = (position) => {
        removeSubjectOutlineApi(location.state.subject._id, position).then(data => {
            window.alert(data.message)
        })
    }

    const addOutline = (e) => {

        e.preventDefault()
        addSubjectOutlineApi(location.state.subject._id, updateOutline).then(data => {
            window.alert(data)
        })

    }

    const removeMaterial = (position) => {
        removeSubjectMaterialsApi(location.state.subject._id, position).then(data => {
            window.alert(data.data)
        })
    }

    const addMaterial = (e) => {

        e.preventDefault()
        addSubjectMaterialsApi(location.state.subject._id, updateMaterial).then(data => {
            window.alert(data.data)
        })

    }



    return (
        <div>


            <div className='my-10 text-2xl text-center font-bold'>Subject: {location.state ? location.state.subject.subject : ''}</div>

            <div className='mb-16 text-xl text-center'><span className='bg-red-800 p-3 text-white rounded'>ALL CHAPTERS</span> </div>

            <button onClick={() => document.getElementById('addChapterModal').showModal()} className='btn btn-success'>Add Chapter</button>


            <div className='grid gap-10 grid-cols-12 mt-10'>
                {chapterShow}
            </div>

            <div>
                <div className='bg-red-800 p-3 text-center my-10 text-xl'> <span className='text-white rounded'>OUTLINES</span> </div>


                <div className='flex flex-col md:flex-row justify-center'>
                    {outlines.map((item, index) => {
                        return (<div className='my-5 flex border p-2 shadow bg-slate-100 me-3'>
                            <div onClick={() => showFile(item)} className="btn btn-outline">{item.name}</div>
                            <button onClick={() => removeOutline(index)} className='btn btn-error'>X</button>
                        </div>)
                    })}
                </div>

                <div className='my-10'>
                    <form onSubmit={e => addOutline(e)} action="">
                        <input required multiple onChange={e => setUpdateOutline({ ...updateMaterial, outlines: e.target.files })} className='file-input' type="file" name="outlines" id="" />
                        <button className='btn btn-info' type='submit'>Add outline</button>
                    </form>
                </div>

                <div className='bg-red-800 p-3 text-center my-10 text-xl'> <span className='text-white rounded'>MATERIALS</span> </div>

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
                        <button className='btn btn-info' type='submit'>Add outline</button>
                    </form>
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

            <dialog id="addChapterModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Add New Chapter</h3>


                    <form onSubmit={e => handleSubmit(e)} className='mt-10' action="">

                        <div className='mb-5'>
                            <span className="label label-text">Chapter Name: </span>
                            <input required name='chapter' onChange={e => handleChange(e)} value={state.chapter} type="text" placeholder="Type here" className="input input-bordered w-full" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Subject)