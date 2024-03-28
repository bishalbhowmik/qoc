import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getEnrolledBatchApi } from '../../../Api/Student/BatchApi'
import { Link } from 'react-router-dom'
import bufferToDataUrl from 'buffer-to-data-url'
import Spinner from '../../../components/Spinner'

export const MyBatch = (props) => {

    const [batch, setBatch] = useState([])
    const [spin, setSpin] = useState(false)


    useEffect(() => {

        setSpin(true)

        getEnrolledBatchApi(props.decodedToken._id).then(data => {
            setSpin(false)

            if (data.error) throw data.message
            else setBatch([...data.data])

        }).catch(err => console.log(err))

    }, [])


    let batchShow

    if (batch.length === 0) batchShow = <div className='col-span-12 text-center p-32 text-xl'>You haven't enrolled any batch yet</div>
    else {
        batchShow = batch.map((item, index) => {
            return (
                <div key={index} className='col-span-12 md:col-span-6 border p-3 mb-3 rounded shadow hover:shadow-lg'>

                    <div className='grid grid-cols-12'>
                        <div className='col-span-12 md:col-span-4 flex flex-column justify-center p-3'>
                            <Link className='flex align-middle' to=''><img className='rounded-full w-2/5 md:w-2/3 m-auto' src={item.teacherId.image && item.teacherId.image.contentType && item.teacherId.image != '' ? process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + item.teacherId.image.name : '/male.png'} alt="picture" /></Link>

                        </div>
                        <div className='col-span-12 md:col-span-8'>

                            <div className='text-xl font-bold mb-5'>{item.title}</div>
                            <div className='text-lg'><strong className='me-3'>Teacher: </strong>{item.teacherId.username}</div>

                            <div className='mt-5'>
                                <Link to={'https://' + item.classLink} target='_blank' className='btn btn-info me-5'>Join Class</Link>
                                <Link to={'dashboard/' + item._id} className='btn btn-success'>Dashboard</Link>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
    }


    return (
        <div>
            <div className='grid gap-4 grid-cols-12'>
                {batchShow}
            </div>

            {spin ? <Spinner /> : ''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MyBatch)