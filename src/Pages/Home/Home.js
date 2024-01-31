import React from "react";
import banner2 from "../../assets/banner-2.png";
import banner from "../../assets/banner.png";
import check from "../../assets/check.png";
import course from "../../assets/course.png";
import feature from "../../assets/feature.png";
import tutor from "../../assets/find-tutor.png";
import person from "../../assets/person.png";
import student from "../../assets/student.png";
import styles from "./Home.module.css";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import MessengerChat from "../Chat/MessengerChat";


const mapStateToProps = (state) => {
  console.log(state);
  return {

  }
}

function Home() {

  let size = window.innerWidth


  return (
    <div>
      {/* Second Section */}

      <section id={styles.second} className="bg-[#FAF1F2] h-auto">
        <div
          id="second_container"
          className="container mx-auto grid grid-cols-1 lg:grid-cols-2 p-5"
        >
          <div id={styles.second_left} className="mt-10">
            <h1
              id={styles.second_header}
              className="text-[3vw] font-semibold my-5 text-black"
            >
              Together we achieve <br />
              Educational <span className="text-[#AC1823]">excellence</span>
            </h1>
            <p id={styles.second_info} className="mb-5 text-[1.1vw] lg:w-[80%] text-black">
              Over 11 international curriculum, like Cambridge, Edexcel, NCTB
              and lot more. Moreover, we offer free exams, vast study materials
              and expert teachers that can truly enrich your path of learning.
            </p>
            <div className="text-[2F2F2F] mt-10">
              <button className="bg-normal hover:bg-normalH text-white text-xs py-3 px-6 rounded-full mr-4">
                Get Started
              </button>
              <button className="bg-[#FBF1F2] text-[#92222A] font-semibold hover:bg-transparent   text-xs py-3 px-6 rounded-full border border-[#F7E8E9]">
                Request Demo
              </button>
            </div>
          </div>

          <div className={styles.second_banner}>
            <img
              id={styles.second_image}
              className="w-[469px] h-[430px] mx-auto"
              src={banner}
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section>
        <div className="container mx-auto grid-cols-2 gap-y-4 grid lg:grid-cols-4 gap-[2px] my-20 rounded-lg">
          <div className="flex items-center justify-center gap-x-4 shadow-lg h-36">
            <span className="bg-[#F4F4F4] flex items-center justify-center w-[50px] h-[50px] rounded-full text-[#AC1823]">
              <i className="fa-solid fa-graduation-cap text-2xl" />
            </span>
            <span>
              <p className="text-xl font-bold mb-1">800+</p>
              <p className="text-[#6B6B6B] text-xs">Online exams</p>
            </span>
          </div>

          <div className="flex items-center justify-center gap-x-4 shadow-lg h-36 ">
            <span className="bg-[#F4F4F4] flex items-center justify-center w-[50px] h-[50px] rounded-full text-[#AC1823]">
              <i className="fa-solid fa-users text-2xl" />
            </span>
            <span>
              <p className="text-xl font-bold mb-1">2K+</p>
              <p className="text-[#6B6B6B] text-xs">Expert Instructors</p>
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-4 shadow-lg h-36">
            <span className="bg-[#F4F4F4] flex items-center justify-center w-[50px] h-[50px] rounded-full text-[#AC1823]">
              <i className="fa-solid fa-heart text-2xl" />
            </span>
            <span>
              <p className="text-xl font-bold mb-1">100K+</p>
              <p className="text-[#6B6B6B] text-xs">Satisfied Learners</p>
            </span>
          </div>

          <div className="flex items-center justify-center gap-x-4 shadow-lg h-36">
            <span className="bg-[#F4F4F4] flex items-center justify-center w-[50px] h-[50px] rounded-full text-[#AC1823]">
              <i className="fa-solid fa-file-lines text-2xl" />
            </span>
            <span>
              <p className="text-xl font-bold mb-1">6K+</p>
              <p className="text-[#6B6B6B] text-xs">Study Materials</p>
            </span>
          </div>
        </div>
      </section>

      {/* Fourth Section */}

      <section className="grid grid-cols-1 lg:grid-cols-2 container mx-auto pb-10 px-5 md:px-0">
        <div className="flex items-center justify-center hidden lg:block">
          <img className="w-[573px] " src={banner2} alt="banner-2" />
        </div>

        <div className="lg:mt-40">
          <span className="mb-3">
            <h1 className="text-4xl font-semibold mb-4">
              What Will You <span className="text-[#AC1823]">Get</span> ?
            </h1>
            <p>
              In QOC, you can find a wide range of resources and services
              designed to support and enhance your learning experience. Here are
              some features and offerings you might find interesting:
            </p>
          </span>

          <div className="hover:shadow-lg p-5 mb-3">
            <div className="flex gap-x-4">
              <img className="w-[40px] h-[40px]" src={check} alt="check" />
              <span>
                <p className="text-[#AC1823] text-[16px] font-semibold mb-2">
                  Live class for past paper solution
                </p>
                <p>
                  Experience precise problem-solving and maximum student benefit
                  with our expert teachers through live classes, addressing
                  questions that recorded videos can't.
                </p>
              </span>
            </div>
          </div>

          <div className="hover:shadow-lg p-4 mb-3">
            <div className="flex gap-x-4">
              <img className="w-[40px] h-[40px]" src={check} alt="check" />
              <span>
                <p className="text-[#AC1823] text-[16px] font-semibold">
                  Free exams and free classes
                </p>
                <p>
                  Gain access to a numerous collection of free exams and explore
                  our free demo classes to to determine if they're the right fit
                  for your needs.
                </p>
              </span>
            </div>
          </div>

          <div className="hover:shadow-lg p-4 mb-3">
            <div className="flex gap-x-4">
              <img className="w-[40px] h-[40px]" src={check} alt="check" />

              <span>
                <p className="text-[#AC1823] text-[16px] font-semibold">
                  Strength your conceptual basic
                </p>

                <p>
                  Our teachers are dedicated to helping you build a strong
                  foundation by explaining topics clearly. This will enable you
                  to understand and apply concepts with a clearer perspective.
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section */}

      <section className="bg-[#F1F1F1] h-[auto] py-20 px-5 md:px-0">
        <div className="container mx-auto">
          <div className="pt-10">
            <h1 className="text-[36px] font-semibold mb-3">
              Some Of Our Top{" "}
              <span className="text-[#ac1823]">Instructors</span>
            </h1>
            <p className="text-[16px] text-[#2F2F2F] mb-10 md:w-[70%]">
              Our teachers are dedicated to helping you build a strong
              foundation by explaining topics clearly. This will enable you to
              understand and apply concepts with a clearer perspective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            <div className="mx-auto w-[85%] md:w-[90%] h-[auto] pb-5 bg-white shadow-lg rounded-lg">
              <img className="w-[100%] rounded-lg" src={person} alt="person" />
              <div className="flex flex-col gap-y-3 items-center justify-center">
                <h1 className="text-3xl">Jhon Doe</h1>
                <p className="text-[#ac1823] text-lg">
                  Software Engineer Instructors
                </p>
                <span className="text-[#FFB800]">
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                </span>
              </div>
            </div>

            <div className="mx-auto w-[85%] md:w-[90%] h-[auto] pb-5 bg-white shadow-lg rounded-lg">
              <img className="w-[100%] rounded-lg" src={person} alt="person" />
              <div className="flex flex-col gap-y-3 items-center justify-center">
                <h1 className="text-3xl">Jhon Doe</h1>
                <p className="text-[#ac1823] text-lg">
                  Software Engineer Instructors
                </p>
                <span className="text-[#FFB800]">
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                </span>
              </div>
            </div>

            <div className="mx-auto w-[85%] md:w-[90%] h-[auto] pb-5 bg-white shadow-lg rounded-lg">
              <img className="w-[100%] rounded-lg" src={person} alt="person" />
              <div className="flex flex-col gap-y-3 items-center justify-center">
                <h1 className="text-3xl">Jhon Doe</h1>
                <p className="text-[#ac1823] text-lg">
                  Software Engineer Instructors
                </p>
                <span className="text-[#FFB800]">
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                  <i className="fa-solid fa-star mr-1" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-20">
            <button className="bg-normal hover:bg-normalH text-white text-sm w-48 h-11 rounded-full">
              View All Instructors
            </button>
          </div>
        </div>
      </section>

      {/* Sixth Section */}

      <section className="h-[400px] lg:h-[600px] flex justify-center items-center">
        <div className="bg-normal text-white container mx-auto grid grid-cols-1 lg:grid-cols-3 rounded-lg pt-1 pb-16 lg:pb-0">
          <div className="lg:col-span-2 ml-10 mt-10">
            <h1 className="text-2xl md:text-4xl font-semibold mb-5">
              Purchase your awesome <br /> lessons and find your tutors{" "}
            </h1>
            <p className="text-sm mb-12 w-[90%] md:w-[60%]">
              Our tutors undergo rigorous skill assessments and receive training
              in student psychology and teaching methods to ensure your learning
              experience is exceptional. Try a free demo class to see if the
              tutor is the right fit for you.
            </p>

            <span className="mt-5">
              <button className="bg-white text-[#ac1823] w-44 h-11 hover:bg-lightA text-sm rounded-full mr-5">
                Book Your Lessons
              </button>
              <button className="bg-transparent text-sm hover:bg-lightA hover:text-[#ac1823] hover:rounded-full hover:w-44 hover:h-11">
                Find Your Tutors
              </button>
            </span>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <img src={tutor} alt="tutor" />
          </div>
        </div>
      </section>

      {/* Seventh Section */}

      <section className="bg-[#F1F1F1] h-[auto] pt-10 pb-20 px-5 md:px-0">
        <div className="container mx-auto">
          <div className="pt-10">
            <h1 className="text-[36px] font-semibold mb-3">
              Some Of Our Top <span className="text-[#ac1823]">Courses</span>
            </h1>
            <p className="text-[16px] text-[#2F2F2F] mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="relative w-[90%] md:w-[90%] mx-auto">
              <img className="w-[100%] h-[315px]" src={course} alt="course" />

              <div className="w-[90%] h-[auto] bg-white rounded-lg absolute top-[50%] left-[5%] p-6">
                <button className="bg-red-800 text-white px-4 py-2 text-xs rounded-lg mb-3">
                  DEVELOPMENT
                </button>{" "}
                <br />
                <span className="flex items-center justify-between mb-2">
                  <span className="text-[#FFB800] text-[12px]">
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <span className="text-[#928787] ml-2">5.4(199)</span>
                  </span>
                  <span className="text-[12px] text-[#9b1620] font-semibold ">
                    02 september, 2023
                  </span>
                </span>
                <h3 className="text-[16px] font-semibold mb-3 text-black">
                  The Complete Web Developer Guideline 2023
                </h3>
                <p className="mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed{" "}
                </p>
                <button className="text-[#ac1823]">
                  Book Now <i className="fa-solid fa-chevron-right" />
                </button>
              </div>

            </div>

          </div>

          <div className="flex items-center justify-center mt-5">
            <button className="bg-normal hover:bg-normalH text-white text-sm w-48 h-11 rounded-full">
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Eighth Section */}

      <section className="h-[auto] py-16">
        <div className="container mx-auto">
          <div className="pt-10">
            <h1 className="max-md:text-center text-[30px] font-semibold mb-3">
              HOW OUR ONLINE <br /> PUBLIC SCHOOL{" "}
              <span className="text-[#ac1823]">WORKS</span>
            </h1>
          </div>

          <div className="grid grid-cols-3 ">
            <div className="grid grid-cols-1 max-md:mx-auto md:grid-cols-2 gap-x-5 gap-y-3 lg:gap-x-2 col-span-3 lg:col-span-2">
              <div className="w-[282px] h-[auto] bg-white hover:shadow-lg rounded-lg p-4 ">
                <span className="bg-[#F4F4F4] rounded-full text-[#ac1823] w-12 h-12 flex items-center justify-center">
                  <i className="fa-solid fa-video text-2xl" />
                </span>
                <h3 className="my-3 text-[20px] font-semibold">
                  VIRTUAL LEARNING
                </h3>
                <p className="mb-3">
                  The only costs are for standard school supplies and voluntary
                  field trips.
                </p>
                <button className="text-[#ac1823]">
                  Learn More <i className="fa-solid fa-chevron-right" />
                </button>
              </div>

              <div className="w-[282px] h-[auto] bg-white hover:shadow-lg rounded-lg p-4">
                <span className="bg-[#F4F4F4] rounded-full text-[#ac1823] w-12 h-12 flex items-center justify-center">
                  <i className="fa-solid fa-file-lines text-2xl" />
                </span>
                <h3 className="my-3 text-[20px] font-semibold">
                  Meaningful Education
                </h3>
                <p className="mb-3">
                  Many of our Connections Academy schools have additional
                  accreditations.
                </p>
                <button className="text-[#ac1823]">
                  Learn More <i className="fa-solid fa-chevron-right" />
                </button>
              </div>

              <div className="w-[282px] h-[auto] bg-white hover:shadow-lg rounded-lg p-4">
                <span className="bg-[#F4F4F4] rounded-full text-[#ac1823] w-12 h-12 flex items-center justify-center">
                  <i className="fa-solid fa-book text-2xl"></i>
                </span>
                <h3 className="my-3 text-[20px] font-semibold">
                  ONLINE CURRICULUM
                </h3>
                <p className="mb-3">
                  Our curriculum prepares students to go further in life by
                  giving them support.
                </p>
                <button className="text-[#ac1823]">
                  Learn More <i className="fa-solid fa-chevron-right" />
                </button>
              </div>

              <div className="w-[282px] h-[auto] bg-white hover:shadow-lg rounded-lg p-4">
                <span className="bg-[#F4F4F4] rounded-full text-[#ac1823] w-12 h-12 flex items-center justify-center">
                  <i className="fa-solid fa-users text-2xl"></i>
                </span>
                <h3 className="my-3 text-[20px] font-semibold">
                  SOCIAL INTERACTION
                </h3>
                <p className="mb-3">
                  Students at Connections Academy collaborate on projects
                  together.
                </p>
                <button className="text-[#ac1823]">
                  Learn More <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-1 hidden lg:block">
              <img
                className="w-[397px] h-[465px]"
                src={feature}
                alt="feature"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ninth Section */}

      <section className="bg-[#F1F1F1] h-[auto] py-24 px-5 md:px-0">
        <div className="container mx-auto">
          <div className="w-[100%]">
            <h1 className="text-[36px] font-semibold mb-3">
              What Our <span className="text-[#ac1823]">Student Say</span>
            </h1>
            <p className="text-[16px] text-[#2F2F2F] mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-16">
            <div className="w-[80%] md:w-[100%] max-md:mx-auto h-[auto] py-16 border border-[#D4D4D4] bg-white relative px-3 rounded-sm">
              <h1 className="text-lg md:text-2xl text-center mb-2">
                “Love mathematics because of Besnik Academy”
              </h1>
              <p className="text-sm md:text-[17px] text-center">
                "The curriculum was directly targeted toward applied techniques
                with high profile projects – real datasets with industry
                partners. It helped me achieve my career transition goal."
              </p>

              <div className="bg-white w-[60%] md:w-[60%] h-[89px] absolute top-[85%] left-[20%] flex items-center justify-between rounded-lg shadow-lg p-3">
                <div>
                  <h3 className="text-md xl:text-2xl">Wilson Thai</h3>
                  <p className="text-xs xl:text-sm">Ontario, Canada</p>
                  <span className="text-[#FFB800] text-[10px] xl:text-xs ">
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                  </span>
                </div>
                <div>
                  <img src={student} alt="student" />
                </div>
              </div>
            </div>

            <div className="w-[80%] md:w-[100%] max-md:mx-auto h-[auto] py-16 border border-[#D4D4D4] bg-white relative px-3 rounded-sm">
              <h1 className="text-lg md:text-2xl text-center mb-2">
                “Love mathematics because of Besnik Academy”
              </h1>
              <p className="text-sm md:text-[17px] text-center">
                "The curriculum was directly targeted toward applied techniques
                with high profile projects – real datasets with industry
                partners. It helped me achieve my career transition goal."
              </p>

              <div className="bg-white w-[60%] md:w-[60%] h-[89px] absolute top-[85%] left-[20%] flex items-center justify-between rounded-lg shadow-lg p-3">
                <div>
                  <h3 className="text-md xl:text-2xl">Wilson Thai</h3>
                  <p className="text-xs xl:text-sm">Ontario, Canada</p>
                  <span className="text-[#FFB800] text-[10px] xl:text-xs ">
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                  </span>
                </div>
                <div>
                  <img src={student} alt="student" />
                </div>
              </div>
            </div>

            <div className="w-[70%] md:w-[90%] max-md:mx-auto h-[auto] py-16 border border-[#D4D4D4] bg-white relative px-3 rounded-sm">
              <h1 className="text-lg md:text-2xl text-center mb-2">
                “Love mathematics because of Besnik Academy”
              </h1>
              <p className="text-sm md:text-[17px] text-center">
                "The curriculum was directly targeted toward applied techniques
                with high profile projects – real datasets with industry
                partners. It helped me achieve my career transition goal."
              </p>

              <div className="bg-white w-[60%] md:w-[60%] h-[89px] absolute top-[85%] left-[20%] flex items-center justify-between rounded-lg shadow-lg p-3">
                <div>
                  <h3 className="text-md xl:text-2xl">Wilson Thai</h3>
                  <p className="text-xs xl:text-sm">Ontario, Canada</p>
                  <span className="text-[#FFB800] text-[10px] xl:text-xs ">
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                    <i className="fa-solid fa-star mr-[2px]" />
                  </span>
                </div>
                <div>
                  <img src={student} alt="student" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <MessengerChat />
      <Chat />
    </div>
  );
}

export default connect(mapStateToProps)(Home)
