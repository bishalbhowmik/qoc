import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'


export const TeacherSubject = (props) => {

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


    let chapterShow
    if (chapter.length === 0) {
        chapterShow = <div className='p-40 text-center col-span-12'>Not chapter found</div>
    }
    else {
        chapterShow = chapter.map((item, index) => {
            return (
                <Link to='/teacher-dashboard/chapter' state={{ chapter: item }} className='card  col-span-6 md:col-span-3  glass bg-inherit hover:bg-slate-600 hover:text-white '>
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
                            {item.name}
                        </div>
                    </div>)
                }) : ''}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(TeacherSubject)