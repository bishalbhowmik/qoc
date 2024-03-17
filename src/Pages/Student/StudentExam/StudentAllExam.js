import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getExamByIdApi } from '../../../Api/Student/ExamApi'
import Spinner from '../../../components/Spinner'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}


export const StudentAllExam = (props) => {

    const [message, setMessage] = useState(false)
    const [exam, setExam] = useState([])
    const [spin, setSpin] = useState(false)

    useEffect(() => {

        setSpin(true)

        getExamByIdApi(props.decodedToken._id).then(data => {
            console.log(data)
            setSpin(false)
            if (data.error) { throw data.message }
            else {
                setMessage(data.message)
                setExam([...data.data])
            }
        }).catch(err => setMessage(err))

    }, [props])

    let examShow
    if (exam.length === 0) { examShow = <div></div> }
    else {
        examShow = exam.map(item => {

            return (
                <Link aria-disabled to={'/student-dashboard/exam'} state={{ exam: item }} className='card card-body glass my-5 hover:shadow-lg bg-sky-700 text-white'>
                    <div className='card-title mb-5'>
                        {item.subjectId.subject} - {item.exam} 
                    </div>
                    <div className='card-text'>Start - {new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
                    <div className='card-text'>End - {new Date(item.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>

                </Link>
            )
        })
    }


    return (
        <div>
            <div className='p-2 text-center mb-10 capitalize font-bold text-2xl'>{message}</div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>{examShow}</div>

            {spin ? <Spinner /> : ''}

        </div>
    )
}



export default connect(mapStateToProps)(StudentAllExam)