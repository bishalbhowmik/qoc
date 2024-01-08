import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllBatchApi } from '../../../Api/Student/BatchApi'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'

export const Batch = (props) => {

  const [batch, setBatch] = useState([])
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)
    getAllBatchApi({}).then(data => {

      setSpin(false)
      if (data.error) throw data.message

      setBatch([...data.data])

    }).catch(err => { console.log(err) })

  }, [])


  let batchShow
  if (batch.length === 0) batchShow = <div className='col-span-12 text-center'>No Batch found</div>

  else {
    batchShow = batch.map((item, index) => {
      return (
        <Link to='' key={index} className='col-span-12 md:col-span-6 border p-3 mb-3 text-center rounded'>
          <div className='font-bold'>{item.title}</div>
          <div className='font-bold'>{item.fees}</div>
        </Link>
      )
    })
  }


  return (
    <div>
      <div className='grid gap-10 grid-cols-12 mt-10'>
        {batchShow}
      </div>

      {spin ? <Spinner /> : ''}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Batch)