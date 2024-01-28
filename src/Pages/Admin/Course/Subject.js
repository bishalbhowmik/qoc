import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createChapterApi, getChaptersApi } from "../../../Api/Admin/ChapterApi";
import bufferToDataUrl from "buffer-to-data-url";
import { getAllExamApi, uploadSolutionApi } from "../../../Api/Admin/ExamApi";
import { showFile } from "../../../Functions/CustomFunction";
import { addSubjectMaterialsApi, addSubjectOutlineApi, getASubjectsApi, removeSubjectMaterialsApi, removeSubjectOutlineApi } from "../../../Api/Admin/SubjectApi";
import Spinner from "../../../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { createFocusApi, getFocusApi, removeFocusApi, updateFocusApi } from "../../../Api/Admin/FocusApi";

export const Subject = (props) => {
  const location = useLocation();
  const [chapter, setChapter] = useState([]);
  const [outlines, setOutlines] = useState([]);
  const [spin, setSpin] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [exam, setExam] = useState([]);
  const [state, setState] = useState({
    chapter: "",
    paid: false,
  });
  const [updateOutline, setUpdateOutline] = useState({});
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
  const [updateMaterial, setUpdateMaterial] = useState({});
  const [solution, setSolution] = useState({});

  useEffect(() => {

    if (location.state) {

      const { subject } = location.state;
      setSpin(true);

      getASubjectsApi(subject._id).then((data) => {
        if (data.error) throw data.message;
        setOutlines([...data.data.outlines]);
        setMaterials([...data.data.materials]);
      })
        .catch((err) => console.log(err));



      getAllExamApi({ subjectId: subject._id }).then((data) => {

        if (data.error) throw data.message;
        setExam(data.data.filter(item => !item.hasOwnProperty('chapterId') && !item.hasOwnProperty('moduleId')));
      })
        .catch((err) => { });



      getChaptersApi(subject._id).then((data) => {
        setSpin(false);
        if (data.error) throw data.message;
        setChapter([...data.data]);
      })
        .catch((err) => {
          console.log(err);
        });



      getFocusApi({ subjectId: subject._id }).then((data) => {
        console.log(data)
        if (data.error) throw data.message;
        setFocus(data.data.filter(item => !item.hasOwnProperty('chapterId') && !item.hasOwnProperty('moduleId')));
      }).catch(err => {})


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

    createChapterApi({
      ...state,
      subjectId: location.state ? location.state.subject._id : "",
      curriculumId: location.state ? location.state.subject.curriculumId._id : "",
    })
      .then((data) => {
        setSpin(false);
        if (data.error) throw data;
        window.alert(data.message);
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  let chapterShow;
  if (chapter.length === 0) {
    chapterShow = <div className="p-40 text-center col-span-12">Not chapter found</div>;
  } else {
    chapterShow = chapter.map((item, index) => {
      return (
        <Link to="/admin-dashboard/chapter" state={{ chapter: item }} className="card  col-span-6 md:col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white ">
          <div className="card-body items-center">
            <div className="card-title text-center">{item.chapter}</div>
          </div>
        </Link>
      );
    });
  }

  const removeOutline = (position) => {
    setSpin(true);
    removeSubjectOutlineApi(location.state.subject._id, position).then((data) => {
      setSpin(false);
      window.alert(data.message);
    });
  };

  const addOutline = (e) => {
    e.preventDefault();

    setSpin(true);
    addSubjectOutlineApi(location.state.subject._id, updateOutline).then((data) => {
      setSpin(false);
      window.alert(data.message);
    });
  };

  const removeMaterial = (position) => {
    setSpin(true);
    removeSubjectMaterialsApi(location.state.subject._id, position).then((data) => {
      setSpin(false);
      window.alert(data.message);
    });
  };

  const addMaterial = (e) => {
    e.preventDefault();

    setSpin(true);
    addSubjectMaterialsApi(location.state.subject._id, updateMaterial).then((data) => {
      setSpin(false);
      window.alert(data.message);
    });
  };

  const uploadSolution = (e, examId) => {
    e.preventDefault();

    setSpin(true);

    uploadSolutionApi(examId, solution).then((data) => {
      setSpin(false);
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
    createFocusApi({ ...focusState, subjectId: location.state.subject._id, curriculumId: location.state.subject.curriculumId._id }).then(data => {
      setSpin(false); //
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
      setSpin(false);
      window.alert(data.message);
      document.getElementById('updateFocusModal').close()
    })
  }

  const removeFocus = (id) => {
    setSpin(true);
    removeFocusApi(id).then(data => {
      setSpin(false);
      window.alert(data.message);
    })
  }



  return (
    <div>
      <div className="my-10 text-2xl text-center font-bold">Subject: {location.state ? location.state.subject.subject : ""}</div>

      <div className="mb-16 text-xl text-center">
        <span className="bg-red-800 p-3 text-white rounded">ALL CHAPTERS</span>
      </div>

      <button onClick={() => document.getElementById("addChapterModal").showModal()} className="btn btn-success">
        Add Chapter
      </button>

      <div className="grid gap-10 grid-cols-12 mt-10">{chapterShow}</div>

      <div>
        <div className="bg-red-800 p-3 text-center my-10 text-xl">
          <span className="text-white rounded">OUTLINES</span>
        </div>

        <div className="flex flex-col md:flex-row">
          {outlines.map((item, index) => {
            return (
              <div className="my-3 flex border-2 p-2 shadow me-3 hover:badge-outline rounded">
                <div>
                  <span onClick={() => showFile(item)} className="p-3 hover:text-red-800 cursor-pointer">
                    {item.name}
                  </span>
                  <span onClick={() => removeOutline(index)} className="hover:text-red-800 p-3 fa-xl rounded cursor-pointer">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-10">
          <form onSubmit={(e) => addOutline(e)} action="">
            <input
              required
              multiple
              onChange={(e) => setUpdateOutline({ ...updateMaterial, outlines: e.target.files, })}
              className="file-input"
              type="file"
              name="outlines"
              id=""
            />
            <button className="btn btn-primary" type="submit">
              Add outline
            </button>
          </form>
        </div>

        <div className="bg-red-800 p-3 text-center my-10 text-xl">
          <span className="text-white rounded">MATERIALS</span>
        </div>

        <div className="flex flex-col md:flex-row">
          {materials.map((item, index) => {
            return (
              <div className="my-3 flex border-2 p-2 shadow me-3 hover:badge-outline rounded">
                <div>
                  <span onClick={() => showFile(item)} className="p-3 hover:text-red-800 cursor-pointer">
                    {item.name}
                  </span>
                  <span onClick={() => removeMaterial(index)} className="hover:text-red-800 p-3 fa-xl rounded cursor-pointer">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-10">
          <form onSubmit={(e) => addMaterial(e)} action="">
            <input
              required
              multiple
              onChange={(e) =>
                setUpdateMaterial({
                  ...updateMaterial,
                  materials: e.target.files,
                })
              }
              className="file-input"
              type="file"
              name="materials"
              id=""
            />
            <button className="btn btn-primary" type="submit">
              Add outline
            </button>
          </form>
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
                  <div className=" text-sm">{new Date(item.startTime).toLocaleString()} ~ {new Date(item.endTime).toLocaleString()}</div>
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
          <div className="text-center my-10 bg-red-800 p-3 text-xl">
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
                        <input
                          onChange={(e) =>
                            setSolution({
                              ...solution,
                              [e.target.name]: e.target.files[0],
                            })
                          }
                          type="file"
                          name="solution"
                          id=""
                        />
                        <button type="submit">Upload</button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal Start*/}

      <dialog id="addChapterModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">Add New Chapter</h3>

          <form onSubmit={(e) => handleSubmit(e)} className="mt-10" action="">
            <div className="mb-5">
              <span className="label label-text">Chapter Name: </span>
              <input required name="chapter" onChange={(e) => handleChange(e)} value={state.chapter} type="text" placeholder="Type here" className="input input-bordered w-full" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
