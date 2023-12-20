import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { applyTuitionApi, getApprovedTuition, getApprovedTuitionApi } from '../../Api/Teacher/TuitionApi'

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}

export const FindTuition = (props) => {

    const [tuition, setTuition] = useState([])

    useEffect(() => {

        getApprovedTuitionApi().then(data => {

            if (data.error) throw data.message

            setTuition([...data.data])

        }).catch(err => console.log(err))

    }, [props])

    const apply = (id) => {

        applyTuitionApi(id, props.decodedToken._id).then(data => {
            console.log(data)
        })

    }



    let tuitionShow

    if (tuition.length === 0) return <div className='p-48 text-center'>No Tuition found</div>

    tuitionShow = tuition.map((item, index) => {
        return (
            <div className='col-span-3 card bg-neutral text-neutral-content'>
                <div className="card-body">
                    <div className="card-title">
                        Subject: {item.subject} <br />
                    </div>

                    <button className='btn btn-primary' onClick={() => apply(item._id)}>Apply</button>
                </div>

            </div>
        )
    })



    return (
        <div>
            <div className='grid grid-cols-12 gap-4 mt-5'>
                {tuitionShow}
            </div>
        </div>
    )
}





export default connect(mapStateToProps)(FindTuition)