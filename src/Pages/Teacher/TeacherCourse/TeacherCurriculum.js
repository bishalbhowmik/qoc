import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createSubjectsApi, getSubjectsApi } from '../../../Api/Admin/SubjectApi'
import { showFile } from '../../../Functions/CustomFunction'
import { getACurriculumApi } from '../../../Api/Admin/CurriculumApi'
import Spinner from '../../../components/Spinner'

export const TeacherCurriculum = (props) => {

    const location = useLocation()
    const [subject, setSubject] = useState([])
    const [outlines, setOutlines] = useState([])
    const [spin, setSpin] = useState(false)

    useEffect(() => {

        if (location.state) {

            const { curriculum } = location.state

            setSpin(true)

            getACurriculumApi(curriculum._id).then(data => {
                if (data.error) throw data.message
                setOutlines([...data.data.outlines])
            })

            getSubjectsApi(curriculum._id).then(data => {
                setSpin(false)
                if (data.error) throw data.message
                setSubject([...data.data])
            }).catch(err => {
                console.log(err)
            })
        }

    }, [location]);




    let subjectShow
    if (subject.length === 0) {
        subjectShow = <div className='p-40 text-center col-span-full'>Not Subject found</div>
    }
    else {
        subjectShow = subject.map((item, index) => {
            return (
                <Link to='/teacher-dashboard/subject' state={{ subject: item }} className='card text-white bg-red-950 glass  hover:bg-slate-600 hover:text-white '>
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



            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-10'>
                {subjectShow}
            </div>

            <div>
                <div className='text-center my-20'><span className='bg-red-800 p-3 text-white rounded'>OUTLINES</span></div>

                <div className='flex flex-col md:flex-row'>
                    {outlines.map(item => {
                        return (
                            <div onClick={() => showFile(item)} className="btn btn-outline md:me-4 p-2 mt-2">
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>


            {spin && <Spinner />}

        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCurriculum)