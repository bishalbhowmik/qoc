import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createSubjectsApi, getSubjectsApi } from '../../../Api/Admin/SubjectApi'

export const TeacherCurriculum = (props) => {

    const location = useLocation()
    const [subject, setSubject] = useState([])

    useEffect(() => {

        if (location.state) {

            const { curriculum } = location.state

            getSubjectsApi(curriculum._id).then(data => {
                if (data.error) throw data.message
                setSubject([...data.data])
            }).catch(err => {
                console.log(err)
            })
        }

    }, [location]);

   

    let subjectShow
    if (subject.length === 0) {
        subjectShow = <div className='p-40 text-center col-span-12'>Not Subject found</div>
    }
    else {
        subjectShow = subject.map((item, index) => {
            return (
                <Link to='/teacher-dashboard/subject' state={{ subject: item }} className='card col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.subject}</div>
                    </div>
                </Link>
            )
        })
    }



    return (
        <div>

            <div className='my-10 text-2xl text-center font-bold'>Curriculum - {location.state ? location.state.curriculum.curriculum : ''}</div>
            <div className='mb-16 text-center'><span className='bg-red-800 p-3 text-white rounded'>ALL SUBJECTS</span></div>



            <div className='grid gap-10 grid-cols-12 mt-10'>
                {subjectShow}
            </div>

            <div>
                <div className='text-center my-20'><span className='bg-red-800 p-3 text-white rounded'>OUTLINES</span></div>
                {location.state ? location.state.curriculum.outlines.map(item => {
                    return (<div className='card glass my-10 shadow-lg m-auto'>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCurriculum)