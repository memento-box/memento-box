import './Hero.css'
import { HashLink } from 'react-router-hash-link';

function Hero() {
    return(
        <div id="hero">
            <div id="text">
                <h1>Digital gifts, <br /> done differently</h1>
                <h6>Introducing the Memento Box</h6>
                <HashLink to="#video-wrapper">Learn more</HashLink>
            </div>
            <div className='box-wrapper' >
                <img src="/boxes/white-red-ribbon.png" id="closedBox"/>
                <img src="/RecipientBoxOpen.png" id="hoverBox"/>
            </div>
        </div>
    )
};

export default Hero;