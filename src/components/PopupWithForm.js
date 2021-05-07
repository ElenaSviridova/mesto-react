import closeIconPath from '../images/Close-Icon.svg';

function PopupWithForm({title, name, children, isOpen, onClose}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <form name={name} className="popup__container" >
                <button type="button" className="popup__close-button" onClick={onClose}>
                    <img src={closeIconPath} alt="картинка закрытия окна" className="popup__close-icon"/>
                </button>
                <h2 className="popup__title">{title}</h2>
                {children}
            </form>
        </div>
    )
}

export default PopupWithForm;