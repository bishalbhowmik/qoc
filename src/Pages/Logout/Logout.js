import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTHENTICATED } from '../../Redux/ActionTypes'
import { checkAuth } from '../../Functions/AuthFunctions'



const mapStateToProps = (state) => ({})

const Logout = (props) => {

    localStorage.removeItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME)

    const navigate = useNavigate()

    checkAuth().then(data => {
        props.dispatch({
            type: AUTHENTICATED,
            value: data
        })
        navigate('/login')
    })

    return (
        <div></div>
    )
}





export default connect(mapStateToProps)(Logout)