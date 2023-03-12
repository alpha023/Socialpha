import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducers";

// const dummyUser={
//     "_id": "6401deda3047d9874158d019",
//     "username": "Sumit Raj",
//     "email": "pankaj@gmail.com",
//     "profilePic": "",
//     "coverPic": "",
//     "followers": [],
//     "followings": [],
//     "isAdmin": false,
//     "createdAt": "2023-03-03T11:49:46.991Z",
//     "__v": 0,
//     "city": "Mainpuri",
//     "from": "Uttar Pradesh",
//     "relationship": 1,
//     "desc": "Hello Guys This Is Sumit Raj from MAINPURI"
//   };


const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false,
    socket:null,
    
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);
    useEffect(()=>{

        localStorage.setItem("user",JSON.stringify(state.user));

    },[state.user]);
    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            socket:state.socket,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );
};