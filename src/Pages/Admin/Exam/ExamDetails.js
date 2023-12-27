import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAExamApi, updateMarksApi } from '../../../Api/Admin/ExamApi'
import { Buffer } from 'buffer';

export const ExamDetails = (props) => {

    const { examId } = useParams()
    const [participants, setParticipants] = useState([])
    const [exam, setExam] = useState({})
    const [selectedItem, setSelectedItem] = useState({})
    const [state, setState] = useState({
        broadQuestionMarks: ''
    })

    useEffect(() => {

        getAExamApi(examId).then(data => {

            console.log(data)
            if (data.error) throw data.message
            setParticipants([...data.data.participants])
            setExam(data.data)

        }).catch(err => {
            window.alert(err)
        })

    }, [])



    const viewScript = (item) => {
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
                        <td className='bg-slate-200'><button onClick={e => viewScript(item)} className='btn btn-sm btn-ghost'>View</button></td>
                    </> : ''}
                </tr>
            )

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

        updateMarksApi(examId, selectedItem.studentId._id, state).then(data => {
            console.log(data)
        })

        // console.log(state)
        

    }


    let dataUrl = '';
    if (selectedItem && selectedItem.hasOwnProperty('script')) {
        const base64Data = Buffer.from(selectedItem.script.data).toString('base64');
        dataUrl = `data:${selectedItem.script.contentType};base64,${base64Data}`;
    } else {
        console.error('Invalid selectedItem.script object:', selectedItem.script);
    }

    return (
        <div>

            <div className='text-center font-bold text-2xl my-10'>{exam.hasOwnProperty('exam') ? exam.exam : ''}</div>

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
                        </tr>
                    </thead>
                    <tbody> {participantsShow} </tbody>
                </table>







                <dialog id="viewScriptModal" className="modal">
                    <div className="modal-box w-10/12 max-w-5xl">
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

                                <object data={dataUrl} type="application/pdf"  width="100%" height="100%"></object>
                            </div>






                        </div> : ''}

                    </div>
                </dialog>
            </div>


        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetails)