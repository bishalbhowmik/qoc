import bufferToDataUrl from 'buffer-to-data-url'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTeacher } from '../../Api/Admin/TeacherApi'
import { getAllBatchApi } from '../../Api/Student/BatchApi'

export const TutorDetails = (props) => {


    const { id } = useParams()
    const [teacher, setTeacher] = useState(null)
    const [batches, setBatches] = useState([])

    useEffect(() => {

        getTeacher({ _id: id }).then(data => {
            if (data.error) throw data.message
            setTeacher(data.data[0])

            getAllBatchApi({ teacherId: id }).then(data => {

                if (data.error) throw data.message
                setBatches(data.data)

            }).catch(err => console.log(err))

        })
            .catch(err => window.alert(err))

    }, [id])

    if (!teacher) return <div className='p-24 text-center font-bold'>Teacher not found</div>


    let batchShow
    if (batches.length === 0) { batchShow = <div className='p-24 text-center font-bold'>No Batch Found</div> }
    else {
        batchShow = batches.map(item => {
            return (
                <div class="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col space-y-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">{ item.title }</h3>
                        <span class="text-sm font-medium bg-green-500 text-white rounded-full px-2 py-1">Enrolled: { item.enrolledStudents.length }</span>
                    </div>
                    <div class="text-gray-700">
                        <p>{ item.description }</p>
                    </div>
                    <div class="flex justify-between items-center text-gray-700">
                        <span>Start Date: {new Date(item.startDate).toLocaleDateString() }</span>
                        <span>Fees: ৳{ item.fees }</span>
                    </div>
                    <div class="flex space-x-2">
                        <template x-if="batch.pastPaperSolution">
                            <span class="inline-block rounded-full px-2 py-1 text-center text-xs font-bold text-white bg-purple-500">Past Paper Solutions Included</span>
                        </template>
                        {props.authenticated && props.decodedToken.role === "student" && <a href="" class="inline-block rounded-full px-3 py-2 text-center text-white bg-blue-500 hover:bg-blue-700">Join Now</a>}
                    </div>
                </div>
            )
        })
            
    }




    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/3 flex justify-center items-center align-middle flex-col">
                        <img src={teacher.image && teacher.image.contentType && teacher.image != '' ? bufferToDataUrl(teacher.image.contentType, teacher.image.data) : '/male.png'} class="mx-auto rounded-full shadow-lg dark:shadow-black/20 w-3/6" alt="" />
                        <div className="text-gray-700 mt-5"> {teacher.bio}</div>
                    </div>
                    <div className="w-full lg:w-2/3 flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">{teacher.username}</h1>
                            <span className=" rounded-full px-2 py-1 text-center text-xs font-bold text-white bg-red-800">{teacher.role}</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className="text-gray-700">Degree: {teacher.degree}</span>
                            <span className="text-gray-700">Institution: {teacher.institution}</span>
                            <span className="text-gray-700">Country: {teacher.country}</span>
                            <span className="text-gray-700">Description: {teacher.description}</span>
                        </div>


                        <div className="flex items-center space-x-2">
                            <span className="inline-block rounded-full px-2 py-1 text-center text-xs font-bold text-white bg-green-500">Review: {teacher.review} / 5</span>
                        </div>
                    </div>
                </div>
                <div className="mt-14">
                    <h2 className="text-xl font-bold text-gray-800">Batch Details</h2>
                    <div className="grid grid-col-1 md:grid-col-2 lg:grid-col-3 gap-6 mt-4">
                        {batchShow}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetails)