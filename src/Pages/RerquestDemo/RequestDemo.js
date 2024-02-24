import React from 'react'
import { connect } from 'react-redux'

export const RequestDemo = (props) => {
  return (
    <div>RequestDemo</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RequestDemo)