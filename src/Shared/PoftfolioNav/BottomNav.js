import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "../PoftfolioNav/BottomNav.module.css";
import { connect } from "react-redux";


const mapStateToProps = (state) => {

  console.log('From Layout: ', state)

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
      <div className="container mx-auto h-[72px] flex justify-between items-center px-4 text-white md:text-navInactive">
        <div>
          <Link to="/" smooth={true} duration={500}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* menu */}

        <ul id={styles.menu} className="hidden md:flex gap-x-5 font-semibold">
          <li>
            <Link to="/" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500}>
              Lesson
            </Link>
          </li>
          <li>
            {props.decodedToken && props.decodedToken.hasOwnProperty('role') && props.decodedToken.role === 'teacher' ? <Link to="/teacher" smooth={true} duration={500}>Find Job</Link> : <Link to="/student" smooth={true} duration={500}>Find Tutors</Link>}
          </li>
          <li>
            <Link to="" smooth={true} duration={500}>
              About Us
            </Link>
          </li>
        </ul>

        <ul className="hidden md:flex gap-x-5">

          {!props.authenticated ? <>
          {console.log('Test', props.authenticated)}
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
          className="text-normal md:hidden z-10 transition duration-100"
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </div>

        {/* Mobile menu */}

        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center"
          }
        >
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link onClick={handleClick} to="about" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link
              onClick={handleClick}
              to="skills"
              smooth={true}
              duration={500}
            >
              Skills
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link
              onClick={handleClick}
              to="/signup"
              smooth={true}
              duration={500}
            >
              Project
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link
              onClick={handleClick}
              to="contact"
              smooth={true}
              duration={500}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(BottomNav);
