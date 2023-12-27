import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { timeCheck } from '../../../Functions/CustomFunction'
import { getAExamMarksApi, submitExamApi } from '../../../Api/Student/ExamApi'

export const StudentExam = (props) => {

    const [mcq, setMcq] = useState([])
    const [broadQuestion, setBroadQuestion] = useState([])
    const [examForm, setExamForm] = useState({})
    const { state } = useLocation()
    const [examStatus, setExamStatus] = useState(false)
    const [examScript, setExamScript] = useState({})
    const [message, setMessage] = useState('')


    useEffect(() => {

        if (state) {
            getAExamMarksApi(state.exam._id, props.decodedToken._id).then(data => {
                if (data.error) throw data.message
                setExamStatus(true)
                setExamScript(data.data)
                console.log(data.data)

            })
                .catch(err => {
                    // window.alert(err)
                })
        }

    }, [props])



    if (!state) {
        return <div className='text-center text-2xl font-bold mt-10'>No Exam Found</div>
    }


    if (new Date() < new Date(state.exam.startTime)) {
        return <div className='text-center text-2xl font-bold mt-10'>Exam will start at {new Date(state.exam.startTime).toLocaleString()}</div>
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

                </div>: ''}   

                {examScript.$__parent.broadQuestionsId.length != 0 ? <div>
                    <div className='font-bold text-center my-10 text-xl underline'>Broad Question Marks</div>
                    <div className='card card-body glass mb-5'>
                        <strong>Marks: </strong>{examScript._doc.hasOwnProperty('broadQuestionMarks') ? examScript._doc.broadQuestionMarks : 'Script has not checked yet'}
                    </div>
                </div> : ''}
            </div>

        </div>
    }

    if (new Date() > new Date(state.exam.endTime)) {
        return <div className='text-center text-2xl font-bold mt-10'>Exam has been ended</div>
    }

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

            let obj = {
                studentId: props.decodedToken._id,
                mcqMarks: mcqMarks,
                correctMcq: correctAnswer,
                wrongMcq: wrongAnswer,
                noAnswer: noAnswer,
                script: examForm.hasOwnProperty('script') ? examForm.script : null,
            }

            
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

    return (
        <div>

            <div className='font-bold text-center my-10 text-2xl'>{state.exam.exam}</div>
            {state.exam.hasOwnProperty('mcqsId') && state.exam.mcqsId.length != 0 ?

                <div>

                    <div className='font-bold text-center my-10 text-xl underline'>MCQ</div>

                    <form onSubmit={e => handleSubmit(e)} action="">
                        {
                            state.exam.mcqsId.map((item, index) => {

                                return (
                                    <div className='my-3 card card-body glass shadow-lg'>
                                        {index + 1}. {item.question} <br />
                                        {item.answer}
                                        {item.options.map((option, index) => <div>

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

                                return <div>{index + 1}. {item.question}</div>

                            })
                        }

                        <form onSubmit={e => handleSubmit(e)} action="">
                            <input name='script' onChange={e => handleChange(e)} type="file" /> <br />
                        </form>
                    </div>


                </div> : ''}


                <form className='' onSubmit={e => handleSubmit(e)} action="">
                    <button type='submit' className='btn btn-primary w-52 my-10'>Submit</button>
                </form>

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}



export default connect(mapStateToProps)(StudentExam)