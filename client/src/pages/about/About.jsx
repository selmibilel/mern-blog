import './about.css'
import Sidebar from '../../components/sidebar/Sidebar'
import AboutComponent from '../../components/aboutComponent/AboutComponent'


export default function About() {
    return (
        <div className="about">
            <AboutComponent />
            <Sidebar />
        </div>
    )
}
