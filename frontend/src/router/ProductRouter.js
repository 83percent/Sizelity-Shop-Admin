import { Route, Switch } from "react-router"

import ProductIndex from "../component/product/ProductIndex"
import ProductCreateIndex from '../component/product/create/ProductCreateIndex';
import ProductSearch from "../component/product/search/ProductSearch";
import ProductList from "../component/product/list/ProductList";

const ProductRouter = () => {
    return (
        <Switch>
            <Route exact path="/product" component={ProductIndex} />
            <Route exact path="/product/add" component={ProductCreateIndex} />
            <Route exact path="/product/search" component={ProductSearch} />
            <Route exact path="/product/list" component={ProductList} />
        </Switch>
    )
}

export default ProductRouter;