import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getDemoClassApi } from '../../Api/Admin/DemoClassApi'
import './RequestDemo.css'

export const RequestDemo = (props) => {

  const [demoClass, setDemoClass] = useState([])
  let color = ['#3ecd5e', '#e44002', '#952aff', ' #cd3e94', '#4c49ea']

  useEffect(() => {



    getDemoClassApi().then(data => {
      console.log(data)
      if (data.error) throw data.message
      setDemoClass(data.data.filter(item => new Date() >= new Date(item.startTime) && new Date() <= new Date(item.endTime)))
    }).catch(err => window.alert(err))

  }, [])



  let demoClassShow

  if (demoClass.length === 0) {
    demoClassShow = <div className='p-20 font-bold text-xl text-center col-span-full'>No Demo Class Found</div>
  }

  else {
    demoClassShow = demoClass.map(item => {
      return (
        <div style={{ backgroundColor: color[Math.floor(Math.random() * color.length)] }} class="ag-courses_item">
          <div class="ag-courses-item_link">
            <div style={{ backgroundColor: color[Math.floor(Math.random() * color.length)] }} class="ag-courses-item_bg"></div>

            <div class="ag-courses-item_title ">
              <div className='text-xl font-bold'>{item.title}</div>
              <div className='text-white pt-7 text-sm' >{item.description}</div>
            </div>

            <div class="ag-courses-item_date-box text-sm">
              Class Time:
              <span class="ag-courses-item_date ms-3">
                {new Date(item.classTime).toLocaleString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}
              </span>
              <div className=''><a href={item.classLink} target='_blank' className='btn btn-neutral ag_btn btn-sm mt-5' rel="noreferrer">Join Class</a></div>
            </div>

          </div>
        </div>
      )
    })
  }





  return (
    <div class="ag-format-container container md:px-5 px-3">
      <div class="ag-courses_box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {demoClassShow}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RequestDemo)