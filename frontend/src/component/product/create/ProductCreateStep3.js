import { useContext } from "react";
import { UserContext } from "../../../App";


const ProductCreateStep3 = ({product, move, setProductInfo}) => {

    // Context
    const { user } = useContext(UserContext);
    function pass() {
        const inputs = document.querySelectorAll("input");
        const __infoObject = {ptype: product.info.ptype, sname: user.sname};
        // pname
        if(inputs[0].name === 'pname') {
            const value = inputs[0].value;
            if(value.length < 2 || value.length > 20) {
                inputs[0].classList.add("wrong");
                return window.alert("상품명은 2~20자가 필요합니다.");
            } else {
                inputs[0].classList.remove("wrong");
                __infoObject.pname = value;
            }
        }

        // subtype
        if(inputs[1].name === 'subtype') {
            const value = inputs[1].value;
            if(value.length < 2 || value.length > 20) {
                inputs[1].classList.add("wrong");
                return window.alert("세부 분류는 2~20자가 필요합니다.");
            } else {
                inputs[1].classList.remove("wrong");
                __infoObject.subtype = value;
            }
        }
        setProductInfo('info',__infoObject);
        move();
    }
    return (
        <section className="step3">
            <h2>기본 정보</h2>
            <p>상품의 기본 정보를 입력합니다.</p>
            <label>
                <h3>상품 명</h3>
                <input type="text" name="pname" autoComplete="off" defaultValue={product?.info?.pname}/>
            </label>
            <label>
                <h3>세부 분류</h3>
                <p>고객이 사이즈 가늠 및 상품 예측이 가능한 세부 분류를 입력해주세요.</p>
                <p className="wrong">잘못된 예) 청바지, 흰티, 외투, 잠바</p>
                <p className="ok">올바른 예) 긴청바지, 흰반팔티, 패딩, 코트</p>
                <input type="text" name="subtype" autoComplete="off" defaultValue={product?.info?.subtype}/>
            </label>
            <div className="next-wrapper">
                <button onClick={() => pass()}>
                    <i className="material-icons">arrow_forward</i>
                </button>
            </div>
            <div className="btn-wrapper">
                <button onClick={() => move(-1)}>
                    <i className="material-icons">chevron_left</i>
                    <p>이전 단계로</p>
                </button>
            </div>
        </section>
    )
}

export default ProductCreateStep3;