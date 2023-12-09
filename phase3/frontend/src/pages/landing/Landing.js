import './Landing.scss'
import logo from '../../assets/logo.png'

export function Landing() {
    return (
        <div className="page-container">
            <img src={logo} alt={"PetHub Logo"}></img>
            <div className="button-container">
                <a className="Button__purpleOutline action-button" href="./login">Log In</a>
                <a className="Button__purple action-button" href="./signup/shelter">Sign Up as Pet
                    Shelter</a>
                <a className="Button__purple action-button" href="./signup/seeker">Sign Up as Pet Seeker</a>
            </div>
        </div>
    )
}