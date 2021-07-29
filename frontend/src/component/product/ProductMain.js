import { NavLink, Route, Switch } from 'react-router-dom';

// CSS
import '../../contents/css/product/Product.css';
import '../../contents/css/product/ProductMain.css';

// Component
import ProductSearch from './ProductSearch';
import ProductAdd from './ProductAdd';

const ProductMain = () => {
    return (
        <section id="product-main">
            <header>
                <h1 className="title">쇼핑몰 상품</h1>
                <ul>
                    <li>
                        <NavLink exact to="/product">
                            <i className="material-icons">search</i>
                            <p>검색</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/product/add">
                            <i className="material-icons">add</i>
                            <p>추가</p>
                        </NavLink>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route exact path={["/product", "/product/"]} component={ProductSearch} />
                <Route path="/product/add" component={ProductAdd} />
            </Switch>
        </section>
    )
}

export default ProductMain;