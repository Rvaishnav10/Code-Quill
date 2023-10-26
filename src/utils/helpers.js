import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
  } from "firebase/auth";
  import { auth, db } from "../config/firebase.config";
  
  import { v4 as uuidv4 } from "uuid";
  
  import { SET_USER_NULL } from "../context/actions/userActions";
  import { doc, setDoc } from "firebase/firestore";
  
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  export const signUpActionGoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then((userCred) => {
      window.location.reload();
    });
  };
  
  export const singUpWithGithubProvider = async () => {
    await signInWithRedirect(auth, githubProvider).then((userCred) => {
      window.location.reload();
    });
  };
  
  export const Menus = [
    { id: uuidv4(), name: "Projects", uri: "/home/projects" },
    { id: uuidv4(), name: "Collections", uri: "/home/collection" },
    { id: uuidv4(), name: "Profile", uri: "/home/profile" },
  ];
  
  export const signOutAction = async () => {
    await auth.signOut().then(() => {
      window.location.reload();
    });
  };
  