import axios from 'axios'
import { useState } from 'react'
import './contactus.css'
export default function ContactUs() {
    const [contactName, setContactName] = useState("")
    const [contactMail, setContactMail] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [contactMessage, setContactMessage] = useState("")
    const [confirmation, setConfirmation] = useState("")


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newMail = {
            contactName,
            contactMail,
            contactPhone,
            contactMessage
        }
        await axios.post("/mail", newMail)
        .then((res)=>{
            setConfirmation("Message is send !")  
            setTimeout(() => {
                setConfirmation("")      
            }, 3000);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="contactus">
            
            {confirmation?(
                <div className="confirmation">
                    {confirmation}
                </div>
            ):(<div className="confirmation"></div>)}

            <div className="titleForm">CONTACT US</div>
            <form className="contactForm" onSubmit={handleSubmit}>
                
                    <input 
                    className="formInput" 
                    type="text" 
                    autoFocus 
                    placeholder="Enter your name" 
                    required
                    onChange={(e)=> setContactName(e.target.value)}
                    />
                  
                    <input 
                    className="formInput" 
                    type="email" 
                    placeholder="Enter your email" 
                    required
                    onChange={(e)=> setContactMail(e.target.value)}
                    />
              
                    <input 
                    className="formInput" 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    required
                    onChange={(e)=> setContactPhone(e.target.value)}
                    />
               
                    <textarea 
                    className="formInput formTextarea" 
                    placeholder="message..."
                    onChange={(e)=> setContactMessage(e.target.value)}
                    />

                    <button className="btnSend" type="submit">Send</button>

            </form>
            
        </div>
    )
}
