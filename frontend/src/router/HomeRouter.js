import { memo, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

// CSS
import '../contents/css/home/HomeRouter.css';

// Context
import {UserContext} from '../App';

// Component
import Menu from '../component/Menu';

import RequestMain from '../component/request/Request';
import EventMain from '../component/event/EventMain';

import MainIndex from '../component/main/MainIndex';
import ConnectRouter from './ConnectRouter';
import ServiceRouter from './ServiceRouter';
import ProductRouter from './ProductRouter';

const HomeRouter = ({history}) => {
    const {user:userInfo} = useContext(UserContext);
    if(userInfo?.state === undefined || !userInfo?._id) {
        history.replace("/wrong");
        return null;
    } else if(userInfo?.state === 0) {
        history.replace("/init");
        return null;
    }
    return (
        <>
            <Menu />
            <article id="home">
                <Switch>
                    <Route path="/home" component={MainIndex} />
                    <Route path="/service" component={ServiceRouter} />
                    <Route path="/product" component={ProductRouter} />
                    <Route path="/request" component={RequestMain} />
                    <Route path="/connect" component={ConnectRouter} />
                    <Route path="/event" component={EventMain} />
                </Switch>
            </article>
            <nav id="contact">
                <a href="http://pf.kakao.com/_xfvrYs/chat" target="_blank" rel="noreferrer" title="파트너 채널">
                    <i className="material-icons">chat_bubble</i>
                </a>
            </nav>
        </>
    )
}
export default memo(HomeRouter);