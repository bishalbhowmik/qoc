import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTeacher } from "../../Api/Admin/TeacherApi";
import banner2 from "../../assets/banner-2.png";
import banner from "../../assets/banner.svg";
import check from "../../assets/check.png";
import course from "../../assets/course.png";
import feature from "../../assets/feature.png";
import tutor from "../../assets/find-tutor.png";
import student from "../../assets/student.png";
import Spinner from "../../components/Spinner";
import MessengerChat from "../Chat/MessengerChat";
import styles from "./Home.module.css";


const mapStateToProps = (state) => {

  return {
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
  }
}

function Home(props) {

  const [teachers, setTeachers] = useState([])
  const [spin, setSpin] = useState(false)

  useEffect(() => {

    setSpin(true)

    getTeacher({ "batch.isPremium": true, featured: true }).then(data => {
      setSpin(false)
      if (data.error) throw data.message
      setTeachers(data.data.filter(item => item.batch && (new Date() < new Date(item.batch.endTime))))
    })
      .catch(err => window.alert(err))

  }, [])


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



  // let teacherShow
  // if (teachers.length === 0) { teacherShow = <div className='p-24 text=center font-bold'>No Teacher Found</div> }
  // else {
  //   teacherShow = teachers.map(item => {

  //     return (

  //     )

  //   })
  // }



  return (
    <div className="">
      {/* Second Section */}

      {spin && <Spinner />}

      <section id={styles.second} className="bg-[#FAF1F2] h-auto">
        <div
          id="second_container"
          className="container mx-auto grid grid-cols-1 lg:grid-cols-2 py-5 md:px-10 px-5"
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
                <Link to={props.authenticated ? `/${props.decodedToken.role}-dashboard` : '/sign'}>Get Started</Link>
              </button>
              <button className="bg-[#FBF1F2] text-[#92222A] font-semibold hover:bg-transparent   text-xs py-3 px-6 rounded-full border border-[#F7E8E9]">
                <Link to={'/request-demo'}>Request Demo</Link>
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
        <div className="container mx-auto grid-cols-2 gap-y-4 grid lg:grid-cols-4 gap-[2px] my-20 rounded-lg md:px-10 px-5">
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

      <section className="grid grid-cols-1 lg:grid-cols-2 container mx-auto pb-10 md:px-10 px-5">
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

      <section className="bg-[#F1F1F1] h-[auto] py-20 md:px-10 px-5">
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

          <Carousel
            swipeable={true}
            // draggable={true}
            showDots={true}
            responsive={responsive}
            // ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={true}
            autoPlaySpeed={3000}
          // keyBoardControl={true}
          // customTransition="all .5"
          // transitionDuration={500}
          >
            {
              teachers.length > 0 ? teachers.map(item => {

                let rating = [];
                for (let i = 0; i < 5; i++) {
                  if (item.review >= i + 1) {
                    rating.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
                  } else if (item.review >= i + 0.5) {
                    rating.push(<i key={i} className="fas fa-star-half-alt text-yellow-500"></i>);
                  } else {
                    rating.push(<i key={i} className="far fa-star text-yellow-500"></i>);
                  }
                }

                return (
                  <div className="mt-20 mx-5">
                    <div style={{ height: '300px' }} className="">
                      <div
                        className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex justify-center">
                          <div className="flex justify-center -mt-[75px] border rounded-full w-[170px] h-[170px]">
                            <img src={item.image && item.image.contentType && item.image != '' ? process.env.REACT_APP_BACKEND_URL + "/api/uploads/" + item.image.name : '/male.png'}
                              className="mx-auto rounded-full object-contain shadow-lg dark:shadow-black/20 w-full h-full" alt="Avatar" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-center mt-5">
                            <div className="flex items-center">
                              {rating}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h5 className="mb-4 text-lg font-bold text-center">{item.username}</h5>
                          <p className="mb-6 text-center">{item.bio}</p>
                          <div className="mx-auto flex list-inside justify-center">
                            <Link to={`/tutor-details/${item._id}`}><button className='btn btn-outline btn-sm'>See details</button></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) : <div></div>
            }

          </Carousel>

          <div className="flex items-center justify-center mt-20">
            <button className="bg-normal hover:bg-normalH text-white text-sm w-48 h-11 rounded-full">
              <Link to="/find-tutors">View All Instructors</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Sixth Section */}

      <section className="h-[400px] lg:h-[600px] flex justify-center items-center">
        <div className="bg-normal text-white container mx-auto grid grid-cols-1 lg:grid-cols-3 rounded-lg pt-1 pb-16 lg:pb-0 md:px-10 px-5">
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
              <button className="bg-white text-[#ac1823] w-44 h-11 font-bold hover:font-normal text-sm rounded-full mr-5">
                <Link to="/find-tutors">Find Your Tutors</Link>
              </button>
              <button className="text-sm bg-darkH text-white rounded-full w-44 h-11 mt-3 md:mt-0 font-bold hover:font-normal">
                <Link to={props.authenticated ? `/${props.decodedToken.role}-dashboard/payment` : '/login'}>Book Your Lessons </Link>
              </button>
            </span>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <img src={tutor} alt="tutor" />
          </div>
        </div>
      </section>

      {/* Seventh Section */}

      <section className="bg-[#F1F1F1] h-[auto] pt-10 pb-20 md:px-10 px-5">
        <div className="container mx-auto">
          <div className="pt-10">
            <h1 className="text-[36px] font-semibold mb-3">
              Some Of Our Top <span className="text-[#ac1823]">Courses</span>
            </h1>
            <p className="text-[16px] text-[#2F2F2F] mb-10">

            </p>

          </div>


          <Carousel
            swipeable={true}
            // draggable={true}
            showDots={true}
            responsive={responsive}
            // ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
          // keyBoardControl={true}
          // customTransition="all .5"
          // transitionDuration={500}
          >
            <div style={{ height: "500px" }}>
              <div className="relative w-[90%] md:w-[90%] mx-auto">
                <img className="w-[100%] h-[315px]" src={course} alt="course" />

                <div className="w-[90%] h-[auto] bg-white rounded-lg absolute top-[50%] left-[5%] p-6">
                  <button className="bg-red-800 text-white px-4 py-2 text-xs rounded-lg mb-3">
                    DEVELOPMENTT
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
                    <Link to={props.authenticated ? `/student-dashboard/payment` : "login"}>Book Now <i className="fa-solid fa-chevron-right" /></Link>
                  </button>
                </div>

              </div>
            </div>

            <div>
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
                    <Link to={props.authenticated ? `/student-dashboard/payment` : "login"}>Book Now <i className="fa-solid fa-chevron-right" /></Link>
                  </button>
                </div>

              </div>
            </div>

            <div>
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
                    <Link to={props.authenticated ? `/student-dashboard/payment` : "login"}>Book Now <i className="fa-solid fa-chevron-right" /></Link>
                  </button>
                </div>

              </div>
            </div>

            <div>
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
                    <Link to={props.authenticated ? `/student-dashboard/payment` : "login"}>Book Now <i className="fa-solid fa-chevron-right" /></Link>
                  </button>
                </div>

              </div>
            </div>
          </Carousel>





          <div className="flex items-center justify-center mt-0 md:mt-5">
            <button className="bg-normal hover:bg-normalH text-white text-sm w-48 h-11 rounded-full">
              <Link to={props.authenticated ? `/${props.decodedToken.role}-dashboard/course` : '/login'}>View All Courses</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Eighth Section */}

      <section className="h-[auto] py-16 ">
        <div className="container mx-auto md:px-10 px-5">
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
                  <Link to='/about'>Learn More <i className="fa-solid fa-chevron-right" /></Link>
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
                  <Link to='/about'>Learn More <i className="fa-solid fa-chevron-right" /></Link>
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
                  <Link to='/about'>Learn More <i className="fa-solid fa-chevron-right" /></Link>
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
                  <Link to='/about'>Learn More <i className="fa-solid fa-chevron-right" /></Link>
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

      <section className="bg-[#F1F1F1] h-[auto] py-24 md:px-10 px-5">
        <div className="container mx-auto">
          <div className="w-[100%]">
            <h1 className="text-[36px] font-semibold mb-3">
              What Our <span className="text-[#ac1823]">Student Say</span>
            </h1>
            <p className="text-[16px] text-[#2F2F2F] mb-10">
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex */}
            </p>
          </div>

          <div className="">

            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              // ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
            // keyBoardControl={true}
            // customTransition="all .5"
            // transitionDuration={500}
            // containerClass="carousel-container"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            // dotListClass="custom-dot-list-style"
            // itemClass="carousel-item-padding-40-px"
            >
              <div className="px-2" style={{ height: "400px" }}>
                <div className="w-[90%] md:w-[100%] max-md:mx-auto h-[auto] py-16 border border-[#D4D4D4] bg-white relative px-3 rounded-sm">
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

              <div className="px-2" style={{ height: "400px" }}>
                <div className="w-[90%] md:w-[100%] max-md:mx-auto h-[auto] py-16 border border-[#D4D4D4] bg-white relative px-3 rounded-sm">
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

              <div className="px-2" style={{ height: "400px" }}>
                <div className="w-[90%] md:w-[100%] max-md:mx-auto h-[auto] py-16 border border-[#D4D4D4] bg-white relative px-3 rounded-sm">
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


            </Carousel>





          </div>
        </div>
      </section>


      <MessengerChat />
      {/* <Chat /> */}
    </div>
  );
}

export default connect(mapStateToProps)(Home)
