import ConnectIndex from "../component/connect/ConnectIndex";
import ConnectTestResult from "../component/connect/ConnectResult";
import ConnectOther from "../component/connect/ConnectOther";
import ConnectStart from "../component/connect/ConnectStart";

const { Switch, Route } = require("react-router-dom")

const ConnectRouter = () => {
    return (
        <Switch>
            <Route exact path="/connect" component={ConnectIndex} />
            <Route exact path="/connect/result" component={ConnectTestResult} />
            <Route exact path="/connect/other" component={ConnectOther} />
            <Route exact path="/connect/start" component={ConnectStart} />
        </Switch>
    )
}

export default ConnectRouter;