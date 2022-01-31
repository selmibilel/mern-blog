import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router"
import "./singlePost.css"

import axios from "axios";
import { Link } from "react-router-dom";
import { publicFile } from "../../shared/baseUrl";
import { Context } from "../../context/Context";



export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState({});
    const {user} = useContext(Context);

    // FOR EDIT
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost = async () =>{
            await axios.get("/posts/"+path)
            .then((res)=>{
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        getPost()
    },[path]);

    const handleDelete = async () =>{
        await axios.delete("/posts/"+post._id, {data:{username: user.username}})
        .then((res)=>{
            window.location.replace("/")
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    const handleUpdate = async () =>{
        await axios.put("/posts/"+post._id, {
            username: user.username, 
            title:title, 
            desc:desc
        })
        .then((res)=>{
            // window.location.reload()       // ou bien
            setUpdateMode(false)
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo?(
                    <img 
                    src={publicFile + post.photo} 
                    alt="" 
                    className="singlePostImg" />
                ):(null)}
                
                {/* Lorsqu'on click sur le boutton edit */}
                {updateMode?(
                    <input 
                    type="text" 
                    value={title} 
                    className="singlePostTitleInput" 
                    autoFocus={true}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                ):(
                    <h1 className="singlePostTitle">
                        {title}
                        {/* Affichage des icons delete et edit : si l'utilistaeur == l'auteur
                        et s'il est deja un utilisateur (user?.username) */}
                        {(post.username === user?.username)?(
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        ):(null)}
                    
                    </h1>
                )}
                
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author : 
                        <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                

                {updateMode?(
                    <>
                        <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        />
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Update
                        </button>
                    </>
                ):(
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )}
            </div>
        </div>
    )
}
