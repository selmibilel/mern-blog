import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import "./login.css"

export default function Login() {
    const userRef= useRef()
    const passwordRef = useRef()
    const { dispatch, isFetching} = useContext(Context)

    const [error, setError] = useState(false)

    // HANDLE SUBMIT
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(false)
        dispatch({type:"LOGIN_START"});
        
        await axios.post("/auth/login",{
            username:userRef.current.value,
            password:passwordRef.current.value,
        })
        .then((res)=>{
            dispatch({type:"LOGIN_SUCCESS", payload:res.data});
        })
        .catch((err)=>{
            dispatch({type:"LOGIN_FAILURE"});
            setError(true)
        })
    }

    
    
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="loginInput" placeholder="Enter your username..." 
                ref={userRef} autoFocus/>

                <label>Password</label>
                <input type="password" className="loginInput" placeholder="Enter your password..."
                ref={passwordRef} />

                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>

            <button className="loginRegisterButton">
                <Link to="/register" className="link">Register</Link>    
            </button>
            {error? (<span style={{color:"red", marginTop:"15px"}}> Something went wrong! </span>):(null) }
        </div>
    )
}
