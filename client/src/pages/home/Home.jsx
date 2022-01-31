import { useState, useEffect} from 'react'
import axios from 'axios'


import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import { useLocation } from 'react-router'




export default function Home() {
    const [posts,setPosts] = useState([]);
    const {search} = useLocation();


    useEffect(()=>{
        const fetchPosts = async ()=>{
            await axios.get("/posts"+search)
            .then(res=>{
                setPosts(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
        fetchPosts()
    },[search])

    return (
        <>
        <Header />
        <div className="home">
            <Posts posts={posts} />
            <Sidebar />
        </div>
        </>
    )
}
