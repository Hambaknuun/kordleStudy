const Header = ({ toggleEZMode, EZMode }) => {
    return (
        <div className="header">
            <h2 className="ttl">꼬들 - 한국어</h2>
            <menu className="menuLst">
                <li className="menu icon create"></li>
                <li className="menu icon setting"></li>
                <li className="menu icon question"></li>
                <li className="menu icon chart"></li>
                <li className="menu mode" onClick={toggleEZMode}>
                    {EZMode ? "EZ" : "HRD"}
                </li>
            </menu>
        </div>
    );
};

export default Header;
