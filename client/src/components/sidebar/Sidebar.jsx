import './sidebar.css'
import ImageSidebar1 from '../../images/sidebar1.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            await axios.get("/categories")
            .then((res)=>{
                setCats(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        getCats();
    },[]);


    return (
        <div className="sidebar">
           
           <div className="sidebarItem">
                <span className="firstSidebarTitle">ABOUT ME</span>
                    <img src={ImageSidebar1} alt="" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Libero neque vel repellendus eius? Eaque architecto veniam, distinctio, impedit libero eius.
                    </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((cat,index)=>(
                        <li key={index} className="sidebarListItem"> 
                        <Link to={`/?cat=${cat.name}`} className="link">
                        {cat.name} 
                        </Link>
                        </li>
                    ))}                    
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
