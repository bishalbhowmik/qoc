import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../Api/Admin/CurriculumApi'
import { getAStudent, getAllActivityApi, updateStudent } from '../../Api/Student/StudentApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faHandsClapping, faMoneyBill1, faMoneyBillTransfer, faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { getFocusApi } from '../../Api/Admin/FocusApi'
import { showFile } from '../../Functions/CustomFunction'
import Spinner from '../../components/Spinner'
import { getTransactionApi } from '../../Api/Student/PaymentApi'
import { Link } from 'react-router-dom'



const mapStateToProps = (state) => {

    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }

}


export const History = (props) => {

    const [state, setState] = useState({
        username: '',
        email: '',
        mobile: '',
        country: '',
        curriculumId: '',
    })
    const [spin, setSpin] = useState(false)
    const [focus, setFocus] = useState([])
    const [batches, setBatches] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [assignments, setAssignments] = useState([])
    const [exam, setExam] = useState([])
    const [curriculum, setCurriculum] = useState([])

    useEffect(() => {

        setSpin(true)
        getAllCurriculumApi().then(data => {

            if (data.error) throw data.message

            setCurriculum([...data.data])

        }).catch(err => {
            window.alert(err)
        })

        getAStudent(props.decodedToken._id).then(data => {

            if (data.error) throw data.message

            setState({
                ...state,
                username: data.data.username,
                email: data.data.email,
                mobile: data.data.mobile,
                country: data.data.country,
                curriculumId: data.data.curriculum,
                // password: data.data.password,
            })

        }).catch(err => {
            console.log(err)
        })


        getFocusApi({}).then((data) => {
            setSpin(false)
            if (data.error) throw data.message;
            setFocus(data.data.filter(item => new Date() >= new Date(item.startTime) && new Date() <= new Date(item.endTime)));
        }).catch(err => { })


        getAllActivityApi(props.decodedToken._id).then(data => {
            console.log(data)
            if (data.error) throw data.message
            setAssignments([...data.data.postedAssignment])
            setBatches([...data.data.batches])
            setExam([...data.data.submittedExam])
            setUpcoming([...data.data.upcomingCourse])
        }).catch(err => {
            console.log(err)
        })

    }, [props])


    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        updateStudent(props.decodedToken._id, state).then(data => {
            console.log(data)
        })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <div className=''>

            <div className='my-14 grid grid-cols-1 md:grid-cols-12 gap-14'>

                <div className='col-span-full md:col-span-9'>
                    
                </div>


                <div className=' col-span-full md:col-span-3'>

                </div>

                {/* {spin && <Spinner />} */}

            </div>



            <div className='grid grid-cols-1 md:grid-cols-12 gap-14'>
                <div className='col-span-full md:col-span-9'>
                    <div className='text-xl font-bold mb-5 border-b pb-3'>Recent Activities</div>


                    <div className='grid grid-cols-1 md:grid-cols-12 gap-14'>

                        <div className='col-span-full md:col-span-6'>
                            <div className='font-bold my-3'>Exams</div>
                            {exam.length === 0 ? <div>No exam found</div> : exam.map(item => {
                                return (
                                    <div className='flex mb-4 cursor-pointer'>
                                        <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                                        <div>
                                            <Link to={'/student-dashboard/exam'} state={{ exam: item }}>{item.exam}</Link> <br />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='col-span-full md:col-span-6'>
                            <div className='font-bold my-3'>Assignment</div>
                            {assignments.length === 0 ? <div>No assignment found</div> : assignments.map(item => {
                                return (
                                    <div className='flex mb-4 cursor-pointer' onClick={e => showFile(item.assignment)}>
                                        <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                                        <div>
                                            <span className='italic'>Posted a new assignment ~ <span className=''>{item.title}</span></span> <br />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                    </div>

                </div>

                <div className='col-span-full md:col-span-3'>
                    <div className='text-xl font-bold mb-5 border-b pb-3'>Running Batch</div>
                    {batches.length === 0 ? <div>No assignment found</div> : batches.map(item => {
                        return (
                            <div className='flex mb-4 cursor-pointer'>
                                <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                                <div>
                                    <Link to={'my-batch/dashboard/' + item._id} className=''> <span className=''>{item.title}</span></Link> <br />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}


export default connect(mapStateToProps)(History)