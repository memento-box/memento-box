import { useHistory } from 'react-router-dom';
import './StartYourBox.css';

function StartYourBox() {
    const history = useHistory();

    const handleClick = () => {
        history.push("/box-setup-information");
    }
    return(
        <div id='confetti'>
            <h1>Start Building Your Box!</h1>
            <button onClick={handleClick}>Get Started</button>
        </div>
    )
};

export default StartYourBox;