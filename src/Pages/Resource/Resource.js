import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getResourceApi } from "../../Api/Admin/ResourceApi";
import { showFile } from "../../Functions/CustomFunction";
import Spinner from "../../components/Spinner";


export const Resource = (props) => {


  const [spin, setSpin] = useState(false);
  const [resource, setResource] = useState([]);


  useEffect(() => {

    setSpin(true)

    getResourceApi({}).then(data => {
      setSpin(false)
      if (data.error) throw data.message
      setResource(data.data)
    }).catch(err => {
      console.log(err)
    })


  }, []);


  return (
    <div>



      <div className="p-4 md:p-12">

        <div className="text-center mb-16">
          <h1 className='text-2xl text-black font-bold mb-2'>Free Career Boosters Central</h1>
          <p style={{ letterSpacing: '1.3px' }} className=' text-[#979797]'>Elevate Your Professional Path with Our Curated Collection of Free Resources for Skill Building, Networking, and Success.</p>
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {resource.length === 0 ? <div className="my-20 text-2xl font-bold text-center col-span-full">No resources found</div> : resource.map(item => {
            return (
              <div className={`card shadow-lg border-x-8 hover:border-red-800 card-body ${(new Date() >= new Date(item.endTime) || new Date() <= new Date(item.startTime) ? ' bg-red-100' : '')}`}>
                <div className=" card-title">{item.title}</div>
                {/* <div className=" text-sm">{new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })} ~ {new Date(item.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div> */}
                <div className="my-4">{item.description}</div>
                <div className="">#{item.curriculumId.curriculum}</div>
                <div className="mb-4">#{item.subjectId && <span>{item.subjectId.subject}</span>}</div>
                <div onClick={e => showFile(item.attachment)} className="btn btn-sm btn-outline">See Attachment</div>

              </div>
            )
          })}

        </div>

      </div>


      {spin && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
