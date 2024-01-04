import React from 'react'
import { connect } from 'react-redux'

export const Assignment = (props) => {
  return (
    <div>Assignment</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)