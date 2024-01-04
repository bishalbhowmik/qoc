import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { createModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'
import bufferToDataUrl from 'buffer-to-data-url'


export const Chapter = (props) => {

    const location = useLocation()
    const [modules, setModules] = useState([])
    const [state, setState] = useState({
        module: '',
        paid: false
    })

    useEffect(() => {

        if (location.state) {

            let { chapter } = location.state

            getModulesApi(chapter._id).then(data => {
                if (data.error) throw data.message
                setModules([...data.data])
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

        createModuleApi({
            ...state,
            subjectId: location.state ? location.state.chapter.subjectId._id : '',
            curriculumId: location.state ? location.state.chapter.curriculumId._id : '',
            chapterId: location.state ? location.state.chapter._id : '',

        }).then(data => {
            console.log(data)
            // if(data.error) throw data
        })
        // .catch(err => {
        //     console.log(err.data)
        // })
    }


    let moduleShow
    if (modules.length === 0) {
        moduleShow = <div className='p-40 text-center col-span-12'>Not module found</div>
    }
    else {
        moduleShow = modules.map((item, index) => {
            return (
                <Link to='/admin-dashboard/module' state={{ module: item }} className='card  col-span-6 md:col-span-3  glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.module}</div>
                    </div>
                </Link>
            )
        })
    }



    return (
        <div>


            <div className='my-10 text-2xl text-center font-bold'>Chapter: {location.state ? location.state.chapter.chapter : ''}</div>

            <div className='mb-16 text-xl text-center'> <span className='bg-red-800 p-3 text-white rounded'>All MODULES</span></div>

            <button onClick={() => document.getElementById('addModuleModal').showModal()} className='btn btn-success'>Add Module</button>

            <div className='grid gap-10 grid-cols-12 mt-10'>
                {moduleShow}
            </div>

            <div>

                <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span></div>

                {location.state ? location.state.chapter.materials.map(item => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Chapter)