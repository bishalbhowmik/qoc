import React from "react";
import styles from "./TopNav.module.css";

const TopNav = () => {
  return (
    <main>
      <section
        id={styles.top_nav}
        className="bg-normal h-12 text-[#F3E8E9] flex items-center justify-content"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-4 mr-5">
            <span>
              <i className="fa-solid fa-phone text-[1.1rem]"></i>
            </span>
            <span className="text-[1rem]">+880123456789</span>
            <span>
              <i className="fa-solid fa-envelope text-[1.1rem]"></i>
            </span>
            <span className="text-[1rem]">mail@gmail.com</span>
          </div>

          <div className="flex items-center gap-x-7 text-[1.3rem]">
            <span>
              <i className="fa-brands fa-facebook "></i>
            </span>
            <span>
              <i className="fa-brands fa-instagram"></i>
            </span>
            <span>
              <i className="fa-brands fa-twitter"></i>
            </span>
            <span>
              <i className="fa-brands fa-youtube"></i>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TopNav;
