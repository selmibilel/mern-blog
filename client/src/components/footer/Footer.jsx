import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <div className="groupFooter">
                <div className="contactFooter">
                    <div className="contactItem">107 rue Paris bloc 4</div>
                    <div className="contactItem">0033 25 24 89</div>
                    <div className="contactItem">reactnode@blog.com</div>
                </div>

                <div className="linkFooter">
                    <Link to="/" className="link itemLink">Home</Link>
                    <Link to="/about" className="link itemLink">About</Link>
                    <Link to="/contact" className="link itemLink">Contact</Link>
                </div>

                <div className="socialFooter">
                    <i className="footerIcon fab fa-facebook-square"></i>
                    <i className="footerIcon fab fa-twitter-square"></i>
                    <i className="footerIcon fab fa-pinterest-square"></i>
                    <i className="footerIcon fab fa-instagram-square"></i>
                </div>
            </div>
            <div className="copyrightFooter">copyright @ Bilel Selmi 2021</div>
        </div>
    )
}
