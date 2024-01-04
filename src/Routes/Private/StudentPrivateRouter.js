
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


    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && (decodedToken.role === 'student' || decodedToken.role === 'admin') ? <div>

        <div className='md:hidden top-1'>
            <br />
            <div onClick={() => setOpen(!open)} className='inline md:hidden bg-blue-600 text-white p-2 cursor-pointer'>menu</div>
            <div className={`mt-2 bg-slate-700 text-white ${open ? 'block' : 'hidden'}`}>
                <Link to='/student-dashboard/course' className='block text-white m-4 hover:underline'>Course</Link>
                <Link to='/student-dashboard/tutor' className='block text-white m-4 hover:underline'>Tutor</Link>
                <Link to='/student-dashboard/batch' className='block text-white m-4 hover:underline'>Batch</Link>
                <Link to='/student-dashboard/all-exam' className='block text-white m-4 hover:underline'>All Exam</Link>
                <Link to='/student-dashboard/assignment' className='block text-white m-4 hover:underline'>Assignment Help</Link>
            </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 p-1 bg-rose-950 h-screen rounded-e-md hidden md:block'>
                <Link to='/student-dashboard/course' className='block text-white m-4 hover:underline'>Course</Link>
                <Link to='/student-dashboard/tutor' className='block text-white m-4 hover:underline'>Tutor</Link>
                <Link to='/student-dashboard/batch' className='block text-white m-4 hover:underline'>Batch</Link>
                <Link to='/student-dashboard/all-exam' className='block text-white m-4 hover:underline'>All Exam</Link>
                <Link to='/student-dashboard/assignment' className='block text-white m-4 hover:underline'>Assignment Help</Link>
            </div>
            <div className='col-span-12 md:col-span-9'> <Outlet /></div>

        </div>

    </div> : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(StudentPrivateRouter)