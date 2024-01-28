import React from 'react'
import { connect } from 'react-redux'
import { createCoursePaymentApi } from '../../../Api/Student/PaymentApi'

export const Payment = (props) => {




    const createCoursePayment = () => {
        createCoursePaymentApi({ studentId: props.decodedToken._id }).then(data => {
            console.log(data)
            if (data.data.status === 'SUCCESS') {
                window.location.replace(data.data.GatewayPageURL)
            }
            else {
                
                window.alert(data.message)
            }
        })
    }


    return (
        <div>
            <button onClick={createCoursePayment} className='btn btn-success'>Get Premium Course Access</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment)