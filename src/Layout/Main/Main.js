import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import TopNav from "../../Shared/TopNav/TopNav";
import BottomNav from "../../Shared/PoftfolioNav/BottomNav";
import { connect } from "react-redux";
import { checkAuth, tokenDecode } from "../../Functions/AuthFunctions";
import { AUTHENTICATED } from "../../Redux/ActionTypes";


const mapStateToProps = (state) => {

  return {

  }
}


const Main = (props) => {

  useEffect(() => {

    checkAuth().then(auth => {

      tokenDecode().then(data => {

        props.dispatch({
          type: AUTHENTICATED,
          authenticated: auth,
          decodedToken: data

        })

      })

    })

  }, [])






  return (
    <div>
      <TopNav></TopNav>
      <BottomNav></BottomNav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default connect(mapStateToProps)(Main);
