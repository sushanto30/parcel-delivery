import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';

const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)


    const handleRegisterWithPass = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)

    }

    const handleSign = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }


    const userInfo = {

        handleRegisterWithPass,
        handleSign,
        handleSignOut,
        user


    }


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        })

       return  ()=> unsubscribe()
    }, [])




    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;