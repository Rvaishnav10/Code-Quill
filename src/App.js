import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home, SignUp, NewProject, ViewProject } from "./containers";
import { auth, db } from "./config/firebase.config";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { Spinner } from "./components";
import { SET_PROJECTS } from "./context/actions/projectActions";

const App = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0].email[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            dispatch(SET_USER(userCred.providerData[0]));
          }
        );
      } else {
        navigate("/home/projects", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );

    const unsubscribe = onSnapshot(projectQuery, (querySnap) => {
      const projectsList = querySnap.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectsList));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />
            <Route path="/view/:projectId" element={<ViewProject />} />

            {/* if not matching route */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
