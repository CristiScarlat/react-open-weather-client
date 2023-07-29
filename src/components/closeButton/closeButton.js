import "./closeButton.scss";

const CloseButton = ({onClick}) => {
    return (
        <button className="close-btn" onClick={onClick}>
            <span aria-hidden="true">&times;</span>
        </button>
    )
}

export default CloseButton;