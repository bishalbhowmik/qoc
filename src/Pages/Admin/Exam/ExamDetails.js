import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAExamApi, updateMarksApi } from '../../../Api/Admin/ExamApi';
import { getFileUrl } from '../../../Functions/CustomFunction';
import Spinner from '../../../components/Spinner';

export const ExamDetails = (props) => {

    const { examId } = useParams()
    const [participants, setParticipants] = useState([])
    const [exam, setExam] = useState({})
    const [selectedItem, setSelectedItem] = useState({})
    const [spin, setSpin] = useState(false)
    const [state, setState] = useState({
        broadQuestionMarks: ''
    })

    useEffect(() => {
        setSpin(true)
        getAExamApi(examId).then(data => {
            console.log(data)
            setSpin(false)
            if (data.error) throw data.message
            setParticipants([...data.data.participants])
            setExam(data.data)

        }).catch(err => {
            window.alert(err)
        })

    }, [])



    const viewScript = (item) => {
        console.log('Script: ', item)
        document.getElementById('viewScriptModal').showModal()
        setSelectedItem(item)
        setState({
            ...state,
            broadQuestionMarks: item.hasOwnProperty('broadQuestionMarks') ? item.broadQuestionMarks : 0
        })
    }

    let participantsShow
    if (participants.length === 0) { participantsShow = <div className='text-center text-xl my-10'>No Participants</div> }
    else {
        participantsShow = participants.map((item, index) => {

            if (item.studentId) {
                return (
                    <tr className="hover">
                        <th>{index + 1}</th>
                        <td>{item.studentId.username}</td>
                        <td>{item.studentId.mobile}</td>
                        {exam.mcqsId.length > 0 ? <>
                            <td className='bg-neutral-100'>{item.mcqMarks}</td>
                            <td className='bg-neutral-100'>{item.correctMcq}</td>
                            <td className='bg-neutral-100'>{item.wrongMcq}</td>
                            <td className='bg-neutral-100'>{item.noAnswer}</td>
                        </> : ''}

                        {exam.broadQuestionsId.length > 0 ? <>
                            <td className='bg-slate-200'>{item.broadQuestionMarks}</td>
                            <td className=''><button onClick={e => viewScript(item)} className='btn btn-sm btn-ghost'>View</button></td>
                        </> : ''}

                        {exam.manualQuestion && item.script ? <>
                            <td className=''><button onClick={e => viewScript(item)} className='btn btn-sm btn-ghost'>View</button></td>
                        </> : ''}
                    </tr>
                )
            }

        })
    }


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSpin(true)
        updateMarksApi(examId, selectedItem.studentId._id, state).then(data => {
            setSpin(false)
            window.alert(data.message)
        })

    }

    let imageBuffer = selectedItem && selectedItem.hasOwnProperty('script') ? getFileUrl(selectedItem.script) : ''



    return (
        <div>

            <div className='text-center font-bold text-2xl my-10'>{exam.hasOwnProperty('exam') ? exam.exam : ''}</div>



            {exam.manualQuestion && <object title={exam.exam} className='w-full' height='600px' data={getFileUrl(exam.attachment)} width="100%"></object>}

            {
                exam.hasOwnProperty('mcqsId') && exam.mcqsId.length > 0 &&
                <div>

                    <div className='font-bold text-center my-10 text-xl underline'>Mcq</div>

                    <div className='card card-body glass mb-5'>
                        {
                            exam.mcqsId.map((item, index) => {

                                console.log(item)

                                return (<div className='flex border-b py-3'>
                                    <div className='bg-green-200 me-5 p-3'>{index + 1}. {item.question}</div>
                                    <div className='p-3 bg-yellow-100'>Options - </div>
                                    <div className='flex bg-yellow-100 p-3 me-5'>
                                        {item.options && item.options.map((option, index) => <div>
                                            <div className='me-5'>
                                                <span className='' htmlFor="">{option.option}) {option.value}</span>
                                            </div>

                                        </div>)}
                                    </div>
                                    <div className='p-3 bg-lime-200'>Answer - {item.answer}</div>
                                </div>)

                            })
                        }
                    </div>

                </div>
            }

            {
                exam.hasOwnProperty('broadQuestionsId') && exam.broadQuestionsId.length > 0 &&
                <div>

                    <div className='font-bold text-center my-10 text-xl underline'>Broad Question</div>

                    <div className='card card-body glass mb-5'>
                        {
                            exam.broadQuestionsId.map((item, index) => {

                                console.log(item)

                                return <div className='p-3'>{index + 1}. {item.question}</div>

                            })
                        }
                    </div>

                </div>
            }


            <div className='text-center text-xl my-10'>Participants</div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            {exam.hasOwnProperty('mcqsId') && exam.mcqsId.length > 0 ? <>
                                <th>MCQ Marks</th>
                                <th>Correct MCQ</th>
                                <th>Wrong MCQ</th>
                                <th>No Answer</th>
                            </> : ''}

                            {exam.hasOwnProperty('broadQuestionsId') && exam.broadQuestionsId.length > 0 ? <>
                                <th>Broad Question Marks</th>
                                <th>Script</th>
                            </> : ''}

                            {exam.manualQuestion ? <>
                                <th>Script</th>
                            </> : ''}
                        </tr>
                    </thead>
                    <tbody> {participantsShow} </tbody>
                </table>
            </div>


            <dialog id="viewScriptModal" className="modal">
                <div className="modal-box w-11/12 max-w-7xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>



                    {Object.keys(selectedItem).length != 0 ? <div>

                        <h3 className="font-bold text-lg">Script of {selectedItem.studentId.username}</h3>

                        <form onSubmit={e => handleSubmit(e)} className='my-10 p-10 border rounded-lg bg-orange-100 text-center' action="">
                            <input onChange={e => handleChange(e)} name='broadQuestionMarks' value={state.broadQuestionMarks} placeholder='Enter marks' className='input input-bordered ' type="number" />
                            <button type='submit' className='btn btn-ghost ms-5'>Update</button>
                        </form>



                        <div className='text-center text-xl my-10'>Script</div>


                        {/* buffer to image */}


                        <div>
                            {selectedItem.script && <object title={selectedItem.script.name} className='h-screen w-full' data={imageBuffer} width="100%"></object>}

                        </div>

                    </div> : ''}

                </div>

                {spin && <Spinner />}
            </dialog>

            {spin && <Spinner />}
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetails)