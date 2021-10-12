import { memo, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

// CSS
import '../contents/css/home/HomeRouter.css';

// Context
import {UserContext} from '../App';

// Component
import Menu from '../component/Menu';

import AccountRouter from './AccountRouter';
import ProductMain from '../component/product/ProductMain';
import RequestMain from '../component/request/Request';
import EventMain from '../component/event/EventMain';

/* import ADMain from '../component/ad/ADMain'; */
import ADMain2 from '../component/ad2/ADIndex';
import MainIndex from '../component/main/MainIndex';
import ConnectRouter from './ConnectRouter';

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
            <Menu />
            <article id="home">
                <Switch>
                    <Route path="/home" component={MainIndex} />
                    <Route path="/account" component={AccountRouter} />
                    <Route path="/product" component={ProductMain} />
                    <Route path="/request" component={RequestMain} />
                    <Route path="/advertisement" component={ADMain2} />
                    <Route path="/connect" component={ConnectRouter} />
                    <Route path="/event" component={EventMain} />
                    {/* <Route path="/advertisement" component={ADMain} /> */}
                </Switch>
            </article>
        </>
    )
}
export default memo(HomeRouter);