import { useHistory } from 'react-router-dom';
import './Hero.css'

function Hero() {
 

    return(
        <div id="hero">
            {/* <div id="text">
                <h1>Digital gifts, <br /> done differently</h1>
                <h6>Introducing the Memento Box</h6>
                <button>Learn more</button>
            </div>
            <div className='box-wrapper' >
                <a href='#video-wrapper' class="btn">Learn more</a>
                <button onClick={() => toVideo()}>Learn more</button>
            </div> */}
            <div className='box-wrapper' >
                <img src="/boxes/white-red-ribbon.png" id="closedBox"/>
                <img src="/RecipientBoxOpen.png" id="hoverBox"/>
            </div>
        </div>
    )
};

export default Hero;