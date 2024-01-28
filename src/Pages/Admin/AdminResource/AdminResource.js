import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { showFile } from "../../../Functions/CustomFunction";
import Spinner from "../../../components/Spinner";
import { createResourceApi, getResourceApi, removeResourceApi, updateResourceApi } from "../../../Api/Admin/ResourceApi";
import { getSubjectsApi } from "../../../Api/Admin/SubjectApi";
import { getAllCurriculumApi } from "../../../Api/Admin/CurriculumApi";


export const AdminResource = (props) => {


  const [spin, setSpin] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [curriculum, setCurriculum] = useState([])
  const [subject, setSubject] = useState([])
  const [resourceState, setResourceState] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    chapterId: '',
    subjectId: '',
  });
  const [resource, setResource] = useState([]);


  useEffect(() => {

    setSpin(true)
    getAllCurriculumApi().then(data => {
      
      if (data.error) {
        setCurriculum([])
        setSubject([])
      }
      else {
        setCurriculum(['', ...data.data])
      }
    })

    getResourceApi({}).then(data => {
      setSpin(false)
      if (data.error) throw data.message
      setResource([...data.data])
    }).catch(err => {
      console.log(err)
    })


  }, []);


  const handleResourceChange = e => {

    if (e.target.name === 'curriculumId') {

      setSpin(true)

      getSubjectsApi(e.target.value).then(data => {
        setSpin(false)
        if (data.error) {
          setSubject([])
          setResourceState({ ...resourceState, [e.target.name]: e.target.value, subjectId: '' })
        }
        else {
          setSubject(['', ...data.data])
          setResourceState({ ...resourceState, [e.target.name]: e.target.value, subjectId: '' })

        }

      })

    }

    setResourceState({
      ...resourceState,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
    })
  }


  const handleResourceSubmit = e => {
    e.preventDefault()

    setSpin(true);
    createResourceApi(resourceState).then(data => {
      setSpin(false); //
      window.alert(data.message);

      document.getElementById('addResourceModal').close()

    })



  }


  const updateResource = (item) => {

    setSelectedResource(item)
    setResourceState({
      ...resourceState,
      curriculumId: item.curriculumId,
      subjectId: item.subjectId,
      title: item.title,
      description: item.description,
      startTime: item.startTime,
      endTime: item.endTime,
    })

    document.getElementById('updateResourceModal').showModal()

  }


  const handleUpdatedResourceSubmit = (e) => {
    e.preventDefault()
    setSpin(true);
    updateResourceApi(selectedResource._id, resourceState).then(data => {
      setSpin(false);
      window.alert(data.message);
      document.getElementById('updateResourceModal').close()
    })
  }

  const removeResource = (id) => {
    setSpin(true);
    removeResourceApi(id).then(data => {
      setSpin(false);
      window.alert(data.message);
    })
  }



  return (
    <div>

      <div className="bg-red-800 p-3 text-center my-10 text-xl">
        <span className="text-white rounded">Resource</span>
      </div>

      <div>

        <div className="my-10 ">
          <button className="btn btn-primary" onClick={e => document.getElementById('addResourceModal').showModal()}>Add Resource</button>
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {resource.map(item => {
            return (
              <div className={`card border hover:border-red-800 hover:shadow-lg card-body ${(new Date() >= new Date(item.endTime) || new Date() <= new Date(item.startTime) ? ' bg-red-100' : '')}`}>
                <div className=" card-title">{item.title}</div>
                <div className=" text-sm">{new Date(item.startTime).toLocaleString()} ~ {new Date(item.endTime).toLocaleString()}</div>
                <div className="my-5">{item.description}</div>
                <div onClick={e => showFile(item.attachment)} className="btn btn-sm btn-outline">See Attachment</div>


                <div onClick={e => updateResource(item)} className="btn btn-warning btn-sm">Update</div>
                <div onClick={e => removeResource(item._id)} className="btn btn-error btn-sm">Remove</div>

              </div>
            )
          })}


          <dialog id="updateResourceModal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <h3 className="font-bold text-lg">Update Resource</h3>
              <form onSubmit={e => handleUpdatedResourceSubmit(e)} className="" action="">
                <label className="label label-text" htmlFor="">Title*</label>
                <input name="title" value={resourceState.title} onChange={e => handleResourceChange(e)} placeholder="" className="input input-bordered w-full my-3" type="text" />

                <label className="label label-text" htmlFor="">Description</label>
                <textarea name="description" value={resourceState.description} onChange={e => handleResourceChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                <label className="label label-text" htmlFor="">Start Time*</label>
                <input name="startTime" value={resourceState.startTime} onChange={e => handleResourceChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                <label className="label label-text" htmlFor="">End Time*</label>
                <input name="endTime" value={resourceState.endTime} onChange={e => handleResourceChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                <label className="label label-text" htmlFor="">Attachment*</label>
                <input name="attachment" onChange={e => handleResourceChange(e)} className="file-input w-full mb-3" type="file" />

                <button className="btn btn-warning mb-3" type="submit">Add</button>
              </form>
            </div>

            {spin && <Spinner />}
          </dialog>


        </div>

        <dialog id="addResourceModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h3 className="font-bold text-lg">Add New Resource</h3>
            <form onSubmit={e => handleResourceSubmit(e)} className="" action="">

              <div className='mb-5'>
                <span className="label label-text">Curriculum*: </span>
                <select required className='select select-bordered w-full' name="curriculumId" onChange={(e) => handleResourceChange(e)} id="">
                  {/* <option selected>Select</option> */}
                  {curriculum.map((item, index) => <option selected={resourceState.curriculumId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.curriculum}</option>)}
                </select>
              </div>

              <div className='mb-5'>
                <span className="label label-text">Subject: </span>
                {/* {console.log(subject)} */}
                <select className='select select-bordered w-full' name="subjectId" onChange={(e) => handleResourceChange(e)} id="">
                  {subject.map((item, index) => <option selected={resourceState.subjectId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.subject}</option>)}
                </select>
              </div>


              <label className="label label-text" htmlFor="">Title*</label>
              <input name="title" value={resourceState.title} onChange={e => handleResourceChange(e)} required placeholder="" className="input input-bordered w-full my-3" type="text" />

              <label className="label label-text" htmlFor="">Description</label>
              <textarea name="description" value={resourceState.description} onChange={e => handleResourceChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

              <label className="label label-text" htmlFor="">Start Time*</label>
              <input name="startTime" value={resourceState.startTime} onChange={e => handleResourceChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

              <label className="label label-text" htmlFor="">End Time*</label>
              <input name="endTime" value={resourceState.endTime} onChange={e => handleResourceChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

              <label className="label label-text" htmlFor="">Attachment*</label>
              <input name="attachment" onChange={e => handleResourceChange(e)} required className="file-input w-full mb-3" type="file" />

              <button className="btn btn-warning mb-3" type="submit">Add</button>
            </form>
          </div>

          {spin && <Spinner />}
        </dialog>
      </div>




      {/* Modal Start*/}


      {spin && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminResource);
