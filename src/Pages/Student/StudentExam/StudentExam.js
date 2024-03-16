
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getAExamMarksApi, submitExamApi } from '../../../Api/Student/ExamApi'
import Spinner from '../../../components/Spinner'
import { getFileUrl, showFile } from '../../../Functions/CustomFunction'
import RemainingTimeShow from './RemainingTimeShow'

export const StudentExam = (props) => {

    const [mcq, setMcq] = useState([])
    const [spin, setSpin] = useState([])
    const [broadQuestion, setBroadQuestion] = useState([])
    const [examForm, setExamForm] = useState({})
    const { state } = useLocation()
    const [examStatus, setExamStatus] = useState(false)
    const [examScript, setExamScript] = useState({})
    const [message, setMessage] = useState('')



    useEffect(() => {


        if (state) {
            setSpin(true)
            getAExamMarksApi(state.exam._id, props.decodedToken._id).then(data => {
                setSpin(false)
                if (data.error) throw data.message
                setExamStatus(true)
                setExamScript(data.data)
            })
                .catch(err => {
                    // window.alert(err)
                })
        }


    }, [state])



    if (!state) {
        return <div className='text-center text-2xl font-bold mt-10'>No Exam Found {spin && <Spinner />} </div>
    }


    if (new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }) < new Date(state.exam.startTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })) {

        setInterval(() => {

            if (new Date() >= new Date(state.exam.startTime)) {
                window.location.reload()
            }

        }, 1000)


        return <div className='text-center text-2xl font-bold mt-10'>Exam will start at {new Date(state.exam.startTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} <br />  <RemainingTimeShow state={state.exam.startTime} /> {spin && <Spinner />}</div>
    }

    if (examStatus) {
        return <div>
            <div className='text-center text-2xl font-bold mt-10'>You have already given the exam</div>

            <div>
                {examScript.$__parent.mcqsId.length != 0 ? <div>
                    <div className='font-bold text-center my-10 text-xl underline'>MCQ Marks</div>
                    <div className='card card-body glass mb-5'>
                        <div><strong className='me-3'>Correct Answer:</strong> {examScript._doc.correctMcq} </div>
                        <div><strong className='me-3'>Wrong Answer:</strong> {examScript._doc.wrongMcq} </div>
                        <div><strong className='me-3'>Negative Mark:</strong> {examScript.$__parent.negativeMarking} </div>
                        <div><strong className='me-3'>No Answer:</strong> {examScript._doc.noAnswer} </div>
                        <div><strong className='me-3'>Total Marks:</strong> {examScript._doc.mcqMarks} </div>

                    </div>

                </div> : ''}

                {examScript.$__parent.broadQuestionsId.length != 0 ? <div>
                    <div className='font-bold text-center my-10 text-xl underline'>Broad Question Marks</div>
                    <div className='card card-body glass mb-5'>
                        <strong>Marks: </strong>{examScript._doc.hasOwnProperty('broadQuestionMarks') ? examScript._doc.broadQuestionMarks : 'Script has not checked yet'}
                    </div>
                </div> : ''}
            </div>

            {spin && <Spinner />}

        </div>
    }

    if (new Date() > new Date(state.exam.endTime)) {
        return <div className='text-center text-2xl font-bold mt-10'>Exam has been ended {spin && <Spinner />}</div>
    }

    else {

        


        const handleChange = (e) => {


            if (e.target.type === 'file') {
                setExamForm({ ...examForm, [e.target.name]: e.target.files[0] })
            } else {
                setExamForm({
                    ...examForm,
                    [e.target.name]: e.target.value
                })
            }


        }

        const handleSubmit = (e) => {

            e.preventDefault()

            if (window.confirm('Are you sure to submit?')) {
                let correctAnswer = 0
                let wrongAnswer = 0
                let noAnswer = 0

                state.exam.mcqsId.map((item, index) => {
                    if (examForm.hasOwnProperty(item._id)) {
                        if (examForm[item._id] === item.answer) {
                            correctAnswer++
                        } else {
                            wrongAnswer++
                        }
                    } else {
                        noAnswer++
                    }

                })

                let mcqMarks = (correctAnswer * state.exam.perMcqMarks) - (wrongAnswer * state.exam.negativeMarking)
                // console.log()

                let obj = {
                    studentId: props.decodedToken._id,
                    mcqMarks: isNaN(mcqMarks) ? '0' : mcqMarks,
                    correctMcq: correctAnswer,
                    wrongMcq: wrongAnswer,
                    noAnswer: noAnswer,
                    script: examForm.hasOwnProperty('script') ? examForm.script : null,
                }

                console.log(obj)


                submitExamApi(state.exam._id, obj).then(data => {
                    window.location.reload()
                    // console.log(data)
                    // if(data.error) throw data.message
                    // setMessage(data.message)
                }).catch(err => {
                    // setMessage(err)
                })
            }
        }


        setInterval(() => {

            if (new Date() >= new Date(state.exam.endTime)) {
                window.location.reload()
            }

        }, 1000)



        return (
            <>

                <div className='font-bold text-center  text-2xl'>{state.exam.exam}</div>

                <RemainingTimeShow state={state.exam.endTime} />


                <div className='my-3 font-bold'>End Time: {new Date(state.exam.endTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}</div>

                {state.exam.hasOwnProperty('mcqsId') && state.exam.mcqsId.length != 0 ?

                    <div>

                        <div className='font-bold text-center my-10 text-xl underline'>MCQ</div>

                        <form onSubmit={e => handleSubmit(e)} action="">

                            {
                                state.exam.mcqsId.map((item, index) => {

                                    return (
                                        <div className='my-3 card card-body glass shadow-lg'>
                                            {index + 1}. {item.question} <br />
                                            {item.options && item.options.map((option, index) => <div>

                                                <div className='flex items-center'>
                                                    <input onChange={e => handleChange(e)} value={option.option} name={item._id} className='radio' type='radio' />

                                                    <span className='label label-text' htmlFor="">{option.value}</span>
                                                </div>

                                            </div>)}

                                        </div>)

                                })
                            }

                        </form>


                    </div> : ''}

                <div>

                    {state.exam.hasOwnProperty('broadQuestionsId') && state.exam.broadQuestionsId.length != 0 ? <div className=''>

                        <div className='font-bold text-center my-10 text-xl underline'>Broad Question</div>

                        <div className='card card-body glass mb-5'>
                            {
                                state.exam.broadQuestionsId.map((item, index) => {

                                    return <div className='py-5 border-b'>
                                        <strong>{index + 1}.</strong> {item.question} <br />
                                        {/* {item.questionAttachment && <object height='500px' width='500px' data={process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + item.questionAttachment.name} type=""></object>} */}
                                        {item.questionAttachment && <button className='btn btn-sm mt-5' onClick={() => showFile(item.questionAttachment)}>See attachment</button>}
                                        
                                    </div>

                                })
                            }

                            <form onSubmit={e => handleSubmit(e)} action="" className='text-center'>

                                <div className='font-bold my-5 text-xl'>Upload Answer Scrit</div>
                                <input className='file-input file-input-bordered' name='script' onChange={e => handleChange(e)} type="file" /> <br />
                            </form>
                        </div>


                    </div> : ''}

                    {state.exam.manualQuestion && state.exam.attachment && <div className=''>

                        <div className='font-bold text-center my-10 text-xl underline'>Question Paper</div>

                        <div className='card card-body glass mb-5'>

                            <iframe height='500px' src={process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + state.exam.attachment.name} type=""></iframe>

                            <form onSubmit={e => handleSubmit(e)} action="" className='text-center'>

                                <div className='font-bold my-5 text-xl'>Upload Answer Scrit</div>
                                <input className='file-input file-input-bordered' name='script' onChange={e => handleChange(e)} type="file" /> <br />
                            </form>
                        </div>


                    </div>}


                    <form className='' onSubmit={e => handleSubmit(e)} action="">
                        <button type='submit' className='btn btn-primary w-52 my-10'>Submit</button>
                    </form>

                </div>


                {spin && <Spinner />}

            </>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}



export default connect(mapStateToProps)(StudentExam)