import React from 'react'
import './GetInTouch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function GetInTouch() {
    return (
        <div className='py-10'>

            <div className='text-center font-bold text-2xl mb-14'>Get In Touch</div>

            <div class="center">
                <div class="wrapper">

                    <div className='grid md:grid-cols-3 grid-cols-1 gap-12 md:gap-6'>
                        <div>
                            <a href="">
                                <div class="getintouch_container getintouch_container--twitter">
                                    <div class="box box--middle">
                                        <i className='ion ion-social-twitter'><FontAwesomeIcon icon={faTwitter} /></i>
                                        <span class="count">
                                            10.5 K
                                        </span>
                                    </div>
                                    <span class="follow follow--middle">
                                        Follow
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="https://www.facebook.com/norgate.99">
                                <div class="getintouch_container getintouch_container--facebook">
                                    <div class="box box--middle">
                                        <i className='ion ion-social-facebook'><FontAwesomeIcon icon={faFacebook} /></i>
                                        <span class="count">
                                            10.5 K
                                        </span>
                                    </div>
                                    <span class="follow follow--middle">
                                        Follow
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="">
                                <div class="getintouch_container getintouch_container--instagram">
                                    <div class="box box--middle">
                                        <i className='ion ion-social-instagram'><FontAwesomeIcon icon={faInstagram} /></i>
                                        <span class="count">
                                            10.5 K
                                        </span>
                                    </div>
                                    <span class="follow follow--middle">
                                        Follow
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
