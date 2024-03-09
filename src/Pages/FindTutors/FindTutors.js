import bufferToDataUrl from 'buffer-to-data-url'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTeacher } from '../../Api/Admin/TeacherApi'
import { Link } from 'react-router-dom'

export const FindTutors = (props) => {

    const [teachers, setTeachers] = useState([])

    useEffect(() => {

        getTeacher({"batch.isPremium": true}).then(data => {
            if (data.error) throw data.message
            setTeachers(data.data.filter(item => item.batch && (new Date() < new Date(item.batch.endTime))))
        })
            .catch(err => window.alert(err))

    }, [])


    let teacherShow
    if (teachers.length === 0) { teacherShow = <div className='p-24 text=center font-bold'>No Teacher Found</div> }
    else {
        teacherShow = teachers.map(item => {

            return (
                <div className="mb-24 md:mb-0">
                    <div
                        className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex justify-center">
                            <div className="flex justify-center -mt-[75px]">
                                <img src={item.image && item.image.contentType && item.image != '' ? bufferToDataUrl(item.image.contentType, item.image.data) : '/male.png'}
                                    className="mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[150px]" alt="Avatar" />
                            </div>
                        </div>
                        <div className="p-6">
                            <h5 className="mb-4 text-lg font-bold">{item.username}</h5>
                            <p className="mb-6">{ item.bio }</p>
                            <div className="mx-auto flex list-inside justify-center">
                                <Link to={`/tutor-details/${item._id}`}><button className='btn btn-outline btn-sm'>See details</button></Link>
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
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FindTutors)