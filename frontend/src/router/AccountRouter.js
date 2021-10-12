import { Route, Switch } from "react-router-dom"

// Component
import AccountEdit from "../component/account/AccountEdit"
import AccountMain from "../component/account/AccountMain"

const AccountRouter = () => {
    return (
        <Switch>
            <Route exact path="/account" component={AccountMain} />
            <Route exact path="/account/edit" component={AccountEdit} />
        </Switch>
    )
}

export default AccountRouter;