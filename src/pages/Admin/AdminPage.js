import firebase from "firebase/app";
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import { initializeLoginFramework } from '../../components/Account/loginManager/loginManager';
import FeaturesContent from '../../components/AdminPanel/FeaturesContent/FeaturesContent';
import Header from '../../components/Header/Header';

const AdminPage = () => {
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    initializeLoginFramework();
    
    useEffect(() => {
        checkUserLoggedIn()
    },[])

    const checkUserLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                setLoggedInUser({
                    isSignedIn: true,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    error: user.error ? user.error : '',
                    success: true
                });
    
            }else{
                loggedInUser({
                        isSignedIn: false,
                        name: '',
                        email: '',
                        photo: '',
                        error: '',
                        success: false
            })
            }
        })
      }
    return (
        <>
           <Header/>
           <FeaturesContent loggedInUser={loggedInUser}/>
        </>
    );
};

export default AdminPage;