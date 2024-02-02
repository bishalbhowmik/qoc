import React from 'react'
import { connect } from 'react-redux'
import { createCoursePaymentApi } from '../../../Api/Student/PaymentApi'
import './Payment.css'
import { createAssignmentPaymentApi } from '../../../Api/Student/AssignmentApi'
import { Link } from 'react-router-dom'

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

    const buyAssignmentPremium = () => {

        createAssignmentPaymentApi({ studentId: props.decodedToken._id }).then(data => {
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

            <h1 class="text-center font-semibold text-3xl mb-10">Pick the best plan for you</h1>

            <div class="pricing-box-container">
                <div class="pricing-box text-center">
                    <h5>Free</h5>
                    <p class="price"><sup>$</sup>0<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li>Access to All Free Course</li>
                        <li>All Free Exam</li>
                        <li>Get Free Focus</li>
                        <li>Find Tution</li>
                    </ul>
                    <Link to='/student-dashboard/curriculum' state={{ curriculum: props.decodedToken.curriculumId }}> <button class="btn-primary">Get Started</button></Link>
                   
                </div>


                <div class="pricing-box pricing-box-bg-image3 text-center">
                    <h5>Course</h5>
                    <p class="price"><sup>৳</sup>2500<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li>Access to All Course</li>
                        <li>Get Paper Solution</li>
                        <li>Get Daily Focus</li>
                        <li>Find Tution</li>
                    </ul>
                    <button onClick={createCoursePayment}  class="btn-primary">Get Started</button>
                </div>



                <div class="pricing-box pricing-box-bg-image2 text-center">
                    <h5>Assignment</h5>
                    <p class="price"><sup> ৳</sup>500<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li>Unlimited Assignment Post</li>
                        <li>Get Fastest Solution</li>
                        <li>Access to All Free Courses</li>
                        <li>Find Tution</li>
                    </ul>
                    <button onClick={buyAssignmentPremium} class="btn-primary">Get Started</button>
                </div>

                

                <div class="pricing-box pricing-box-bg-image text-center">
                    <h5>Batch</h5>
                    <p class="price"><sup>৳</sup>3000<sub>/per</sub></p>
                    <ul class="features-list">
                        <li>Premium Teacher's Batch</li>
                        <li>Access to All Free Courses</li>
                        <li>Access to All Free Exam</li>
                        <li>Find Tution</li>
                    </ul>
                    <Link to='/student-dashboard/batch'><button class="btn-primary">Get Started</button></Link>
                </div>

                
            </div>

            

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