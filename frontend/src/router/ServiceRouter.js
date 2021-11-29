import { Route, Switch } from "react-router-dom";

// Component
import ServiceIndex from "../component/service/ServiceIndex";

const ServiceRouter = () => {
    return (
        <Switch>
            <Route exact path="/service" component={ServiceIndex} />
        </Switch>
    )
}
export default ServiceRouter;