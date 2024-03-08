import bufferToDataUrl from 'buffer-to-data-url'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBatchApi } from '../../../Api/Admin/BatchApi'
import { getAllBatchApi } from '../../../Api/Student/BatchApi'
import Spinner from '../../../components/Spinner'

export const AdminBatch = (props) => {

    const [batch, setBatch] = useState([])
    const [spin, setSpin] = useState(false)

    useEffect(() => {

        setSpin(true)
        getAllBatchApi({}).then(data => {

            setSpin(false)
            if (data.error) throw data.message

            setBatch([...data.data])

        }).catch(err => { console.log(err) })

    }, [])


    const deleteBatch = id => {
        if (window.confirm('Are you sure you want to?')) {
            deleteBatchApi(id).then(data => {
                window.alert(data.message)
            })
        }
    }



    let batchShow
    if (batch.length === 0) batchShow = <div className='col-span-12 text-center'>No Batch found</div>

    else {
        batchShow = batch.map((item, index) => {
            return (
                <div key={index} className='border p-3 mb-3 rounded shadow hover:shadow-lg'>

                    <div className='grid grid-cols-12'>
                        <div className='col-span-12 md:col-span-4 flex flex-column justify-center p-3'>
                            <Link className='flex align-middle' to=''><img className='rounded-full w-2/5 md:w-2/3 m-auto' src={item.teacherId.image && item.teacherId.image.contentType && item.teacherId.image != '' ? bufferToDataUrl(item.teacherId.image.contentType, item.teacherId.image.data) : '/male.png'} alt="picture" /></Link>

                        </div>
                        <div className='col-span-12 md:col-span-8'>

                            <div className='text-xl font-bold mb-5'>{item.title}</div>
                            <div className='text-lg'><strong>Teacher: </strong>{item.teacherId.username}</div>
                            <div className='text-lg'><strong>Email: </strong>{item.teacherId.email}</div>
                            <div className='text-lg'><strong>Joining Fee: </strong>{item.fees} BDT</div>

                            <div className='text-lg'><strong>Start Date: </strong> {new Date(item.startDate).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
                            <div className='text-lg'><strong>Description: </strong>{item.description}</div>

                            <div className='mt-5'>
                                <Link to={'https://' + item.classLink} target='_blank' className='btn btn-info m-3'>Join Class</Link>
                                <Link to={'dashboard/' + item._id} className='btn btn-success m-3'>Dashboard</Link>
                                <Link onClick={() => deleteBatch(item._id)} className='btn btn-error m-3'>Delete</Link>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
    }


    return (
        <div className=''>

            <div className='container grid grid-cols-1 md:grid-cols-2 gap-5 my-10'>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminBatch)