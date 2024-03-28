import React from 'react'
import { connect } from 'react-redux'
import image from '../../assets/about.svg'

export const About = (props) => {
    return (
        <div className='px-3 md:px-10 mb-10'>

            <div className='text-2xl font-bold text-center my-10'>About</div>

            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='md:col-span-1 flex justify-center text-center'>
                    <img className='w-3/4 md:w-5/6' src={image} alt="" />
                </div>
                <div className='md:col-span-2'>
                    <div className='text-xl text-red-800 md:mt-10 mb-5 font-bold'>Who are we?</div>
                    <p>
                        Welcome to QOC - Quorum of Collaborative-learning, a pioneering educational platform where
                        knowledge seamlessly intertwines with collective exploration. In the dynamic realm of learning,
                        QOC stands as a testament to the power of shared educational experiences in shaping the
                        future of learning.
                    </p>

                    <p className='mt-8'>
                        QOC has meticulously designed a dynamic and engaging learning platform that brings students
                        and educators together from diverse backgrounds. Whether you are following curriculums like
                        Cambridge, EdExcel, IB, CBSE, ICSE, NCTB, or exploring our free courses, QOC provides a
                        space where learning transcends individual endeavors.
                        QOC understands the importance of trust. With a global community of satisfied parents and a dedicated feedback section, they offer evidence of their success. Real-time feedback ensures constant progress, while collaborative projects build communication and teamwork skills – essential for future success.
                    </p>

                    <p className='mt-8'>
                        QOC isn't just an online school; it's a vibrant learning ecosystem. It's a place where knowledge is not a solitary pursuit but a shared adventure. By joining the QOC community, your child will embark on a journey of intellectual discovery, personal growth, and global connection.
                    </p>
                </div>
            </div>

            <div>
                <div className='mb-10'>
                    <div className='text-xl text-red-800 my-5 font-bold'>Our Mission</div>
                    Our mission goes beyond conventional education; QOC is more than just a platform – it's a
                    community dedicated to the principles of collaborative learning. We aim to empower individuals
                    to grow intellectually and socially, fostering an environment where learners thrive through
                    interaction, discussion, and the exchange of insights.
                </div>

                <div className='my-5'>
                    <div className='text-xl text-red-800 my-5 font-bold'>Our vision</div>
                    Embark on an exciting journey of exploration, discovery, and education with QOC. Let's together
                    build a Quorum of Learning that transcends boundaries and transforms the educational
                    landscape. Join us and become part of a community that cherishes knowledge, values
                    collaboration, and embraces the transformative power of education.
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(About)