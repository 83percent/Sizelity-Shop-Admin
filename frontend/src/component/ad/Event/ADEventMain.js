import { Route, Switch } from 'react-router-dom';

// Component
import ADEventList from './ADEventList';

// CSS
import '../../../contents/css/ad/ADEventMain.css';
import ADEventCreate from './ADEventCreate';

const ADEventMain = () => {
    return (
        <article id="ad-event" className="content-main">
            <header>
                <h1>이벤트 상위 노출</h1>
            </header>
            <Switch>
                <Route exact path="/advertisement/event" component={ADEventList} />
                <Route path="/advertisement/event/create" component={ADEventCreate} />
            </Switch>
        </article>
    )
}
export default ADEventMain;