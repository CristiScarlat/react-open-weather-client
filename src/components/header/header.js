import { useContext, useState } from "react";
import { Ctx } from "../../context/store";
import CloseButton from "../closeButton/closeButton";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
    const [showHeaderMenu, setShowHeaderMenu] = useState(false);
    const { setCity } = useContext(Ctx);

    const handleSearchCity = (e) => {
        e.preventDefault();
        setCity(e.target[0].value);

    }

    return (
        <div className="header-wrapper">
            <div className="close-button-responsive">
                <span className="span-brand">OpenWeather Api Client</span>
                {showHeaderMenu ? <CloseButton onClick={() => setShowHeaderMenu(false)} /> : <button onClick={() => setShowHeaderMenu(true)}>&#9776;</button>}
            </div>
            <div className="header-container" style={{ display: showHeaderMenu ? 'flex' : 'none' }}>
                <hr className="header-separator" />
                <span className="span-brand">OpenWeather Api Client</span>
                <div className="header-links">
                    <Link to="/">Home</Link>
                    <Link to="/forecast">Forecast</Link>
                    <Link to="/about">About</Link>
                </div>
                <hr className="header-separator" />
                <form className="header-form" onSubmit={handleSearchCity}>
                    <input type="text" name="search" placeholder="Search City" />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Header;