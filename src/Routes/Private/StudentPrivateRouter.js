
import { faBars, faBook, faBookOpenReader, faCaretDown, faCaretUp, faChalkboardUser, faCircleInfo, faMoneyBill1Wave, faPersonChalkboard, faSquareCaretDown, faSquareCaretUp, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const StudentPrivateRouter = ({ children, authenticated, decodedToken, ...rest }) => {

    const [open, setOpen] = useState(false)


    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && (decodedToken.role === 'student' || decodedToken.role === 'admin') ?
        <div>

            <div className='md:hidden top-1 mx-3'>
                <br />
                <div className='md:hidden px-2'>
                    <span onClick={() => setOpen(!open)} className=' text-red-800 border border-red-800 p-2 cursor-pointer rounded'>
                        <FontAwesomeIcon className='fas fa-2xl' icon={open ? faCaretUp : faCaretDown} />

                    </span>
                </div>
                <div className={`m-2 py-4  bg-red-100 rounded-lg text-red-800 ${open ? 'block' : 'hidden'}`}>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/curriculum' state={{ curriculum: decodedToken.curriculumId}} className='block p-3 hover:underline'><FontAwesomeIcon icon={faBook} className='fas fa-lg me-4' /> Course</Link>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/tutor' className='block p-3 hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' />Tutor</Link>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/batch' className='block p-3 hover:underline'><FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' /> Batch</Link>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/batch-paper-solution' className='block p-3 hover:underline'><FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' /> Batch (Paper Solution)</Link>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/all-exam' className='block p-3 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' /> All Exam</Link>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/assignment' className='block p-3 hover:underline'> <FontAwesomeIcon icon={faCircleInfo} className='fas fa-lg me-4' /> Assignment Help</Link>
                    <Link onClick={() => setOpen(!open)} to='/student-dashboard/payment' className='block p-3 hover:underline'> <FontAwesomeIcon icon={faMoneyBill1Wave} className='fas fa-lg me-4' />Payment</Link>
                </div>
            </div>

            <div className='grid grid-cols-12'>
                <div className='col-span-2 px-3 py-4 bg-red-100 h-screen rounde-e-md hidden md:block text-rose-800'>
                    <Link to='/student-dashboard/curriculum' state={{ curriculum: decodedToken.curriculumId }} className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faBook} className='fas fa-lg me-4' /> Course</Link>
                    <Link to='/student-dashboard/tutor' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' /> Tutor</Link>
                    <Link to='/student-dashboard/batch' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' /> Batch</Link>
                    <Link to='/student-dashboard/batch-paper-solution' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' /> Batch (Paper Solution)</Link>
                    <Link to='/student-dashboard/all-exam' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' /> All Exam</Link>
                    <Link to='/student-dashboard/assignment' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faCircleInfo} className='fas fa-lg me-4' /> Assignment Help</Link>
                    <Link to='/student-dashboard/payment' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faMoneyBill1Wave} className='fas fa-lg me-4' />Payment</Link>
                </div>
                <div className='col-span-12 md:col-span-10 my-10 p-3 mx-0'> <Outlet /></div>

            </div>

        </div> : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(StudentPrivateRouter)