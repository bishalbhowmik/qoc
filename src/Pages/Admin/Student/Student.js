import React from 'react'
import { connect } from 'react-redux'

export const Student = (props) => {
  return (
    <div>Student</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Student)