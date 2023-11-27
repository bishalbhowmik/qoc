import React from 'react';
import course1 from '../../images/course-1.jpg';

const CourseInfo = ({ course }) => {


    const {title} = course;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl z-0">
                <figure className="px-10 pt-10">
                    <img src={course1} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p>Qoclearning</p>
                    <h2 className="card-title">{title}</h2>
                    <p className='font-semibold'>Price: $20</p>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseInfo;