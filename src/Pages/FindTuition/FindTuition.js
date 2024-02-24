import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { applyTuitionApi, getApprovedTuition, getApprovedTuitionApi } from '../../Api/Teacher/TuitionApi'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const FindTuition = (props) => {

    const [tuition, setTuition] = useState([])
    const [spin, setSpin] = useState(false)

    useEffect(() => {

        setSpin(true)
        getApprovedTuitionApi().then(data => {
            setSpin(false)
            if (data.error) throw data.message

            setTuition([...data.data])

        }).catch(err => console.log(err))

    }, [props])



    const apply = (id) => {

        setSpin(true)
        applyTuitionApi(id, props.decodedToken._id).then(data => {
            setSpin(false)
            window.alert(data.message)
        })

    }



    let tuitionShow

    if (tuition.length === 0) {
        tuitionShow = <div className='py-48 text-center col-span-full text-xl font-bold'>No Tuition found</div>
    }

    else {
        tuitionShow = tuition.map((item, index) => {
            return (
                <div className='my-10 card bg-gray-50 border-x-8 hover:border-red-800 hover:shadow-lg'>
                    <div className="card-body text-sm">
                        <div className="card-title mb-4">Subject: {item.subject}</div>
                        <div><strong>Location:</strong>{item.location}</div>
                        <div><strong>Type:</strong>  {item.tuitionType}</div>
                        <div><strong>Gender:</strong>  {item.tutorGender}</div>
                        <div><strong>Language:</strong>  {item.language}</div>
                        <div><strong>Days:</strong>  {item.daysInWeek} per week</div>
                        <div><strong>Other Requirements:</strong>  {item.otherRequirements}</div>


                        <div className='mt-3'><strong>Salary:</strong>  {item.salary} BDT</div>
                        <div><strong>Time:</strong>  {item.time}</div>

                        {
                            props.authenticated && props.decodedToken.hasOwnProperty('role') && props.decodedToken['role'] === 'teacher' ? <button className='btn btn-primary' onClick={() => apply(item._id)}>Apply</button> : <Link to={'/login'} className='mt-4 text-red-900 text-center font-bold'>Be a teacher to apply first</Link>
                        }
                    </div>

                </div>
            )
        })

    }


    return (
        <div>

            <div className="text-center p-10">
                <h1 className='text-2xl text-black font-bold mb-2 capitalize'>Career Catalyst Hub</h1>
                <p style={{ letterSpacing: '1.3px' }} className=' text-[#979797]'>Empower Your Journey with Opportunities, Resources, and Insights in the World of Work.</p>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-5'>
                {tuitionShow}
            </div>


            {spin && <Spinner />}
        </div>
    )
}





export default connect(mapStateToProps)(FindTuition)