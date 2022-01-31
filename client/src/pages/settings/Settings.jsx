import "./settings.css"
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useEffect, useState } from "react"
import {Context} from '../../context/Context'
import axios from "axios"
import { publicFile } from '../../shared/baseUrl'

export default function Settings() {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const {user, dispatch} = useContext(Context)

    useEffect(()=>{
        setUsername(user.username)
        setEmail(user.email)
    },[user])


    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser = {
            userId:user._id,
            username,
            email,
        };
        if(password){
            updatedUser.password = password;
        }
        if(file){
            const data = new FormData();
            const filename = Date.now()+file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        await axios.put("/users/"+user._id, updatedUser)
        .then((res)=>{
            setSuccess(true)
            dispatch({type:"UPDATE_SUCCESS", payload:res.data})
            // console.log(res.data);
        })
        .catch((err)=>{
            dispatch({type:"UPDATE_FAILURE"})
            console.log(err);
        })
    }

    const displayPosts = () =>{
        window.location.replace("/?user="+username);
    }
    
    return (
        <div className="settings">
            <div className="settingsWrapper">
                
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span>
                        <span className="settingsDeleteTitle">Delete Account</span>
                        <span className="settingsDisplayTitle" onClick={displayPosts}>Display my posts</span>
                    </span>
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>
                    
                    <label>Profil Picture</label>
                    <div className="settingsPP">
                        <img 
                        src={file? (URL.createObjectURL(file)) : (publicFile+user.profilePic)} 
                        alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input 
                        type="file" 
                        id="fileInput" 
                        style={{display:"none"}}
                        onChange={(e)=>setFile(e.target.files[0])}
                        />
                    </div>

                    <label>Username</label>
                    <input 
                    type="text" 
                    value={username} 
                    onChange={e=>setUsername(e.target.value)}
                    />

                    <label>Email</label>
                    <input 
                    type="email" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input 
                    type="password"
                    onChange={e=>setPassword(e.target.value)}
                    />

                    <button className="settingsSubmit" type="submit">Update</button>
                    {success?(
                    <span style={{color:"green", textAlign:"center", marginTop:"20px"}}>Profile has been updated...</span>
                    ):(null)}
                </form>
                
            </div>
            <Sidebar />
        </div>
    )
}
