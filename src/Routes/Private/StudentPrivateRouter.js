
import React from 'react'
import { connect } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const StudentPrivateRouter = ({ children, authenticated, decodedToken, ...rest }) => {


    return authenticated && decodedToken && decodedToken.hasOwnProperty('role') && (decodedToken.role === 'student' || decodedToken.role === 'admin') ? <div>

        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 p-1 bg-rose-950 position-fixed h-screen rounded-e-md'>
                {/* <Link to='/student-dashboard/student' className='block text-white m-4 hover:underline'>Student</Link> */}
                <Link to='/student-dashboard/course' className='block text-white m-4 hover:underline'>Course</Link>
                <Link to='/student-dashboard/tutor' className='block text-white m-4 hover:underline'>Tutor</Link>
                <Link to='/student-dashboard/batch' className='block text-white m-4 hover:underline'>Batch</Link>
                {/* <Link to='/student-dashboard/job' className='block text-white m-4 hover:underline'>Jobs</Link> */}
            </div>
            <div className='col-span-10'> <Outlet /></div>

        </div>

    </div> : <div className='text-3xl flex items-center justify-center h-[50vh]'>You are not authorized</div>
}




export default connect(mapStateToProps)(StudentPrivateRouter)