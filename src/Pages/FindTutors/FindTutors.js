import bufferToDataUrl from 'buffer-to-data-url'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTeacher } from '../../Api/Admin/TeacherApi'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'

export const FindTutors = (props) => {

    const [teachers, setTeachers] = useState([])
    const [spin, setSpin] = useState(false)

    useEffect(() => {

        setSpin(true)
        getTeacher({ "batch.isPremium": true }).then(data => {
            setSpin(false)
            if (data.error) throw data.message
            setTeachers(data.data.filter(item => item.batch && (new Date() < new Date(item.batch.endTime))))
        })
            .catch(err => window.alert(err))

    }, [])


    let teacherShow
    if (teachers.length === 0) { teacherShow = <div className='p-24 text=center font-bold'>No Teacher Found</div> }
    else {
        teacherShow = teachers.map(item => {

            let rating = [];
            for (let i = 0; i < 5; i++) {
                if (item.review >= i + 1) {
                    rating.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
                } else if (item.review >= i + 0.5) {
                    rating.push(<i key={i} className="fas fa-star-half-alt text-yellow-500"></i>);
                } else {
                    rating.push(<i key={i} className="far fa-star text-yellow-500"></i>);
                }
            }

            
            
            

            return (
                <div className="mb-24 md:mb-0">
                    <div
                        className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex justify-center">
                            <div className="flex justify-center -mt-[75px] w-[170px] h-[170px] border rounded-full">
                                <img src={item.image && item.image.contentType && item.image != '' ? process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + item.image.name : '/male.png'}
                                    className="mx-auto rounded-full shadow-lg dark:shadow-black/20 w-full h-full" alt="Avatar" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center mt-5">
                                <div className="flex items-center">
                                    {rating}
                                </div>
                            </div>
                        </div>
                        <div className='p-3'>
                            <div className="p-6 bg-slate-50 rounded-lg">
                                <h5 className="mb-4 text-lg font-bold">{item.username}</h5>
                                <p className="mb-6">{item.bio}</p>
                                <div className="mx-auto flex list-inside justify-center">
                                    <Link to={`/tutor-details/${item._id}`}><button className='btn btn-outline btn-sm'>See details</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        })
    }



    return (
        <div>
            <div className="container my-24 mx-auto md:px-6">

                <section className="mb-32 text-center">
                    <h2 className="mb-32 text-3xl font-bold">
                        Our Premium Teachers
                    </h2>

                    <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12 px-3">
                        {teacherShow}
                    </div>
                </section>

            </div>


            {spin && <Spinner />}
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FindTutors)