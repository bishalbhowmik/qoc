
import { faBook, faCaretDown, faCaretUp, faChalkboardUser, faMoneyBill1Wave, faUserGroup } from '@fortawesome/free-solid-svg-icons'
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

export const TeacherPrivateRouter = ({ children, authenticated, decodedToken, ...rest }) => {


    const [open, setOpen] = useState(false)


    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && (decodedToken.role === 'teacher' || decodedToken.role === 'admin') ? <div>



        <div className='md:hidden top-1 my-5 mx-3'>
            <br />
            <div className='md:hidden px-2'>
                <span onClick={() => setOpen(!open)} className=' text-red-800 border border-red-800 p-2 cursor-pointer rounded'>
                    <FontAwesomeIcon className='fas fa-2xl' icon={open ? faCaretUp : faCaretDown} />
                </span>
            </div>



            {/* <div className={`my-2 bg-slate-700 text-white ${open ? 'block' : 'hidden'}`}>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/course' className='block text-white m-4 hover:underline'>Courses</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/tuition' className='block text-white m-4 hover:underline'>tuitions</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/batch' className='block text-white m-4 hover:underline'>Batch</Link>
            </div> */}

            <div className={`m-2 py-4  bg-red-100 rounded-lg text-red-800 ${open ? 'block' : 'hidden'}`}>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/course' className='block p-3 hover:underline'><FontAwesomeIcon icon={faBook} className='fas fa-lg me-4' /> Course</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/tuition' className='block p-3 hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' />Tutor</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/batch' className='block p-3 hover:underline'><FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' /> Batch</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/payment' className='block p-3 hover:underline'> <FontAwesomeIcon icon={faMoneyBill1Wave} className='fas fa-lg me-4' />Payment</Link>
            </div>
        </div>


        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 px-3 py-4 bg-red-100 h-screen rounde-e-md hidden md:block text-rose-800'>
                <Link to='/teacher-dashboard/course' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faBook} className='fas fa-lg me-4' /> Course</Link>
                <Link to='/teacher-dashboard/tuition' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faChalkboardUser} className='fas fa-lg me-4' /> Tutor</Link>
                <Link to='/teacher-dashboard/batch' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faUserGroup} className='fas fa-lg me-4' /> Batch</Link>
                <Link to='/teacher-dashboard/payment' className='block focus:bg-rose-800 focus:text-white p-3  hover:underline'> <FontAwesomeIcon icon={faMoneyBill1Wave} className='fas fa-lg me-4' />Payment</Link>
            </div>
            <div className='col-span-12 md:col-span-10 md:pe-4 md:p-0 p-4'> <Outlet /></div>

        </div>

    </div> : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(TeacherPrivateRouter)