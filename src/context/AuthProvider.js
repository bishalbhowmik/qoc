import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/Firebase.config';


export const AuthContext = createContext();

const auth = getAuth(app);


const AuthProvider = ({children}) => {

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const updateUser = (userInfo) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{

            console.log('Auth State Change');
            setUser(currentUser);
            setLoading(false);
        })

        return ()=>unsubscribe()
    },[])

    // console.log(user);

    

    const authInfo = {
        createUser,
        loginUser,
        user,
        updateUser,
        loading,
        logOut
    }


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
