import './aboutComponent.css'
import ImageOne from '../../images/writeimage1.jpg'
import ImageTwo from '../../images/headerImage2.jpg'
import ImageThree from '../../images/singlepost1.jpg'


export default function AboutComponent() {
    return (
        <div className="aboutComponent">
            <div className="titleAbout">About Us</div>
            
            <div className="contentAbout">
                
                <div className="imageAbout">
                    <img 
                    src={ImageOne} 
                    alt=""
                    className="imgAbout" 
                    />
                </div>

                <div className="paragraphAbout">
                    <p>Consectetur adipisicing elit. Corporis commodi asperiores repellat ipsum dolores aperiam,
                    ullam harum rem dolore impedit. Lorem ipsum dolor sit amet consectetur. 
                    </p>
                </div>
                
            </div>

            <div className="contentAbout">

                <div className="paragraphAbout">
                    <p>
                    Exercitationem magnam error delectus. Ipsam quia eum odit ab.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, deleniti.</p>
                </div>

                <div className="imageAbout">
                    <img 
                    src={ImageTwo} 
                    alt=""
                    className="imgAbout" 
                    />
                </div>
                
            </div>

            <div className="contentAbout">
                
                <div className="imageAbout">
                    <img 
                    src={ImageThree} 
                    alt=""
                    className="imgAbout" 
                    />
                </div>

                <div className="paragraphAbout">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Exercitationem magnam error delectus. Ipsam quia eum odit ab.</p>
                </div>
                
            </div>

        </div>
    )
}
