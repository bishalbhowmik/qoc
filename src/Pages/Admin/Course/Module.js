import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { createModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'
import bufferToDataUrl from 'buffer-to-data-url'


export const Module = (props) => {

    const location = useLocation()
    const [state, setState] = useState({
        module: '',
        paid: false
    })

    useEffect(() => {

       
    }, [location]);


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // createModuleApi({
        //     ...state,
        //     subjectId: location.state ? location.state.chapter.subjectId._id : '',
        //     curriculumId: location.state ? location.state.chapter.curriculumId._id : '',
        //     chapterId: location.state ? location.state.chapter._id : '',

        // }).then(data => {
        //     console.log(data)
        //     // if(data.error) throw data
        // })
        // // .catch(err => {
        // //     console.log(err.data)
        // // })
    }




    return (
        <div>
            <div className='my-10 text-2xl text-center font-bold'>Module: {location.state ? location.state.module.module : ''}</div>

            <button className='btn btn-info'>Edit Material</button>
            <div>

                <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span></div>

                {location.state ? location.state.module.materials.map(item => {
                    return (<div className='card glass my-10 m-auto'>
                        <div className="card-body">
                            <object className='' height='700px' data={bufferToDataUrl(item.contentType, item.data)} type=""></object>
                        </div>
                    </div>)
                }) : ''}

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