import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllCurriculumApi } from '../../../Api/Admin/CurriculumApi'
import { getAStudent, updateStudent } from '../../../Api/Student/StudentApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faHandsClapping, faMoneyBill1, faMoneyBillTransfer, faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { getFocusApi } from '../../../Api/Admin/FocusApi'
import { showFile } from '../../../Functions/CustomFunction'
import Spinner from '../../../components/Spinner'
import { getTransactionApi } from '../../../Api/Student/PaymentApi'



const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }

}


export const StudentDashboard = (props) => {

  const [state, setState] = useState({
    username: '',
    email: '',
    mobile: '',
    country: '',
    curriculumId: '',
  })
  const [spin, setSpin] = useState(false)
  const [focus, setFocus] = useState([])
  const [transaction, setTransaction] = useState([])
  const [curriculum, setCurriculum] = useState([])

  useEffect(() => {

    setSpin(true)
    getAllCurriculumApi().then(data => {

      if (data.error) throw data.message

      setCurriculum([...data.data])

    }).catch(err => {
      console.log(err)
    })

    getAStudent(props.decodedToken._id).then(data => {

      if (data.error) throw data.message

      setState({
        ...state,
        username: data.data.username,
        email: data.data.email,
        mobile: data.data.mobile,
        country: data.data.country,
        curriculumId: data.data.curriculum,
        // password: data.data.password,
      })

    }).catch(err => {
      console.log(err)
    })


    getFocusApi({}).then((data) => {
      setSpin(false)
      if (data.error) throw data.message;
      setFocus(data.data.filter(item => new Date() >= new Date(item.startTime) && new Date() <= new Date(item.endTime)));
    }).catch(err => { })


    getTransactionApi(props.decodedToken._id).then(data => {
      if (data.error) throw data.message
      setTransaction([...data.data])
    }).catch(err => {
      console.log(err)
    })

  }, [props])


  const handleChange = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    updateStudent(props.decodedToken._id, state).then(data => {
      console.log(data)
    })
      .catch(err => {
        console.log(err)
      })

  }


  return (
    <div className=''>

      <div>
        <div className=' text-slate-400'>Hello {props.decodedToken.username}! Welcome back <FontAwesomeIcon icon={faHandsClapping} className=' text-amber-600' /></div>
        <div className='text-3xl font-bold'>Your Dashboard Today</div>
      </div>

      <div className='my-14 grid grid-cols-1 md:grid-cols-12 gap-14'>

        <div className='col-span-full md:col-span-9'>
          <div className=' bg-red-800 text-white p-5 rounded-2xl '>
            <div className='capitalize text-xl mb-5'>Together we achieve educational excellence</div>

            <div className='grid grid-cols-1 md:grid-cols-5'>
              <div className='col-span-4 text-sm'>Lorem ipminus voluptatum necessitatibus, ducimus qui deleniti reiciendis. Expedita nam praesentium exercitationem incidunt vel provident, accusamus et laborum, ipsam atque ratione culpa fugit! Quos dignissimos aliquam blanditiis nulla.</div>

              <div><button className='btn'>Get started</button></div>
            </div>
          </div>
        </div>


        <div className=' col-span-full md:col-span-3'>

          <div className='mb-10'>
            <div className='text-2xl font-bold mb-5 border-b'>To Do</div>
            {focus.length === 0 ? <div></div> : focus.map(item => {
              return (
                <div className='flex mb-4 cursor-pointer' onClick={e => showFile(item.attachment)}>
                  <div className='mt-3'><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                  <div>
                    <span>{item.title}</span> <br />
                    <span className='text-sm'>Due ~ {new Date(item.endTime).toLocaleDateString()}</span>
                  </div>
                </div>
              )
            })}

          </div>

          <div className='mb-10'>
            <div className='text-2xl font-bold mb-5 border-b'>Recent Transactions</div>
            {transaction.length === 0 ? <div></div> : transaction.map(item => {
              return (
                <div className='flex mb-4 cursor-pointer'>
                  <div className='mt-3'><FontAwesomeIcon icon={faSackDollar} className='fas fa-xl text-rose-700 me-6' /></div>
                  <div>
                    <span><strong className='font-bold'>{item.status}</strong> - {item.amount} BDT</span> <br />
                    <span className='text-sm'>{item.tranDate}</span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {spin && <Spinner />}

      </div>


      {/* <form onSubmit={e => handleSubmit(e)} action="">
        <div className='my-3'>
          <label className='label label-text' htmlFor="">Username</label>
          <input className='input input-bordered' type="text" name='username' disabled value={state.username} />
        </div>

        <div className='my-3'>
          <label className='label label-text' htmlFor="">email</label>
          <input className='input input-bordered' type="text" name='email' disabled value={state.email} />
        </div>


        <div className='my-3'>
          <label className='label label-text' htmlFor="">mobile</label>
          <input className='input input-bordered' type="text" name='mobile' onChange={e => handleChange(e)} value={state.mobile} />
        </div>


        <div className='my-3'>
          <label className='label label-text' htmlFor="">country</label>
          <input className='input input-bordered' type="text" name='country' onChange={e => handleChange(e)} value={state.country} />
        </div>

        <div className='my-3'>
          <span className="label label-text">Curriculum: </span>
          <select required className='select select-bordered' name="curriculumId" onChange={(e) => handleChange(e)} >
            <option value="">Select</option>

            {curriculum.map(item => <option key={Math.random()} selected={item._id === state.curriculumId} value={item._id}>{item.curriculum}</option>)}

          </select>
        </div>

        <button type='submit' className="btn">Update</button>

      </form> */}

    </div>
  )
}


export default connect(mapStateToProps)(StudentDashboard)