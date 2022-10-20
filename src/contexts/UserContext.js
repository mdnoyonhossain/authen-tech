import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const updateName = name => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const userEmailVerifi = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    }

    const userGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const forgetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const userInfo = {user, createUser, updateName, userEmailVerifi, userGoogleSignIn, logOut, userSignIn, loading, forgetPassword};

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;