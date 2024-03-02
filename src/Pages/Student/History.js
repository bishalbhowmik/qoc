import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllActivityApi } from '../../Api/Student/StudentApi'
import { showFile } from '../../Functions/CustomFunction'
import Spinner from '../../components/Spinner'



const mapStateToProps = (state) => {

    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }

}


export const History = (props) => {

    const [tab, setTab] = useState('exam')

    const [spin, setSpin] = useState(false)
    const [assignments, setAssignments] = useState([])
    const [exam, setExam] = useState([])
    const [documents, setDocuments] = useState([])
    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        setSpin(true)

        getAllActivityApi(props.decodedToken._id).then(data => {
            setSpin(false)
            if (data.error) throw data.message
            setAssignments([...data.data.postedAssignment])
            setExam([...data.data.submittedExam])
            setTransactions([...data.data.transactions])
        }).catch(err => {
            window.alert(err)
        })

    }, [props])



    let allTabs = document.getElementsByClassName('myTab')

    for (let i = 0; i < allTabs.length; i++) {
        if (allTabs[i].id === tab) {
            allTabs[i].classList.add('border-b-4', 'border-primary', 'font-bold')
        }
        else {
            allTabs[i].classList.remove('border-b-4', 'border-primary', 'font-bold')
        }
    }


    return (
        <div className=''>


            <div>
                <div className='flex border-b my-5'>
                    <div onClick={e => setTab('exam')} id='exam' className='me-5 p-5 hover:bg-slate-100 myTab border-b-4 border-primary cursor-pointer'>Exam</div>
                    {/* <div onClick={e => setTab('documents')} id='documents' className='me-5 p-5 hover:bg-slate-100 myTab border-b-4 border-primary cursor-pointer'>Documents</div> */}
                    <div onClick={e => setTab('assignment')} id='assignment' className='me-5 p-5 myTab hover:bg-slate-100 cursor-pointer'>Assignment</div>
                    <div onClick={e => setTab('transactions')} id='transactions' className='me-5 p-5 myTab hover:bg-slate-100 cursor-pointer'>Transactions</div>
                </div>
            </div>

            {tab === 'exam' && (
                <div>

                    <div className="overflow-x-auto">
                        <table className="table my-10">
                            <thead>
                                <tr>
                                    <th>Exam</th>
                                    <th>Date</th>
                                    <th>Total Marks</th>
                                    <th>MCQ</th>
                                    <th>Broad Question</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exam.length === 0 ? <div>No exam found</div> : exam.map(item => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.exam}</td>
                                            <td>{new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</td>
                                            <td>{item.totalMarks}</td>
                                            {item.participants && item.participants.map(participant => {

                                                if (participant.studentId === props.decodedToken._id) {


                                                    return (<>

                                                        <td>
                                                            {participant.mcqMarks ? participant.mcqMarks : '---'}
                                                        </td>

                                                        <td>
                                                            {participant.broadQuestionMarks ? participant.broadQuestionMarks : '---'}
                                                        </td>
                                                        <td>
                                                            {(participant.mcqMarks ? Number(participant.mcqMarks) : 0) + participant.broadQuestionMarks ? Number(participant.broadQuestionMarks) : 0}
                                                        </td>
                                                    </>

                                                    )
                                                }
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>)}

            {tab === 'assignment' && (
                <div className='my-10'>
                    {assignments.length === 0 ? <div>No assignment found</div> : assignments.map(item => {
                        console.log(item)
                        return (
                            <div className='flex mb-4 cursor-pointer' onClick={e => showFile(item.assignment)}>
                                <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                                <div>
                                    <span className='italic'>Posted a new assignment ~ <span className=''>{item.title} </span></span> <br />
                                    <div className='italic text-sm'> - {item.answer.length === 0 ? 'Not solved yet' : 'solved'}</div>
                                </div>


                            </div>
                        )
                    })}
                </div>
            )}


            {tab === 'transactions' && (
                <div>

                    <table className="table my-10">
                        <thead>
                            <tr className=' bg-red-700 text-white'>
                                <th>#</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Trans ID</th>
                                <th>Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? <div>No transaction found</div> : transactions.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr className={`hover my-3 ${item.status === 'success' ? 'bg-green-200' : item.status === 'fail' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                        <td>{item.paymentID}</td>
                                        <td>{item.tranDate}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>



                </div>
            )}



            {spin && <Spinner />}

        </div>
    )
}


export default connect(mapStateToProps)(History)