import { NavLink, Route, Switch } from 'react-router-dom';

//  Component
import ServiceAccount from './account/ServiceAccount';
import ServicePrice from './price/ServicePrice';
import ServiceCompare from './ServiceCompare';
import ServiceProvide from './ServiceProvide';
import ServiceCredit from './ServiceCredit';
import AccountEdit from './account/AccountEdit';
import AccountPassword from './account/AccountPassword';
import PriceEdit from './price/PriceEdit';
import ClaimHome from './claim/ClaimHome';
import ClaimPre from './claim/ClaimPre';

// CSS
import '../../contents/css/service/ServiceIndex.css';



const ServiceIndex = ({match}) => {
    // State
    const page = match.params?.page;

    return (
        <main id="service" className="index">
            <header>
                <h1>가입 및 이용</h1>
                <div>
                    <NavLink to="/service/account">
                        <h2>내 정보</h2>
                        <div></div>
                    </NavLink>
                    <NavLink to="/service/claim">
                        <h2>요금 납부</h2>
                        <div></div>
                    </NavLink>
                    <NavLink to="/service/price">
                        <h2>요금제</h2>
                        <div></div>
                    </NavLink>
                    <NavLink to="/service/compare">
                        <h2>사이즈 비교 횟수</h2>
                        <div></div>
                    </NavLink>
                    <NavLink to="/service/provide">
                        <h2>정보 제공 수익</h2>
                        <div></div>
                    </NavLink>
                    <NavLink to="/service/credit">
                        <h2>적립금</h2>
                        <div></div>
                    </NavLink>
                    
                </div>
            </header>
            <section className={`wrapper op ${page ? page : ""}`}>
                <Switch>
                    <Route exact path="/service/account" component={ServiceAccount} />
                    <Route exact path="/service/account/edit" component={AccountEdit} />
                    <Route exact path="/service/account/password" component={AccountPassword} />
                    <Route exact path="/service/claim" component={ClaimHome} />
                    <Route exact path="/service/claim/pre" component={ClaimPre} />
                    <Route exact path="/service/price" component={ServicePrice} />
                    <Route exact path="/service/price/edit" component={PriceEdit} />
                    <Route exact path="/service/compare" component={ServiceCompare} />
                    <Route exact path="/service/provide" component={ServiceProvide} />
                    <Route exact path="/service/credit" component={ServiceCredit} />
                </Switch>
            </section>
        </main>
    )
}
export default ServiceIndex;