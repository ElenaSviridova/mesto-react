import closeIconPath from '../images/Close-Icon.svg';
function ImagePopup({card, onClose, isOpen}) {
    return (
        <div className={`popup popup_image ${isOpen && 'popup_opened'}`}>
                <div className="popup__big-picture">
                    <img src={card.image} alt="картинки нет" className="popup__picture" />
                    <h2 className="popup__caption">{card.title}</h2>
                    <button className="popup__close-button" onClick={onClose}>
                        <img src={closeIconPath} alt="картинка закрытия окна" className="popup__close-icon"/>
                    </button>
                </div>
        </div>
    )
};

export default ImagePopup;