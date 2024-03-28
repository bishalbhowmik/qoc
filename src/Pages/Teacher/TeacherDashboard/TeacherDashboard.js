import bufferToDataUrl from 'buffer-to-data-url'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTeacher } from '../../../Api/Admin/TeacherApi'
import { updateTeacherInfoApi } from '../../../Api/Teacher/TeacherApi'
import Spinner from '../../../components/Spinner'

export const TeacherDashboard = (props) => {

  const [state, setState] = useState({
    username: '',
    email: '',
    mobile: '',
    degree: '',
    review: '',
    grading: '',
    useQocExam: '',
    checkQocExam: '',
    contactAgree: '',
    institution: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    bio: '',
    description: '',
    isPremium: '',
    premiumEnd: '',
  })

  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)
    getTeacher({ _id: props.decodedToken._id }).then(data => {
      setSpin(false)

      setState({
        ...state,
        username: data.data[0].username,
        email: data.data[0].email,
        mobile: data.data[0].mobile,
        degree: data.data[0].degree,
        review: data.data[0].review,
        grading: data.data[0].grading,
        useQocExam: data.data[0].useQocExam,
        contactAgree: data.data[0].contactAgree,
        institution: data.data[0].institution,
        gender: data.data[0].gender,
        address: data.data[0].address,
        city: data.data[0].city,
        state: data.data[0].state,
        zip: data.data[0].zip,
        country: data.data[0].country,
        bio: data.data[0].bio,
        description: data.data[0].description,
        image: data.data[0].image,
        isPremium: data.data[0].batch.isPremium,
        premiumEnd: new Date(data.data[0].batch.endTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' }),
      })
    })

  }, [])


  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
    })
  }

  const handleSubmit = e => {

    e.preventDefault()

    setSpin(true)


    updateTeacherInfoApi(props.decodedToken._id, state).then(data => {

      setSpin(false)

      window.alert(data.message)
    })
  }


  // console.log(state)

  return (
    <div>

      <div className='w-full'>
        <img className='rounded-full w-2/12 m-auto my-5' src={state.image && state.image.contentType && state.image != '' ? process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + state.image.name : 'male.png'} alt="picture" />
        <div className='text-center font-bold text-xl' style={{ letterSpacing: '2px' }}>{props.decodedToken.username}</div>
      </div>

      <div>
        <form onSubmit={e => handleSubmit(e)} action="">

          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Picture: </label>
              <input className='file-input w-full shadow' onChange={e => handleChange(e)} name='image' type="file" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Email: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.email} name='email' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Mobile: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.mobile} name='mobile' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Gender: </label>
              <select className='select-bordered select w-full shadow' onChange={e => handleChange(e)} name="gender" value={state.gender} id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Degree: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.degree} name='degree' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Review: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.review} name='review' type="number" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Grading: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.grading} name='grading' type="number" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Use QOC Exam: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.useQocExam} name='useQocExam' type="number" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Check QOC Exam: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.checkQocExam} name='checkQocExam' type="number" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Contact Agree: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.contactAgree} name='contactAgree' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Institution: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.institution} name='institution' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Address: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.address} name='address' type="text" />

            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">City: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.city} name='city' type="text" />
            </div>

            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">State: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.state} name='state' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Zip: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.zip} name='zip' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Country: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.country} name='country' type="text" />

            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Bio: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.bio} name='bio' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Description: </label>
              <input className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.description} name='description' type="text" />
            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Premium: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.isPremium} name='isPremium' type="text" />

            </div>
            <div className='col-span-12 md:col-span-6'>
              <label className='label label-text mt-5' htmlFor="">Premium End: </label>
              <input disabled className='input input-bordered w-full shadow' onChange={e => handleChange(e)} value={state.premiumEnd} name='premiumEnd' type="text" />
            </div>
          </div>

          <div>
            <button className='btn btn-info my-7' type='submit'>Update Info</button>
          </div>

        </form>
      </div>

      {spin && <Spinner />}

    </div>
  )
}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  decodedToken: state.decodedToken
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard)