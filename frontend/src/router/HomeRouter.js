import { memo, useContext } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';

// CSS
import '../contents/css/home/HomeRouter.css';

// Context
import {UserContext} from '../App';

// Component
import AccountMain from '../component/account/AccountMain';
import ProductMain from '../component/product/ProductMain';
import RequestMain from '../component/request/Request';
import EventMain from '../component/event/EventMain';
import ADMain from '../component/ad/ADMain';

const HomeRouter = ({history}) => {
    const {user:userInfo} = useContext(UserContext);
    const __active = userInfo?.status;
    if(__active === undefined || !userInfo?.id) {
        history.replace("/wrong");
        return null;
    } else if(__active === 0) {
        history.replace("/init");
        return null;
    }
    return (
        <>
            <header>

            </header>
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
                            <p>광고 관리</p>
                        </NavLink>
                    </li>
                </ul>
            </aside>
            <article id="home">
                <Switch>
                    <Route path="/account" component={AccountMain} />
                    <Route path="/product" component={ProductMain} />
                    <Route path="/request" component={RequestMain} />
                    <Route path="/advertisement" component={ADMain} />
                    <Route path="/event" component={EventMain} />
                </Switch>
            </article>
        </>
    )
}
export default memo(HomeRouter);