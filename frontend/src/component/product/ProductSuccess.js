import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../contents/css/product/ProductSuccess.css';

const ProductSuccess = ({history, location}) => {
    const {shop, code} = location.state;
    if(!shop || !code) history.replace("/wrong");

    //Ref
    const linkRef = useRef(null);

    const event = {
        copy : function() {
            const text = linkRef.current.innerText;
            var createInput = document.createElement("input");
            createInput.setAttribute("type", "text");
            linkRef.current.appendChild(createInput);
            createInput.value = text;
            createInput.select();
            document.execCommand('copy');
            linkRef.current.removeChild(createInput);
            alert('복사 되었습니다.');
        }, // copy
        linkToggle : function(target) {
        
            for(let i=0; i < 4; ++i) {
                if(target.classList.contains('link')) {
                    break;
                } else target = target.parentElement;
            }
            if(!target.classList.contains('link')) return;

            target.classList.toggle("on");
        }, // linkToggle(target)
    }
    return (
        <article id="success">
            <h1>상품이 저장되었습니다.</h1>
            
            <div className="link">
                <div className="title" onClick={e => event.linkToggle(e.target)}>
                    <h2>사이즈리티 자동연결 모듈이 없으신가요?</h2>
                    <i className="material-icons">expand_more</i>
                </div>
                <div className="explain">
                    <p>아래보이는 링크는 방금 저장한 상품의 사이즈비교로 이동하는 링크에요. </p>
                    <p>여러분의 쇼핑몰에서 아래 링크를 누르고 고객이 들어올 수 있게 만들어보세요.</p>
                    <div>
                        <p ref={linkRef}>https://www.sizelity.com/compare?shop={shop}&no={code}</p>
                        <button onClick={() => event.copy()}>
                            <i className="material-icons">content_copy  </i>
                        </button>
                    </div>
                </div>
            </div>
            <Link to="/product/add">계속 추가하기</Link>
        </article>
    )
}
export default ProductSuccess;