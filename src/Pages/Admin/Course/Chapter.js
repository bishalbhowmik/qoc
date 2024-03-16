import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addChapterMaterialsApi, getAChapterApi, removeChapterMaterialsApi } from "../../../Api/Admin/ChapterApi";
import { getAllExamApi, uploadSolutionApi } from "../../../Api/Admin/ExamApi";
import { createFocusApi, getFocusApi, removeFocusApi, updateFocusApi } from "../../../Api/Admin/FocusApi";
import { createModuleApi, deleteModuleApi, getModulesApi } from "../../../Api/Admin/ModuleApi";
import { showFile } from "../../../Functions/CustomFunction";
import Spinner from "../../../components/Spinner";

export const Chapter = (props) => {
  const location = useLocation();
  const [modules, setModules] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [exam, setExam] = useState([]);
  const [spin, setSpin] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [focusState, setFocusState] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    chapterId: '',
    subjectId: '',
    curriculumId: '',
    moduleId: '',
  });

  const [focus, setFocus] = useState([]);
  const [state, setState] = useState({
    module: "",
    paid: false,
  });
  const [updateMaterial, setUpdateMaterial] = useState({});
  const [solution, setSolution] = useState({});

  useEffect(() => {
    if (location.state) {
      let { chapter } = location.state;

      setSpin(true);

      getAChapterApi(chapter._id)
        .then((data) => {

          if (data.error) throw data.message;
          setMaterials([...data.data.materials]);
        })
        .catch((err) => { });

      getAllExamApi({ chapterId: chapter._id })
        .then((data) => {
          if (data.error) throw data.message;
          setExam(data.data.filter(item => !item.hasOwnProperty('moduleId')));
        })
        .catch((err) => { });

      getModulesApi(chapter._id)
        .then((data) => {

          if (data.error) throw data.message;
          setModules([...data.data]);
        })
        .catch((err) => {

        });


      getFocusApi({ chapterId: chapter._id }).then((data) => {
        setSpin(false);
        if (data.error) throw data.message;
        setFocus(data.data.filter(item => !item.hasOwnProperty('moduleId')));
      }).catch(err => { })
    }
  }, [location]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSpin(true);

    createModuleApi({
      ...state,
      subjectId: location.state ? location.state.chapter.subjectId._id : "",
      curriculumId: location.state ? location.state.chapter.curriculumId._id : "",
      chapterId: location.state ? location.state.chapter._id : "",
    })
      .then((data) => {

        if (data.error) throw data;

        getModulesApi(location.state.chapter._id)
          .then((data) => {
            setSpin(false);
            if (data.error) throw data.message;
            setModules([...data.data]);
          })
          .catch((err) => {

          });
        window.alert(data.message);
      })
      .catch((err) => {
        setSpin(true);
        window.alert(err);
      });
  };


  const deleteModule = id => {

    if (window.confirm("Along with module deletion, all data (Exam, Mcqs, Broadquestions, Resources etc.) in database dependent on it will be deleted. Are you want to procced?")) {

      setSpin(true);
      deleteModuleApi(id).then(data => {

        getModulesApi(location.state.chapter._id)
          .then((data) => {
            setSpin(false);
            if (data.error) throw data.message;
            setModules([...data.data]);
          })
          .catch((err) => {

          });
        window.alert(data.message)
      })
    }


  }

  let moduleShow;
  if (modules.length === 0) {
    moduleShow = <div className="p-40 text-center col-span-12">Not module found</div>;
  } else {
    moduleShow = modules.map((item, index) => {
      return (
        <div className="card  col-span-6 md:col-span-3  glass bg-inherit hover:bg-slate-600 hover:text-white">
          <Link to="/admin-dashboard/module" state={{ module: item }}>
            <div className="card-body items-center">
              <div className="card-title text-center">{item.module}</div>
            </div>
          </Link>
          <div onClick={() => deleteModule(item._id)} className="btn btn-ghost">delete Module</div>
        </div>
      );
    });
  }

  const removeMaterial = (position) => {
    setSpin(true);
    removeChapterMaterialsApi(location.state.chapter._id, position).then((data) => {
      getAChapterApi(location.state.chapter._id)
        .then((data) => {
          setSpin(false)
          if (data.error) throw data.message;
          setMaterials([...data.data.materials]);
        })
        .catch((err) => { });
      
      window.alert(data.message);
    });
  };

  const addMaterial = (e) => {
    setSpin(true);
    e.preventDefault();
    addChapterMaterialsApi(location.state.chapter._id, updateMaterial).then((data) => {
      getAChapterApi(location.state.chapter._id)
        .then((data) => {
          setSpin(false)
          if (data.error) throw data.message;
          setMaterials([...data.data.materials]);
        })
        .catch((err) => { });
      window.alert(data.message);
    });
  };

  const uploadSolution = (e, examId) => {
    e.preventDefault();

    setSpin(true);

    uploadSolutionApi(examId, solution).then((data) => {
      getAllExamApi({ chapterId: location.state.chapter._id })
        .then((data) => {
          setSpin(false);
          if (data.error) throw data.message;
          setExam(data.data.filter(item => !item.hasOwnProperty('moduleId')));
        })
        .catch((err) => { });
      window.alert(data.message);
    });
  };



  const handleFocusChange = e => {
    setFocusState({
      ...focusState,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
    })
  }


  const handleFocusSubmit = e => {
    e.preventDefault()

    setSpin(true);
    createFocusApi({ ...focusState, subjectId: location.state.chapter.subjectId._id, curriculumId: location.state.chapter.curriculumId._id, chapterId: location.state.chapter._id }).then(data => {
       //
      getFocusApi({ chapterId: location.state.chapter._id }).then((data) => {
        setSpin(false);
        if (data.error) throw data.message;
        setFocus(data.data.filter(item => !item.hasOwnProperty('moduleId')));
      }).catch(err => { })
      window.alert(data.message);
    })

    document.getElementById('addFocusModal').close()

  }


  const updateFocus = (item) => {

    setSelectedFocus(item)
    setFocusState({
      ...focusState,
      title: item.title,
      description: item.description,
      startTime: item.startTime,
      endTime: item.endTime,
    })

    document.getElementById('updateFocusModal').showModal()

  }


  const handleUpdatedFocusSubmit = (e) => {
    e.preventDefault()
    setSpin(true);
    updateFocusApi(selectedFocus._id, focusState).then(data => {
      getFocusApi({ chapterId: location.state.chapter._id }).then((data) => {
        setSpin(false);
        if (data.error) throw data.message;
        setFocus(data.data.filter(item => !item.hasOwnProperty('moduleId')));
      }).catch(err => { })
      window.alert(data.message);
      document.getElementById('updateFocusModal').close()
    })
  }

  const removeFocus = (id) => {
    setSpin(true);
    removeFocusApi(id).then(data => {
      getFocusApi({ chapterId: location.state.chapter._id }).then((data) => {
        setSpin(false);
        if (data.error) throw data.message;
        setFocus(data.data.filter(item => !item.hasOwnProperty('moduleId')));
      }).catch(err => { })
      window.alert(data.message);
    })
  }



  return (
    <div>
      <div className="my-10 text-2xl text-center font-bold">Chapter: {location.state ? location.state.chapter.chapter : ""}</div>

      <div className="mb-16 text-xl text-center">
        {" "}
        <span className="bg-red-800 p-3 text-white rounded">All MODULES</span>
      </div>

      <button onClick={() => document.getElementById("addModuleModal").showModal()} className="btn btn-success">
        Add Module
      </button>

      <div className="grid gap-10 grid-cols-12 mt-10">{moduleShow}</div>

      <div>
        <div className="text-center my-20 text-xl">
          {" "}
          <span className="bg-red-800 p-3 text-white rounded">MATERIALS</span>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row">
          {materials.map((item, index) => {
            return (
              <div className="my-3 flex border-2 p-2 shadow me-3 hover:badge-outline rounded">
                <div>
                  <span onClick={() => showFile(item)} className="p-3 hover:text-red-800 cursor-pointer">
                    {item.name}{" "}
                  </span>
                  <span onClick={() => removeMaterial(index)} className="hover:text-red-800 p-3 fa-xl rounded cursor-pointer">
                    {" "}
                    <FontAwesomeIcon icon={faCircleXmark} />{" "}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-10">
          <form onSubmit={(e) => addMaterial(e)} action="">
            <input required multiple onChange={(e) => setUpdateMaterial({ ...updateMaterial, materials: e.target.files })} className="file-input" type="file" name="materials" id="" />
            <button className="btn btn-info" type="submit">
              Add Materials
            </button>
          </form>
        </div>
      </div>

      <div className="bg-red-800 p-3 text-center my-10 text-xl">
        <span className="text-white rounded">Focus</span>
      </div>

      <div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {focus.map(item => {
            return (
              <div className={`card border hover:border-red-800 hover:shadow-lg card-body ${(new Date() >= new Date(item.endTime) || new Date() <= new Date(item.startTime) ? ' bg-red-100' : '')}`}>
                <div className=" card-title">{item.title}</div>
                <div className=" text-sm">{new Date(item.startTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })} ~ {new Date(item.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}</div>
                <div className="my-5">{item.description}</div>
                <div onClick={e => showFile(item.attachment)} className="btn btn-sm btn-outline">See Attachment</div>


                <div onClick={e => updateFocus(item)} className="btn btn-warning btn-sm">Update</div>
                <div onClick={e => removeFocus(item._id)} className="btn btn-error btn-sm">Remove</div>

              </div>
            )
          })}


          <dialog id="updateFocusModal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <h3 className="font-bold text-lg">Update Focus</h3>
              <form onSubmit={e => handleUpdatedFocusSubmit(e)} className="" action="">
                <label className="label label-text" htmlFor="">Title*</label>
                <input name="title" value={focusState.title} onChange={e => handleFocusChange(e)} placeholder="" className="input input-bordered w-full my-3" type="text" />

                <label className="label label-text" htmlFor="">Description</label>
                <textarea name="description" value={focusState.description} onChange={e => handleFocusChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

                <label className="label label-text" htmlFor="">Start Time*</label>
                <input name="startTime" value={focusState.startTime} onChange={e => handleFocusChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                <label className="label label-text" htmlFor="">End Time*</label>
                <input name="endTime" value={focusState.endTime} onChange={e => handleFocusChange(e)} className="input input-bordered mb-3 w-full" type="datetime-local" />

                <label className="label label-text" htmlFor="">Attachment*</label>
                <input name="attachment" onChange={e => handleFocusChange(e)} className="file-input w-full mb-3" type="file" />

                <button className="btn btn-warning mb-3" type="submit">Add</button>
              </form>
            </div>

            {spin && <Spinner />}
          </dialog>


        </div>

        <div className="my-10 "><button className="btn btn-primary" onClick={e => document.getElementById('addFocusModal').showModal()}>Add Focus</button></div>
        <dialog id="addFocusModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h3 className="font-bold text-lg">Add New Focus</h3>
            <form onSubmit={e => handleFocusSubmit(e)} className="" action="">
              <label className="label label-text" htmlFor="">Title*</label>
              <input name="title" value={focusState.title} onChange={e => handleFocusChange(e)} required placeholder="" className="input input-bordered w-full my-3" type="text" />

              <label className="label label-text" htmlFor="">Description</label>
              <textarea name="description" value={focusState.description} onChange={e => handleFocusChange(e)} placeholder="" className=" textarea textarea-bordered w-full mb-3" type="text" />

              <label className="label label-text" htmlFor="">Start Time*</label>
              <input name="startTime" value={focusState.startTime} onChange={e => handleFocusChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

              <label className="label label-text" htmlFor="">End Time*</label>
              <input name="endTime" value={focusState.endTime} onChange={e => handleFocusChange(e)} required className="input input-bordered mb-3 w-full" type="datetime-local" />

              <label className="label label-text" htmlFor="">Attachment*</label>
              <input name="attachment" onChange={e => handleFocusChange(e)} required className="file-input w-full mb-3" type="file" />

              <button className="btn btn-warning mb-3" type="submit">Add</button>
            </form>
          </div>

          {spin && <Spinner />}
        </dialog>
      </div>



      <div>
        <div className="text-center my-20 bg-red-800 p-3 text-xl">
          <span className=" text-white rounded">Paper Solution</span>
        </div>

        {exam.length === 0 ? (
          <div className="p-40 text-center col-span-12">Not Exam found</div>
        ) : (
          exam.map((item) => {
            return (
              <div className="card glass my-10 shadow-lg m-auto">
                <div className="card-body">
                  <div className="text-center text-2xl font-bold">{item.exam}</div>

                  <div className="my-5">
                    <div className="font-bold mb-2">Broad Questions: </div>
                    {item.broadQuestionsId &&
                      item.broadQuestionsId.length != 0 &&
                      item.broadQuestionsId.map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.question}
                          </div>
                        );
                      })}
                  </div>

                  <div className="my-5">
                    <div className="font-bold mb-2">Mcq: </div>
                    {item.mcqsId &&
                      item.mcqsId.length != 0 &&
                      item.mcqsId.map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.question}
                          </div>
                        );
                      })}
                  </div>

                  <div className="my-5">
                    <div className="font-bold mb-2">Solution: </div>
                    {item.solution && (
                      <button onClick={() => showFile(item.solution)} className="btn btn-neutral">
                        {item.solution.name}
                      </button>
                    )}
                  </div>

                  <div className="my-5">
                    <form onSubmit={(e) => uploadSolution(e, item._id)} action="">
                      <div className="font-bold mb-2">Upload Solution: </div>

                      <input onChange={(e) => setSolution({ ...solution, [e.target.name]: e.target.files[0] })} type="file" name="solution" id="" />
                      <button type="submit">Upload</button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Start*/}

      <dialog id="addModuleModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">Add New Module</h3>

          <form onSubmit={(e) => handleSubmit(e)} className="mt-10" action="">
            <div className="mb-5">
              <span className="label label-text">Module Name: </span>
              <input required name="module" onChange={(e) => handleChange(e)} value={state.module} type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>

            <div className="mb-5">
              <span className="label label-text">Paid: </span>
              <select className="select select-bordered w-full" onChange={(e) => handleChange(e)} name="paid" id="">
                {/* <option disabled>Select</option> */}
                <option value={true}>Yes</option>
                <option value={false} selected>
                  No
                </option>
              </select>
            </div>

            <div className="mb-5">
              <span className="label label-text">Materials: </span>
              <input onChange={(e) => handleChange(e)} multiple name="materials" type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>

            <button className="btn btn-warning block" type="submit">
              Confirm
            </button>
          </form>
        </div>
      </dialog>

      {spin && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
