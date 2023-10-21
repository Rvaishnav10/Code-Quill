import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {Home, NewProject } from './container'
import { auth, db } from './config/firebase.config'
import { doc, onSnapshot, orderBy, query, collection, setDoc } from 'firebase/firestore'
import { Spinner } from './components'
import { useDispatch } from 'react-redux'
import { SET_USER } from './context/actions/userActions'
import { SET_PROJECTS } from './context/actions/projectActions'


const App = () => {

const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(true);
const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userCred => {
            if(userCred){
                 console.log(userCred?.providerData[0]);
                 setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {
                  //dispatch the action to store
                     dispatch(SET_USER(userCred?.providerData[0]));
                     navigate("/home/projects", {replace : true});
                 })
            } else {
                  navigate("/home/auth", {replace : true})
            }

            setInterval(() => {
              setIsLoading(false)
            }, 2000);
        });

        //cleanup the the listener event
        return () => unsubscribe();
    }, []);

    useEffect(() => {
      const projectQuery = query(
        collection(db, "Projects"),
        orderBy("id", "desc")
      )
      const unsubscribe = onSnapshot(projectQuery, (querySnaps => {
        const projectsList = querySnaps.docs.map(doc => doc.data())
        dispatch(SET_PROJECTS(projectsList))
      }))

      return unsubscribe;
    }, [])

  return (
    <>
    {isLoading ? (
    <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
    <Spinner />

    </div>) : (
      <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="/newProject" element={<NewProject />}/>

        {/* if the route not match like we want localhost:3000/home/* home but it always redirect to localhost:3000 then we need to reroute the user */}
        <Route path="*" element={<Navigate to={"/Home"} />} />
      </Routes>
    </div>
    )}
    
    
    
    
    </>
  )
}

export default App
