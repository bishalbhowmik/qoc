import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import bufferToDataUrl from 'buffer-to-data-url'


export const Subject = (props) => {

    const location = useLocation()
    const [chapter, setChapter] = useState([])
    const [state, setState] = useState({
        chapter: '',
        paid: false
    })

    useEffect(() => {

        if (location.state) {

            const { subject } = location.state

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



    return (
        <div>


            <div className='my-10 text-2xl text-center font-bold'>Subject: {location.state ? location.state.subject.subject : ''}</div>

            <div className='mb-16 text-xl text-center'><span className='bg-red-800 p-3 text-white rounded'>ALL CHAPTERS</span> </div>

            <button onClick={() => document.getElementById('addChapterModal').showModal()} className='btn btn-success'>Add Chapter</button>


            <div className='grid gap-10 grid-cols-12 mt-10'>
                {chapterShow}
            </div>

            <div>
                <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>OUTLINES</span> </div>


                {location.state ? location.state.subject.outlines.map(item => {
                    return (<div className='card glass my-10 m-auto'>
                        <div className="card-body">
                            {item.name}
                        </div>
                    </div>)
                }) : ''}

                <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span> </div>

                {location.state ? location.state.subject.materials.map(item => {
                    return (<div className='card glass my-10 m-auto'>
                        <div className="card-body">
                            <object className='' height='700px' data={bufferToDataUrl(item.contentType, item.data)} type=""></object>
                        </div>
                    </div>)
                }) : ''}
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