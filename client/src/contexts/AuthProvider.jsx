/* eslint-disable react/prop-types */
import React from "react";
import { createContext } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Use VITE environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem("genius-token");
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };

          // ✅ Use BASE_URL instead of hardcoded URL
          const response = await axios.post(`${BASE_URL}/jwt`, userInfo);
          console.log("JWT Token:", response.data.token);

          if (response.data.token) {
            localStorage.setItem("access-token", response.data.token);
          }

          const emailResponse = await axios.post("https://session-handling.onrender.com", {
            id_token: currentUser.accessToken,
          });
          console.log("Email sent to backend:", emailResponse.data.email);
        } catch (error) {
          console.error("Error sending data to backend:", error);
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    signUpWithGmail,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
