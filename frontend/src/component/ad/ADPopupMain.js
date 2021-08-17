import { Route, Switch } from 'react-router-dom';

// Component
import ADPopupList from './ADPopupList';
import ADPopupCreate from './ADPopupCreate';

// CSS
import '../../contents/css/ad/ADPopupMain.css';

const ADPopupMain = () => {
    return (
        <article id="ad-popup" className="content-main">
            <header>
                <h1>팝업 배너</h1>
            </header>
            <Switch>
                <Route exact path="/advertisement/popup" component={ADPopupList} />
                <Route path="/advertisement/popup/create" component={ADPopupCreate} />
            </Switch>
        </article>
    )
}


export default ADPopupMain;