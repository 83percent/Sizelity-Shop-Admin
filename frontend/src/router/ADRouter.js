import { Route, Switch } from "react-router-dom";

import ADMain from "../component/ad2/ADMain";
import ADStart from "../component/ad2/ADStart";

import '../contents/css/ad2/ADRouter.css';

const ADRouter = () => {
    return (
        <main id="ad-center">
            <header>
                <h1>광고센터</h1>
            </header>
            <Switch>
                <Route exact path="/advertisement" component={ADMain}/>
                <Route exact path="/advertisement/:type" component={ADStart}/>
            </Switch>
        </main>
    )
}
export default ADRouter;