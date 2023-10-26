import React, { useState } from "react";
import { Logo } from "../assets";
import { FaChevronDown, FaSearchengin } from "react-icons/fa6";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { Link, Route, Routes } from "react-router-dom";
import { Projects, Login, SignUp } from ".";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { UserProfileDetails } from "../components";
import { MdHome } from "react-icons/md";
import { fadeInOut } from "../animations";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";

const Home = () => {
  const user = useSelector((state) => state.user?.user);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const [isSideMenu, setIsSideMenu] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`w-2  ${
          isSideMenu ? "w-2" : "flex-[.4] md:flex-[.2]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out `}
      >
        {/* anchor */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>
        <AnimatePresence>
          {!isSideMenu && (
            <motion.div
              key="sideMenuContent"
              {...fadeInOut}
              className="overflow-hidden w-full flex flex-col gap-4"
            >
              <Link to={"/home"}>
                <img src={Logo} className="object-contain w-72 h-auto" alt="" />
              </Link>

              <Link to="/newProject">
                <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                  <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                    Start Coding
                  </p>
                </div>
              </Link>

              <Link
                to="/home/projects"
                className="flex items-center justify-center gap-6"
              >
                <MdHome className="text-xl text-primaryText" />
                <p className="text-lg text-primaryText">Home</p>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12 ">
        <div className="w-full flex items-center justify-center gap-3">
          {/* search */}
          <div className="px-4 py-3 rounded-md bg-secondary w-full flex items-center justify-start gap-3">
            <FaSearchengin className="text-2xl text-primaryText" />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
              className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
            />
          </div>
          {/* account */}
          {!user && (
            <div className="flex items-center justify-center gap-3">
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
              >
                Signup
              </Link>
            </div>
          )}

          {user && <UserProfileDetails />}
        </div>

        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
