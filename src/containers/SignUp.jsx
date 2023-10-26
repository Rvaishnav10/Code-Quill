import React, { useEffect, useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaGithub, FaUser } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { MdPassword } from "react-icons/md";
import { signUpActionGoogle, singUpWithGithubProvider } from "../utils/helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [isLogin, setIsLogin] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.user);

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmail = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred?.user.uid);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMsg("Invalid Id : User Not Found");
          } else if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMsg("Password Mistach");
          } else {
            setAlert(true);
            setAlertMsg("Temporarily disabled due to many failed login😕");
          }

          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        className="object-contain w-32 opacity-50 h-auto"
        alt=""
      />

      <div className="wfull flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join with us! 🤩 </p>

        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label={"Email"}
            placeholder={"Email"}
            isPass={false}
            key={"Email"}
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            label={"Password"}
            placeholder={"Password"}
            isPass={true}
            key={"Password"}
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          <AnimatePresence>
            {alert && (
              <motion.p {...fadeInOut} className="text-red-500">
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {!isLogin ? (
            <motion.div
              onClick={loginWithEmail}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center  w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Log In </p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={createNewUser}
              className="flex items-center justify-center  w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up </p>
            </motion.div>
          )}

          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Doesn't have an account ?
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Create here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account !
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sing with google */}
          <motion.div
            onClick={signUpActionGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>
          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sign in with gituh */}
          <motion.div
            onClick={singUpWithGithubProvider}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
