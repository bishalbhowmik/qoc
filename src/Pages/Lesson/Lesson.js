import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CourseInfo from './CourseInfo';

const Lesson = () => {
    const [courseInfo, setCourseInfo] = useState();

    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setCourseInfo(data))
    }, [])

    console.log(courseInfo);
    return (
        <section className='bg-[#FAF8FF]'>
            <div className='p-5 max-w-[90%] mx-auto '>
                <div className="text-center mb-5">

                    <h1 className='text-3xl text-black font-bold mb-5'> Some Of Our Featured Courses</h1>
                    <p className='text-lg text-[#979797]'>
                        There are many variations of passages of Lorem Ipsum <br /> available, but the majority have suffered alteration in some <br /> form, by injected humour.
                    </p>
                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-4'>
                    {
                        courseInfo?.map((course, i) =>
                            <CourseInfo
                                key={course.id}
                                course={course}
                            ></CourseInfo>
                        )
                    }
                </div>



            </div>
        </section>
    );
};

export default Lesson;