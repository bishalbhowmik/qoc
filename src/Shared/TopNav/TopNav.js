import React from "react";
import styles from "./TopNav.module.css";

const TopNav = () => {
  return (
    <main>
      <section
        id={styles.top_nav}
        className="bg-normal h-12 text-[#F3E8E9] flex items-center justify-content px-10"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-4 mr-5">
            <span>
              <i className="fa-solid fa-phone text-[1.1rem] mt-1"></i>
            </span>
            <span className="text-[1rem]"><a className='inline' href='tel:01312379588'>+88 012345678</a></span>
            <span>
              <i className="fa-solid fa-envelope text-[1.1rem] mt-1"></i>
            </span>
            <span className="text-[1rem]"><a className='inline' href='mailto:qoclearning@gmail.com'>qoclearning@gmail.com</a></span>
          </div>

          <div className="flex items-center gap-x-7 text-[1.3rem]">
            <span>
              <a href="https://www.facebook.com/qoc.99" target="_blank"><i className="fa-brands fa-facebook "></i></a>
            </span>
            <span>
              <a href=""><i className="fa-brands fa-instagram"></i></a>
            </span>
            <span>
              <a href=""><i className="fa-brands fa-twitter"></i></a>
            </span>
            <span>
              <a href=""><i className="fa-brands fa-youtube"></i></a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TopNav;
