import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllAssignmentApi, submitSolutionApi } from '../../../Api/Admin/AssignmentApi'
import { Link } from 'react-router-dom'
import bufferToDataUrl from 'buffer-to-data-url'
import Spinner from '../../../components/Spinner'

export const Assignment = (props) => {

  const [assignment, setAssignment] = useState([])
  const [state, setState] = useState({})
  const [selected, setSelected] = useState({})
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)
    getAllAssignmentApi({}).then(data => {
      console.log(data)
      setSpin(false)
      if (data.error) throw data.message
      setAssignment(data.data)
    }).catch(err => console.log(err))

  }, [])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e, id) => {

    e.preventDefault()
    submitSolutionApi(id, state).then(data => {
      if (data.error) throw data.message
      window.alert(data.message)
    }).catch(err => window.alert(err))
  }


  const assignmentModal = (item) => {
    setSelected({ ...item })
    document.getElementById('seeAssignmentModal').showModal()
  }

  let assignmentShow
  if (assignment.length === 0) assignmentShow = <div className='col-span-12 text-center'>No assignment found</div>
  else {
    assignmentShow = assignment.map((item, index) => {
      return <div key={index} className='col-span-12 md:col-span-4 border p-3 mb-3 rounded'>
        <div onClick={() => assignmentModal(item.assignment)} className='font-bold'>{item.title}</div>
        <form onSubmit={e => handleSubmit(e, item._id)} className='my-4' action="">
          <input className='' name='answer' onChange={e => handleChange(e)} type="file" /> <button className='btn btn-info btn-sm' type="submit">Upload</button>
        </form>
        {item.answer.length} submission
        {item.answer.map(i => <div>{i.name}</div>)}
      </div>
    })
  }

  return (
    <div>
      <div className='grid gap-10 grid-cols-12 mt-10'>
        {assignmentShow}
      </div>

      <dialog id="seeAssignmentModal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {Object.keys(selected).length > 0 && <div className=''>
            <div className='my-7 p-10'>
              <div className='font-bold my-5'>{selected.name}</div>
              <object width='100%' className='h-screen' data={bufferToDataUrl(selected.contentType, selected.data)} type=""></object>
            </div>
          </div>}

        </div>
      </dialog>


      {spin ? <Spinner /> : ''}

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)