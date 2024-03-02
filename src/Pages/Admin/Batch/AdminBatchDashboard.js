import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { createAnnouncementApi, getBatchDashboardApi } from '../../../Api/Student/BatchApi'
import Spinner from '../../../components/Spinner'
import bufferToDataUrl from 'buffer-to-data-url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const BatchDashboard = (props) => {

    const [spin, setSpin] = useState(false)
    const [tab, setTab] = useState('announcement')
    const [batch, setBatch] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState('')
    const [state, setState] = useState({
        title: '',
        description: '',
        createdAt: '',
    })

    let { batchId } = useParams()

    useEffect(() => {

        setSpin(true)
        getBatchDashboardApi(batchId, 'admin').then(data => {
            setSpin(false)
            if (data.error) throw data.message

            setBatch(data.data)
        })
            .catch(err => {
                // window.alert(err)
            })
    }, [props])

    if (batch === null) return (
        <div>
            <div className='p-32 text-2xl text-center'>Batch not found</div>
            {spin ? <Spinner /> : ''}
        </div>)



    const handleChange = e => {

        setState({
            ...state,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

    }

    const handleSubmit = e => {

        e.preventDefault()

        createAnnouncementApi(batchId, { ...state, createdAt: new Date().toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' }) }).then(data => {
            console.log(data)
            setMessage(data.message)
        })

    }

    const showFile = file => {
        setSelectedFile(file)
        document.getElementById('showFileModal').showModal()
    }

    let allTabs = document.getElementsByClassName('myTab')

    for (let i = 0; i < allTabs.length; i++) {
        if (allTabs[i].id === tab) {
            allTabs[i].classList.add('border-b-4', 'border-primary', 'bg-slate-100', 'font-bold')
        }
        else {
            allTabs[i].classList.remove('border-b-4', 'border-primary', 'bg-slate-100', 'font-bold')
        }
    }


    return (
        <div>

            <div className='font-bold text-center my-7 text-2xl'>Dashboard</div>

            <div>
                <div className='flex border my-5'>
                    <div onClick={e => setTab('announcement')} id='announcement' className='me-5 p-5 hover:bg-slate-100 myTab border-b-4 border-primary cursor-pointer'>Announcement</div>
                    <div onClick={e => setTab('people')} id='people' className='me-5 p-5 myTab hover:bg-slate-100 cursor-pointer'>People</div>
                </div>
            </div>

            {tab === 'announcement' && (
                <div>

                    <button onClick={e => document.getElementById('createAnnouncementModal').showModal()} className='btn btn-warning mb-10 btn-sm'>Post Announcement</button>


                    <div>
                        {batch && batch.announcements.toReversed().map((item, index) => {
                            return (
                                <div className='card glass bg-gray-100 mb-7 hover:shadow-lg p-3'>
                                    <div className='mb-8 flex flex-col md:flex-row justify-between'>
                                        <div className='card-title'>{item.title}</div>
                                        <div className='text-sm'>Posted on {new Date(item.createdAt).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
                                    </div>
                                    <div className=''>
                                        <div className='text-sm'>{item.description}</div>

                                        <div className='flex flex-col md:flex-row mt-3'>
                                            {item.materials && item.materials.length != 0 && item.materials.map((item, index) => {
                                                return (
                                                    <div className='mt-2'>
                                                        <button onClick={() => showFile(item)} className='btn btn-sm btn-outline md:me-4 p-1'>{item.name}</button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div><button className='btn btn-error btn-sm text-white'><FontAwesomeIcon icon={faTrashCan} /> Delete</button></div>


                                </div>
                            )
                        })}
                    </div>



                    <dialog id="createAnnouncementModal" className="modal">
                        <div className="modal-box w-10/12 max-w-5xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg">Post New Announcement</h3>

                            <form className='my-5' onSubmit={e => handleSubmit(e)} action="">

                                <div>
                                    <label className='label label-text mt-4' htmlFor="">Title</label>
                                    <input required placeholder='Enter title' className='input input-bordered w-full' onChange={e => handleChange(e)} value={state.title} type="text" name='title' />
                                </div>

                                <div>
                                    <label className='label label-text mt-4' htmlFor="">Description</label>
                                    <textarea placeholder='Enter description' className='textarea textarea-bordered w-full' onChange={e => handleChange(e)} value={state.description} type="text" name='description' />

                                </div>
                                <div>
                                    <label className='label label-text mt-4' htmlFor="">Files</label>
                                    <input multiple className='file-input w-full' type="file" name="materials" onChange={e => handleChange(e)} id="" />
                                </div>

                                <button className='btn btn-success mt-10' type="submit">Submit</button>

                                <div className='p-3 text-center text-capitalize'>{message}</div>

                            </form>

                        </div>
                    </dialog>

                    <dialog id="showFileModal" className="modal">
                        <div className="modal-box w-10/12 max-w-full">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg mb-5">{selectedFile && selectedFile.name}</h3>
                            {selectedFile && <object width='100%' className='h-screen' data={bufferToDataUrl(selectedFile.contentType, selectedFile.data)} type=""></object>
                            }
                        </div>
                    </dialog>

                </div>)}

            {tab === 'people' && (
                <div className='my-16 grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {batch && batch.enrolledStudents && batch.enrolledStudents.map(item => {
                        return (
                            <div className='card card-body card-bordered shadow-lg hover:bg-slate-100 cursor-pointer'>
                                <div>{item.studentId.username}</div>
                                <div>{item.studentId.mobile}</div>
                                <div>{item.studentId.email}</div>
                            </div>
                        )
                    })}
                </div>
            )}

            {spin ? <Spinner /> : ''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BatchDashboard)