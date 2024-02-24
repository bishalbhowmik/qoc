import React from 'react'
import { connect } from 'react-redux'
import { createTeacherPaymentApi } from '../../../Api/Teacher/batchApi'
import './TeacherPayment.css'
import { Link } from 'react-router-dom'

export const TeacherPayment = (props) => {

    console.log(props)


    const buyPremium = () => {

        createTeacherPaymentApi({ teacherId: props.decodedToken._id }).then(data => {
            if (!data.error) {
                window.location.replace(data.data.bkashURL)
            }
            else {
                window.alert(data.message)
            }
        })
    }



    return (
        <div>

            <h1 class="text-center font-semibold text-3xl my-10">Pick the best plan for you</h1>

            <div class="pricing-box-container">
                <div class="pricing-box text-center">
                    <h5>Free</h5>
                    <p class="price"><sup>$</sup>0<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li>Access to All Free Course</li>
                        <li>Access to All Free Solution</li>
                        <li>Get Tution</li>
                        <li>--</li>
                    </ul>
                    <Link to='/teacher-dashboard/course'> <button class="btn-primary">Get Started</button></Link>

                </div>


                <div class="pricing-box pricing-box-bg-image2 text-center">
                    <h5>Batch</h5>
                    <p class="price"><sup>৳</sup>5000<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li>Be Premium Teacher</li>
                        <li>Create Unlimites Batch</li>
                        <li>Access to All Free Course</li>
                        <li>Get Tution</li>
                    </ul>
                    <button onClick={buyPremium} class="btn-primary">Get Started</button>
                </div>


            </div>



        </div>
    )
}

const mapStateToProps = (state) => {

    console.log(state)

    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken
    }
}


export default connect(mapStateToProps)(TeacherPayment)