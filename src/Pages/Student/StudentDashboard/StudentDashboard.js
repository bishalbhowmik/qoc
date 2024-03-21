import { faBell, faCalendarCheck, faHandsClapping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFocusApi } from '../../../Api/Admin/FocusApi'
import { getAllActivityApi } from '../../../Api/Student/StudentApi'
import { showFile } from '../../../Functions/CustomFunction'
import Spinner from '../../../components/Spinner'

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }

}


export const StudentDashboard = (props) => {

  const [spin, setSpin] = useState(false)
  const [focus, setFocus] = useState([])
  const [batches, setBatches] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [assignments, setAssignments] = useState([])
  const [exam, setExam] = useState([])
  const [mcqData, setMcqData] = useState([])
  const [bqData, setBqData] = useState([])
  const [scoreData, setScoreData] = useState([])
  const [notice, setNotice] = useState([])

  useEffect(() => {

    setSpin(true)

    getFocusApi({}).then((data) => {

      if (data.error) throw data.message;
      setFocus(data.data.filter(item => new Date() >= new Date(item.startTime) && new Date() <= new Date(item.endTime)));
    }).catch(err => { })


    getAllActivityApi(props.decodedToken._id).then(data => {
      console.log(data)
      setSpin(false)
      if (data.error) throw data.message
      setAssignments([...data.data.postedAssignment])
      setBatches([...data.data.batches])
      setExam([...data.data.submittedExam])
      setUpcoming([...data.data.upcomingCourse])
      setNotice([...data.data.notice])
    }).catch(err => {
      console.log(err)
    })

  }, [props])


  exam.map(item => {
    // item.participants.map(i => i.studentId === props.decodedToken._id ? i.broadQuestionMarks : null)
    item.participants.map(i => {
      if (i.studentId === props.decodedToken._id) {

        // console.log('broad: ',i.broadQuestionMarks)
        // console.log('Mcq',i.mcqMarks)
        // console.log('Total: ',((i.broadQuestionMarks + i.mcqMarks) / item.totalMarks) * 100)

        bqData.push(i.broadQuestionMarks ? i.broadQuestionMarks : 0)

        mcqData.push(i.mcqMarks ? i.mcqMarks : 0)

        let total = (((i.broadQuestionMarks + i.mcqMarks) / item.totalMarks) * 100)
        scoreData.push(total ? total : 0)
      }
    })
  })







  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };



  const barData2 = {

    labels: exam.map(item => item.exam),

    datasets: [
      {
        label: 'MCQ',
        data: mcqData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Broad Question',
        data: bqData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Score (%)',
        data: scoreData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const piDataArray = () => {

    let worst = 0
    let good = 0
    let best = 0

    for (let i in scoreData) {
      if (scoreData[i] <= 50) {
        worst = worst + 1;
      }
      else if (scoreData[i] > 50 && scoreData[i] <= 80) {
        good = good + 1;
      }
      else {
        best = best + 1;
      }
    }

    return [worst, good, best];

  }


  const piData = {

    labels: ['>=50%', '50% - 80%', '< 80%'],
    datasets: [
      {
        label: 'Exam count: ',
        data: piDataArray(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };















  return (
    <div className=''>



      {/* <div className="bg-slate-200">
        <div className=' text-slate-400'>Hello {props.decodedToken.username}! Welcome back <FontAwesomeIcon icon={faHandsClapping} className=' text-amber-600' /></div>
        <div className='text-3xl font-bold'>Your Dashboard Today</div>
      </div> */}

      <div className='mb-14 grid grid-cols-1 md:grid-cols-12 gap-14'>

        <div className='col-span-full md:col-span-9'>


          <div className='mb-10'>
            <div className=' text-slate-400'>Hello {props.decodedToken.username}! Welcome back <FontAwesomeIcon icon={faHandsClapping} className=' text-amber-600' /></div>
            <div className='text-3xl font-bold'>Your Dashboard Today</div>
          </div>

          <div className=' bg-red-800 text-white p-5 rounded-2xl '>
            <div className='capitalize text-xl mb-5'>Together we achieve educational excellence</div>

            <div className='grid grid-cols-1 md:grid-cols-5'>
              <div className='col-span-4 text-sm'>Lorem ipminus voluptatum necessitatibus, ducimus qui deleniti reiciendis. Expedita nam praesentium exercitationem incidunt vel provident, accusamus et laborum, ipsam atque ratione culpa fugit! Quos dignissimos aliquam blanditiis nulla.</div>

              <div className='md:text-center mt-5 md:mt-0'><button className='btn text-center btn-sm md:btn-md'>Get started</button></div>
            </div>
          </div>


          <div className='grid grid-cols-1 md:grid-cols-12 gap-4 mt-16'>
            <div className='col-span-full md:col-span-4 border rounded-lg shadow p-3'>
              <Doughnut data={piData} />
            </div>
            <div className='col-span-full md:col-span-8 border rounded-lg shadow p-3'>
              <Line options={options} data={barData2} />

            </div>
          </div>


          {/* <div className='flex justify-center w-full'>
            <div className='w-2/5 mt-10'>
              
            </div>
          </div> */}
        </div>


        <div className=' col-span-full md:col-span-3'>


          <div className='mb-10 bg-slate-400'>


          </div>


          <div className='mb-10'>
            <div className='text-xl font-bold mb-5 border-b pb-3'>Notice</div>
            {notice.length === 0 ? <div>No notice found!</div> : notice.map(item => {

              // console.log(item)

              return (
                <div className='flex mb-4 cursor-pointer'>
                  <div className='mt-3'><FontAwesomeIcon icon={faBell} className='fas fa-xl text-rose-700 me-6' /></div>
                  <div>
                    <span>{item.title}</span> <br />
                    <span className='text-xs'>{item.description}</span>
                  </div>
                </div>
              )
            })}
          </div>


          <div className='mb-10'>
            <div className='text-xl font-bold mb-5 border-b pb-3'>Upcoming Course</div>
            {upcoming.length === 0 ? <div>We are working!</div> : upcoming.map(item => {
              return (
                <div className='flex mb-4 cursor-pointer'>
                  <div className='mt-3'><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                  <div>
                    <span>{item.title}</span> <br />
                    <span className='text-sm'>Starting on ~ {new Date(item.startDate).toDateString()}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='mb-10'>
            <div className='text-xl font-bold mb-5 border-b pb-3'>To Do</div>
            {focus.length === 0 ? <div>No task to do!</div> : focus.map(item => {
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

        </div>

        {spin && <Spinner />}

      </div>



      <div className='grid grid-cols-1 md:grid-cols-12 gap-14'>
        <div className='col-span-full md:col-span-9'>
          <div className='text-xl font-bold mb-5 border-b pb-3'>Recent Activities</div>


          <div className='grid grid-cols-1 md:grid-cols-12 gap-14'>

            <div className='col-span-full md:col-span-6'>
              <div className='font-bold my-3'>Exams</div>
              {exam.length === 0 ? <div>No exam found</div> : exam.map((item, index) => {

                return (
                  <div className='flex mb-4 cursor-pointer'>
                    <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                    <div>
                      <Link to={'/student-dashboard/exam'} state={{ exam: item }}>{item.exam}</Link> <br />
                    </div>
                  </div>
                )

              })}
            </div>
            <div className='col-span-full md:col-span-6'>
              <div className='font-bold my-3'>Assignment</div>
              {assignments.length === 0 ? <div>No assignment found</div> : assignments.map((item, index) => {
                return (
                  <div className='flex mb-4 cursor-pointer' onClick={e => showFile(item.assignment)}>
                    <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                    <div>
                      <span className='italic'>Posted a new assignment ~ <span className=''>{item.title}</span></span> <br />
                    </div>
                  </div>
                )
              })}
            </div>


          </div>

        </div>

        <div className='col-span-full md:col-span-3'>
          <div className='text-xl font-bold mb-5 border-b pb-3'>Running Batch</div>
          {batches.length === 0 ? <div>No assignment found</div> : batches.map(item => {
            return (
              <div className='flex mb-4 cursor-pointer'>
                <div className=''><FontAwesomeIcon icon={faCalendarCheck} className='fas fa-xl text-rose-700 me-6' /></div>
                <div>
                  <Link to={'my-batch/dashboard/' + item._id} className=''> <span className=''>{item.title}</span></Link> <br />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}


export default connect(mapStateToProps)(StudentDashboard)