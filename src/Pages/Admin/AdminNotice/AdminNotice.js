import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllCurriculumApi } from "../../../Api/Admin/CurriculumApi";
import { createNoticeApi, getNoticeApi, deleteNoticeApi } from "../../../Api/Admin/NoticeApi";
import Spinner from "../../../components/Spinner";

export const AdminNotice = (props) => {




    const [spin, setSpin] = useState(false);
    const [curriculum, setCurriculum] = useState([])
    const [noticeState, setNoticeState] = useState({
        title: '',
        curriculumId: '',
        description: ''
    });


    const [notice, setNotice] = useState([]);


    useEffect(() => {

        setSpin(true)
        getAllCurriculumApi().then(data => {

            if (data.error) {
                setCurriculum([])
            }
            else {
                setCurriculum(['', ...data.data])
            }
        })

        getNoticeApi().then(data => {
            console.log(data)
            setSpin(false)
            if (data.error) throw data.message
            setNotice([...data.data])
        }).catch(err => {
            console.log(err)
        })


    }, []);


    const handleChange = e => {

        setNoticeState({
            ...noticeState,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault()

        setSpin(true);
        createNoticeApi(noticeState).then(data => {
            console.log(data)
            setSpin(false); //
            window.alert(data.message);

            document.getElementById('addNoticeModal').close()

        })



    }


    const remove = (id) => {
        setSpin(true);
        deleteNoticeApi(id).then(data => {
            setSpin(false);
            window.alert(data.message);
        })
    }



  return (
      <div>

          <div>
              <div className="my-10 ">
                  <button className="btn btn-primary" onClick={e => document.getElementById('addNoticeModal').showModal()}>Add Notice</button>
              </div>

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {notice.map(item => {
                      return (
                          <div className={`card border hover:border-red-800 hover:shadow-lg card-body`}>
                              <div className=" card-title">{item.title}</div>
                              <div className=" text-sm">{item.description}</div>
                              <div className="my-5"># {item.curriculumId.curriculum}</div>

                              <div onClick={e => remove(item._id)} className="btn btn-error btn-sm">Remove</div>

                          </div>
                      )
                  })}

              </div>

              <dialog id="addNoticeModal" className="modal">
                  <div className="modal-box">
                      <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>

                      <h3 className="font-bold text-lg">Add New Upcoming Course</h3>
                      <form onSubmit={e => handleSubmit(e)} className="" action="">

                          <div className='mb-5'>
                              <span className="label label-text">Curriculum*: </span>
                              <select required className='select select-bordered w-full' name="curriculumId" onChange={(e) => handleChange(e)} id="">
                                  {curriculum.map((item, index) => <option selected={noticeState.curriculumId === item._id} value={index === 0 ? '' : item._id}>{index === 0 ? 'Select' : item.curriculum}</option>)}
                              </select>
                          </div>


                          <label className="label label-text" htmlFor="">Title*</label>
                          <input name="title" value={noticeState.title} onChange={e => handleChange(e)} required placeholder="" className="input input-bordered w-full my-3" type="text" />

                          <label className="label label-text" htmlFor="">Description*</label>
                          <textarea name="description" value={noticeState.description} onChange={e => handleChange(e)} required placeholder="" className=" textarea textarea-bordered w-full my-3" type="text" />
                          

                          <button className="btn btn-warning mb-3" type="submit">Submit</button>
                      </form>
                  </div>

                  {spin && <Spinner />}
              </dialog>
          </div>




          {/* Modal Start*/}


          {spin && <Spinner />}
      </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNotice)