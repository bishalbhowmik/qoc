import React from 'react'
import { connect } from 'react-redux'

export const StudentDashboard = (props) => {
  return (
    <div>StudentDashboard</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)