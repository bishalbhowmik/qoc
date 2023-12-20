import React from 'react'
import { connect } from 'react-redux'

export const Batch = (props) => {
  return (
    <div>Batch</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Batch)