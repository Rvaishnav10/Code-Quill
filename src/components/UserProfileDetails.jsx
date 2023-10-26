import React, { useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Menus, signOutAction } from "../utils/helpers";
import { fadeInOutX } from "../animations";

const UserProfileDetails = () => {
  const user = useSelector((state) => state.user.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={user?.photoURL}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="px-4 py-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <FaChevronDown className="text-primaryText " />
      </motion.div>

      <AnimatePresence>
        {showProfileMenu && (
          <motion.div
            key={"userProfileMenu"}
            {...fadeInOutX}
            className="bg-secondary px-4 py-3 rounded-xl shadow-md z-10 absolute top-16 right-0 flex flex-col items-start justify-start gap-4 min-w-[225px]"
          >
            {Menus &&
              Menus.map((menu) => (
                <Link
                  className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                  to={menu.uri}
                >
                  {menu.name}
                </Link>
              ))}
            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.9 }}
              className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
            >
              Sign out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
