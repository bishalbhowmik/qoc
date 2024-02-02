import React from 'react'
import { connect } from 'react-redux'
import { createCoursePaymentApi } from '../../../Api/Student/PaymentApi'
import './Payment.css'

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
            {/* <button onClick={createCoursePayment} className='btn btn-success'>Get Premium Course Access</button> */}



            <h1 class="text-center font-semibold text-3xl mb-10">Pick the best plan for you</h1>

            <div class="pricing-box-container">
                <div class="pricing-box text-center">
                    <h5>Free</h5>
                    <p class="price"><sup>$</sup>0<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li><strong>1</strong> Project</li>
                        <li><strong>5</strong> Team Members</li>
                        <li><strong>50</strong> Personal Projects</li>
                        <li><strong>5,000</strong> Messages</li>
                    </ul>
                    <button class="btn-primary">Get Started</button>
                </div>


                <div class="pricing-box pricing-box-bg-image3 text-center">
                    <h5>Course</h5>
                    <p class="price"><sup>৳</sup>2500<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li><strong>25</strong> Project</li>
                        <li><strong>50</strong> Team Members</li>
                        <li><strong>500</strong> Personal Projects</li>
                        <li><strong>50,000</strong> Messages</li>
                    </ul>
                    <button class="btn-primary">Get Started</button>
                </div>



                <div class="pricing-box pricing-box-bg-image2 text-center">
                    <h5>Assignment</h5>
                    <p class="price"><sup> ৳</sup>500<sub>/mo</sub></p>
                    <ul class="features-list">
                        <li><strong>5</strong> Project</li>
                        <li><strong>20</strong> Team Members</li>
                        <li><strong>100</strong> Personal Projects</li>
                        <li><strong>15,000</strong> Messages</li>
                    </ul>
                    <button class="btn-primary">Get Started</button>
                </div>

                

                <div class="pricing-box pricing-box-bg-image text-center">
                    <h5>Batch</h5>
                    <p class="price"><sup>৳</sup>3000<sub>/per</sub></p>
                    <ul class="features-list">
                        <li><strong>25</strong> Project</li>
                        <li><strong>50</strong> Team Members</li>
                        <li><strong>500</strong> Personal Projects</li>
                        <li><strong>50,000</strong> Messages</li>
                    </ul>
                    <button class="btn-primary">Get Started</button>
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