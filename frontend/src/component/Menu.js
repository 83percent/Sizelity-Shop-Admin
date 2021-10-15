import { Link, NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <aside>
            <div>
                <Link to="/home" className="logo">
                    <i className="material-icons">sell</i>
                </Link>
            </div>
            <ul>
                <li className="element">
                    <NavLink to="/account">
                        <div>
                            <i className="material-icons">person</i>
                        </div>
                        <p>가입정보</p>
                    </NavLink>
                </li>
                <li className="element">
                    <NavLink to="/connect">
                        <div>
                            <i className="material-icons">autorenew</i>
                        </div>
                        <p>쇼핑몰 연동</p>
                    </NavLink>
                </li>
                <li className="element">
                    <NavLink to="/product">
                        <div>
                            <i className="material-icons">checkroom</i>
                        </div>
                        <p>쇼핑몰 상품</p>
                    </NavLink>
                </li>
                <li className="element">
                    <NavLink to="/request">
                        <div>
                            <i className="material-icons">priority_high</i>
                        </div>
                        <p>요청 상품</p>
                    </NavLink>
                </li>
                <li className="element">
                    <NavLink to="/event">
                        <div>
                            <i className="material-icons">celebration</i>
                        </div>
                        <p>쇼핑몰 이벤트</p>
                    </NavLink>
                </li>
                <li className="element">
                    <NavLink to="/advertisement">
                        <div>
                            <i className="material-icons">paid</i>
                        </div>
                        <p>광고 센터</p>
                    </NavLink>
                </li>
                <li className="element">
                    <NavLink to="/help">
                        <div>
                            <i className="material-icons">help</i>
                        </div>
                        <p>문의하기</p>
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default Menu;