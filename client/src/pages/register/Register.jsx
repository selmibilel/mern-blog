import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(false)
        await axios.post("/auth/register",{
            username,
            email,
            password,
            profilePic:"avatar.png",
        })
        .then((res)=>{
            if (res.data){
                window.location.replace("/login");
                console.log(res.data);
            }
        })
        .catch((err)=>{
            setError(true)
            // console.log(err);
        });
    }

    return (
        <div className="register">
            <span className="registerTitle">Regiter</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="registerInput" placeholder="Enter your username..." 
                onChange={e=> setUsername(e.target.value)} autoFocus/>
                
                <label>Email</label>
                <input type="text" className="registerInput" placeholder="Enter your email..." 
                onChange={e=> setEmail(e.target.value)}/>

                <label>Password</label>
                <input type="password" className="registerInput" placeholder="Enter your password..."
                onChange={e=> setPassword(e.target.value)}/>

                <button className="registerButton" type="submit">Register</button>
            </form>

            <button className="registerLoginButton">
                <Link to="/login" className="link">Login</Link>
            </button>
            {error? (<span style={{color:"red", marginTop:"15px"}}> Something went wrong! </span>):(null) }
        </div>
    )
}
