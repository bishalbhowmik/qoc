
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpenReader, faCaretDown, faCaretUp, faChalkboardUser, faCircleInfo, faUserGroup } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const AdminPrivateRouter = ({ children, authenticated, decodedToken, ...rest }) => {

    const [open, setOpen] = useState(false)

    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && decodedToken.role === 'admin' ? (

        <div>

            <div className='md:hidden top-1 mx-3'>
                <br />
                <div className='md:hidden px-2'>
                    <span onClick={() => setOpen(!open)} className=' text-red-800 border border-red-800 p-2 cursor-pointer rounded'>
                        <FontAwesomeIcon className='fas fa-2xl' icon={open ? faCaretUp : faCaretDown} />

                    </span>
                </div>
                <div className={`m-2 py-4  bg-red-100 rounded-lg text-red-800 ${open ? 'block' : 'hidden'}`}>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/student' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Student</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/teacher' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' />Teachers</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/upcoming-course' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' />Upcoming Course</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/mcq' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />MCQ</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/broad-question' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Broad Question</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/exam' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Exam</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/course' className='block m-4 hover:underline'><FontAwesomeIcon icon={faBook} className='fas fa-lg me-4' />Course</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/tuition' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Tuitions</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/assignment' className='block m-4 hover:underline'><FontAwesomeIcon icon={faCircleInfo} className='fas fa-lg me-4' />Assignment</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/batch' className='block m-4 hover:underline'><FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' />Batch</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/resource' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Resource</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/transaction' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Transactions</Link>
                </div>
            </div>

            <div className='grid grid-cols-12'>
                <div className='col-span-2 px-3 py-4 bg-red-100 h-screen rounde-e-md hidden md:block text-rose-800'>
                    <Link to='/admin-dashboard/student' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Student</Link>
                    <Link to='/admin-dashboard/teacher' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' />Teachers</Link>
                    <Link onClick={() => setOpen(!open)} to='/admin-dashboard/upcoming-course' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' />Upcoming Course</Link>
                    <Link to='/admin-dashboard/mcq' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />MCQ</Link>
                    <Link to='/admin-dashboard/broad-question' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Broad Question</Link>
                    <Link to='/admin-dashboard/exam' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Exam</Link>
                    <Link to='/admin-dashboard/course' className='block m-4 hover:underline'><FontAwesomeIcon icon={faBook} className='fas fa-lg me-4' />Course</Link>
                    <Link to='/admin-dashboard/tuition' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Tuitions</Link>
                    <Link to='/admin-dashboard/assignment' className='block m-4 hover:underline'><FontAwesomeIcon icon={faCircleInfo} className='fas fa-lg me-4' />Assignment</Link>
                    <Link to='/admin-dashboard/batch' className='block m-4 hover:underline'><FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' />Batch</Link>
                    <Link to='/admin-dashboard/resource' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Resource</Link>
                    <Link to='/admin-dashboard/transaction' className='block m-4 hover:underline'> <FontAwesomeIcon icon={faBookOpenReader} className='fas fa-lg me-4' />Transactions</Link>
                </div>
                <div className='col-span-12 md:col-span-10 my-10 p-3 mx-0'> <Outlet /></div>

            </div>

        </div>



    ) : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(AdminPrivateRouter)