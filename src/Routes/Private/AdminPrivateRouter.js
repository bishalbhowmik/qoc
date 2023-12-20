
import React from 'react'
import { connect } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const AdminPrivateRouter = ({ children, authenticated, decodedToken, ...rest }) => {

    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && decodedToken.role === 'admin' ? (

        <div>

            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-2 p-1 bg-rose-950 position-fixed h-screen rounded-e-md'>
                    <Link to='/admin-dashboard/student' className='block text-white m-4 hover:underline'>Student</Link>
                    <Link to='/admin-dashboard/teacher' className='block text-white m-4 hover:underline'>Teachers</Link>
                    <Link to='/admin-dashboard/mcq' className='block text-white m-4 hover:underline'>MCQ</Link>
                    <Link to='/admin-dashboard/broad-question' className='block text-white m-4 hover:underline'>Broad Question</Link>
                    <Link to='/admin-dashboard/exam' className='block text-white m-4 hover:underline'>Exam</Link>
                    <Link to='/admin-dashboard/course' className='block text-white m-4 hover:underline'>Course</Link>
                    <Link to='/admin-dashboard/tuition' className='block text-white m-4 hover:underline'>tuitions</Link>
                </div>
                <div className='col-span-10'> <Outlet /></div>

            </div>

        </div>



    ) : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(AdminPrivateRouter)