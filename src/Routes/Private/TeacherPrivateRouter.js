
import React from 'react'
import { connect } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const TeacherPrivateRouter = ({ children, authenticated, decodedToken, ...rest }) => {


    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && (decodedToken.role === 'teacher' || decodedToken.role === 'admin') ? <div>

        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 p-1 bg-rose-950 position-fixed h-screen rounded-e-md'>
                <Link to='/teacher-dashboard/student' className='block text-white m-4 hover:underline'>Student</Link>
                {/* <Link to='/teacher-dashboard/teacher' className='block text-white m-4 hover:underline'>Teachers</Link> */}
                {/* <Link to='/teacher-dashboard/exam' className='block text-white m-4 hover:underline'>Exam</Link> */}
                <Link to='/teacher-dashboard/course' className='block text-white m-4 hover:underline'>Courses</Link>
                <Link to='/teacher-dashboard/tuition' className='block text-white m-4 hover:underline'>tuitions</Link>
            </div>
            <div className='col-span-10'> <Outlet /></div>

        </div>

    </div> : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(TeacherPrivateRouter)