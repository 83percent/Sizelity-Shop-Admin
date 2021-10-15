import { Route, Switch } from "react-router-dom";
import HelpIndex from "../component/help/HelpIndex";


const HelpRouter = () => {
    return (
        <Switch>
            <Route path="/help" component={HelpIndex}/>
        </Switch>
    )
}
export default HelpRouter;