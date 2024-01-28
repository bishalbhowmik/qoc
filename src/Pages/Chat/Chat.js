import { faAngleRight, faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { runChat } from '../../Functions/runChat'

export const Chat = (props) => {

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')


    const handleSubmit = e => {
        e.preventDefault()
        setMessage('')

        props.dispatch({
            type: 'ADD_MESSAGE',
            payload: {
                message: message,
                role: 'user'
            }
        })

        runChat(message).then(data => {
            props.dispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    message: data,
                    role: 'bot'
                }
            })
        })
    }

    return (
        <div>

            {show &&
                <div className='fixed bottom-0 right-0 me-10 mb-32 glass w-3/4 md:w-2/4 lg:w-1.5/4 h-2/3 rounded-lg'>

                    <div className='p-5 text-center font-bold'>Ask to QOC AI Assistant</div>


                    <div className='h-4/5 overflow-auto px-3'>
                        {
                            props.conversation.map((item, index) => {
                                return (
                                    <div className={`my-3 flex ${item.role === 'user' ? 'justify-end' : 'justify-start'} h-auto`} key={index}>
                                        {item.role === 'bot' && <span className='my-5'><FontAwesomeIcon className='fas fa-xl me-3' icon={faRobot} /></span>}
                                        <span className={`inline max-w-64 md:max-w-3xl rounded-2xl p-3 ${item.role === 'user' ? 'bg-slate-600 text-white' : 'bg-red-100'}`}>{item.message}</span>
                                    </div>

                                )
                            })
                        }
                    </div>


                    <form onSubmit={e => handleSubmit(e)} action="" className='absolute bottom-0 form-control w-full'>
                        <div className='w-5/6 m-auto flex mb-5'>
                            <input onChange={e => setMessage(e.target.value)} value={message} className='input input-bordered w-full me-2' placeholder='Type here...' type="text" />
                            <button type='submit' className='btn btn-primary text-lg rounded-full'> <FontAwesomeIcon icon={faAngleRight} /> </button>
                        </div>
                    </form>
                </div>

            }





            <div onClick={() => setShow(!show)} className='fixed bottom-0 right-0 me-10 mb-10 shadow-2xl cursor-pointer'>

                <div className='border rounded-full shadow-2xl p-3 bg-red-800 text-white'>
                    <FontAwesomeIcon className='fas fa-2xl' icon={faRobot} />
                </div>
                {/* <div className='font-bold ms-1'>Chat AI</div> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state.conversation)
    return {
        conversation: state.conversation
    }
}


export default connect(mapStateToProps)(Chat)