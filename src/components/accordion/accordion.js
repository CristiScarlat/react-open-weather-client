import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./accordion.scss";


const Accordion = ({children, title, className, defaultState}) => {
    const [bodyHeight, setBodyHeight] = useState(defaultState === 'open' ? '100%' : '1px');

    const handleOpenContent = () => {
        setBodyHeight(state => {
            if(state === "100%")return "1px";
            else return "100%"
        })
    }

    return(
        <div className={`accordion-container ${className}`}>
            <div className="accordion-header">
                {title && <p style={{margin: 'auto'}}>{title}</p>}
                <IoIosArrowDown size="2rem" onClick={handleOpenContent} style={{transform: bodyHeight === "100%" ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all 0.2s ease-in 0s'}}/>
            </div>
            <div className="accordion-body" style={{height: bodyHeight, transition: 'all 0.5s ease-out 0s'}}>
                <div style={{opacity: bodyHeight === "100%" ? 1 : 0, transition: 'opacity 0.5s ease-out 0s'}}>{children}</div>
            </div>
        </div>
    )
}

export default Accordion;