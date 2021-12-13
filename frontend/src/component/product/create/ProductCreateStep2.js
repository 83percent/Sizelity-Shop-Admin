import __ProductType from '../../../contents/js/ProductType';

const ProductCreateStep2 = ({product, move, setProductType:__setProductType}) => {
    const ProductType = __ProductType.ptype;

    function setProductType(value) {
        __setProductType(value);
        move();
    }

    return (
        <section className="step2">
            <h2>상품 대분류 설정</h2>
            <p>상품의 분류를 설정합니다.</p>
            <div className="type-list-wrapper">
                <ul>
                {
                    ProductType.map((element, index) => {
                        if(element.value === "set") return null;
                        else return (
                            <li key={index} onClick={() => setProductType(element.value)} className={product?.info?.ptype === element.value ? 'before' : ""}>
                                <h4>{element.name}</h4>
                                <i className="material-icons">chevron_right</i>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
            {/* <div className="type-list-wrapper" style={{borderTop: "1px solid #cacaca", padding: "1rem", margin: "0"}}>
                <ul>
                    <li onClick={() => {setProductType("set")}} className={product?.info?.ptype === 'set' ? 'before' : ""}>
                        <h4>코디 / 세트 상품</h4>
                        <i className="material-icons">chevron_right</i>
                    </li>
                </ul>
                <p>2개 이상의 분류 또는 상품을 하나의 상품으로 구성하여 판매하는 경우</p>
            </div>
            <div className="btn-wrapper">
                <button onClick={() => move(-1)}>
                    <i className="material-icons">chevron_left</i>
                    <p>이전 단계로</p>
                </button>
            </div> */}
        </section>        
    )
}

export default ProductCreateStep2;