import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import auth from '../utils/auth';
import carImg from "../utils/IMG/CarImg.webp";
import RecipeFinder from "./recipeFinder";

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        
                        <div className="flavor">
                            <h1 id="yummyRecipe">
                            Login to search yummy recipes!
                        </h1>
                            <h2 id="flavor">Take a ride to flavor town!</h2>
                        
                            <img id="login-carImg" src={carImg}></img>
                        </div>
                    </div>
                ) : (
                    console.log(users),
                    <RecipeFinder/>
                )}
        </>
    );
};

export default Home;
