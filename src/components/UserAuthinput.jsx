import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { motion } from 'framer-motion';

const UserAuthinput = ({ label, placeholder, isPass, key, setStateFunction, Icon, setGetEmailValidationStatus
}) => {
    const [value, setValue]= useState("");
    const [showPass, setShowPass]= useState(true);
    const [isEmailValid, setIsEmailValid]= useState(false);

    //this func is made to check whether valid email and password
    const handleTextChange = (e) => {
        setValue(e.target.value);
        setStateFunction(e.target.value);

if(placeholder === "Email"){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const status=emailRegex.test(value)
     setIsEmailValid(status);
     setGetEmailValidationStatus(status);
}
    }

  return (
    <div className='flex flex-col items-start justify-start gap-1'>
      <label className='text-sm text-gray-300'>{label}</label>

      <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
        !isEmailValid && placeholder === "Email" && value.length > 0 && "border-2 border-red-500"
      }`}>

        {/*for mail*/}
        <Icon className='text-text555 text-2xl ' />
        <input 
        type={isPass && showPass? "password" : "text"} 
        placeholder={placeholder} className='flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg ' value={value} onChange={handleTextChange}/>

        {/*for password*/}
        {isPass && (
            <motion.div 
            onClick={() => setShowPass(!showPass)} 
            whileTap={{scale: 0.9}} className='cursor-pointer '>
            {showPass ? (
                <FaEye className='text-text555 text-2xl'/>
            ) : (
                <FaEyeSlash className='text-text555 text-2xl'/>

            )}
        </motion.div>
        )}


      </div>
    </div>
  )
}

export default UserAuthinput
