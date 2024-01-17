
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
            <div onClick={() => setOpen(!open)} className='inline md:hidden bg-blue-600 text-white p-2 cursor-pointer'>Menu</div>
            <div className={`my-2 bg-slate-700 text-white ${open ? 'block' : 'hidden'}`}>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/course' className='block text-white m-4 hover:underline'>Courses</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/tuition' className='block text-white m-4 hover:underline'>tuitions</Link>
                <Link onClick={() => setOpen(!open)} to='/teacher-dashboard/batch' className='block text-white m-4 hover:underline'>Batch</Link>
            </div>
        </div>


        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 p-1 bg-rose-950 position-fixed h-screen rounded-e-md hidden md:block'>
                <Link to='/teacher-dashboard/course' className='block text-white m-4 hover:underline'>Courses</Link>
                <Link to='/teacher-dashboard/tuition' className='block text-white m-4 hover:underline'>tuitions</Link>
                <Link to='/teacher-dashboard/batch' className='block text-white m-4 hover:underline'>Batch</Link>
            </div>
            <div className='col-span-12 md:col-span-10 md:pe-4 md:p-0 p-4'> <Outlet /></div>

        </div>

    </div> : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(TeacherPrivateRouter)