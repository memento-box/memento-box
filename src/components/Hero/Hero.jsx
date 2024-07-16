import './Hero.css'

function Hero() {
    return(
        <div id="hero">
            <div id="text">
                <h1>Digital gifts, <br /> done differently</h1>
                <h6>Introducing the Memento Box</h6>
                <button>Learn more</button>
            </div>
                <img src="/boxes/white-red-ribbon.png" id="closedBox"/>
                <img src="/RecipientBoxOpen.png" id="hoverBox"/>
        </div>
    )
};

export default Hero;