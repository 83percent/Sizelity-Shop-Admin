import { Link } from "react-router-dom";

import '../../contents/css/product/ProductIndex.css';

const ProductIndex = () => {
    return (
        <main id="product" className="index">
            <header>
                <h1>쇼핑몰 상품</h1>
            </header>
            <section>
                <Link to="/product/search">
                    <i className="material-icons">search</i>
                    <p>상품 검색</p>
                </Link>
                <Link to="/product/add">
                    <i className="material-icons">add</i>
                    <p>상품 추가</p>
                </Link>
                <Link to="/product/list">
                    <i className="material-icons">list</i>
                    <p>상품 목록</p>
                </Link>
            </section>
        </main>
    )
}

export default ProductIndex;