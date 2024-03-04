import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "../PoftfolioNav/BottomNav.module.css";
import { connect } from "react-redux";


const mapStateToProps = (state) => {

  console.log(state)

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}



const BottomNav = (props) => {

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="bg-white">
      <div className="container mx-auto h-[72px] flex justify-between items-center px-10 text-white md:text-navInactive">
        <div className="">
          <Link to="/" smooth={true} duration={500}>
            <img className="md:h-14 md:w-14 h-12 w-12" src={logo} alt="logo" />
          </Link>
        </div>

        {/* menu */}

        <ul id={styles.menu} className="hidden md:flex gap-x-5 font-semibold">

          <li>
            <Link to="/" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          {/* <li>
            <Link to="lesson" smooth={true} duration={500}>
              Lesson
            </Link>
          </li> */}
          <li>
            <Link to="resource" smooth={true} duration={500}>
              Resource
            </Link>
          </li>
          <li>
            {props.decodedToken && props.decodedToken.hasOwnProperty('role') && props.decodedToken.role === 'teacher' ? <Link to="/find-tuition" smooth={true} duration={500}>Find tuition</Link> : <Link to="/find-tuition" smooth={true} duration={500}>Find tuition</Link>}
          </li>
          <li>
            <Link to="/about" smooth={true} duration={500}>
              About Us
            </Link>
          </li>


        </ul>







        <ul className="hidden md:flex gap-x-5">

          {!props.authenticated ? <>
            <li>
              <Link to="/login" smooth={true} duration={500}>
                <button className=" border border-normal rounded-full px-7 py-2 text-sm text-normal font-normal hover:bg-normal hover:text-white">
                  Login
                </button>
              </Link>
            </li>

            <li>
              <Link to="/signup" smooth={true} duration={500}>
                <button className="bg-normal px-7 py-2 rounded-full font-normal text-sm hover:bg-normalH text-white">
                  Signup
                </button>
              </Link>
            </li>
          </> : <>

            <li>
              <Link to={props.decodedToken && props.decodedToken.hasOwnProperty('role') && (props.decodedToken.role === 'teacher' ? '/teacher-dashboard' : props.decodedToken.role === 'student' ? 'student-dashboard' : props.decodedToken.role === 'admin' ? '/admin-dashboard' : '')} smooth={true} duration={500}>
                <button className=" border border-normal rounded-full px-7 py-2 text-sm text-normal font-normal hover:bg-normal hover:text-white">
                  Dashboard
                </button>
              </Link>
            </li>

            <li>
              <Link to="/logout" smooth={true} duration={500}>
                <button className="bg-normal px-7 py-2 rounded-full font-normal text-sm hover:bg-normalH text-white">
                  Logout
                </button>
              </Link>
            </li>
          </>}

        </ul>

        {/* Hamburger */}
        <div
          onClick={handleClick}
          className="text-normal md:hidden z-20 transition duration-100"
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </div>

        {/* Mobile menu */}

        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-screen h-screen text-normal bg-red-100 flex flex-col justify-center items-center z-10"
          }
        >
          <li className="py-4 text-2xl">
            <Link onClick={handleClick} to="home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li className="py-4 text-2xl">
            {" "}
            <Link onClick={handleClick} to="resource" smooth={true} duration={500}>
              Resource
            </Link>
          </li>
          <li className="py-4 text-2xl">
            {" "}
            <Link onClick={handleClick} to="find-tuition" smooth={true} duration={500}>
              Find Tuition
            </Link>
          </li>

          <li className="py-4 text-2xl">
            <Link  onClick={handleClick} to="/about" smooth={true} duration={500}>
              About
            </Link>
          </li>

          {!props.authenticated ? <>
            <li className="py-4 text-2xl">
              <Link onClick={handleClick} to="/login" smooth={true} duration={500}>
                <button className=" border border-normal rounded-full px-7 py-2 text-sm text-normal font-normal hover:bg-normal hover:text-white">
                  Login
                </button>
              </Link>
            </li>

            <li className="py-4 text-2xl">
              <Link onClick={handleClick}  to="/signup" smooth={true} duration={500}>
                <button className="bg-normal px-7 py-2 rounded-full font-normal text-sm hover:bg-normalH text-white">
                  Signup
                </button>
              </Link>
            </li>
          </> : <>

              <li className="py-4 text-2xl">
              <Link onClick={handleClick}  to={props.decodedToken && props.decodedToken.hasOwnProperty('role') && (props.decodedToken.role === 'teacher' ? '/teacher-dashboard' : props.decodedToken.role === 'student' ? 'student-dashboard' : props.decodedToken.role === 'admin' ? '/admin-dashboard' : '')} smooth={true} duration={500}>
                <button className=" border border-normal rounded-full px-7 py-2  font-normal hover:bg-normal hover:text-white">
                  Dashboard
                </button>
              </Link>
            </li>

              <li className="py-4 text-2xl">
              <Link onClick={handleClick}  to="/logout" smooth={true} duration={500}>
                <button className="bg-normal px-7 py-2 rounded-full font-normal hover:bg-normalH text-white">
                  Logout
                </button>
              </Link>
            </li>
          </>}



        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(BottomNav);
