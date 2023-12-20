import React from 'react'
import { connect } from 'react-redux'

export const AdminDashboard = (props) => {
  return (
    <div className=''>
      <h2 className='text-3xl p-40 text-center'>Welcome to Admin Dashboard</h2>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)