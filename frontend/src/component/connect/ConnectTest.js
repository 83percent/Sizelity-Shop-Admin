import { useRef } from 'react';
import URLModule from '../../contents/js/URL';

// CSS
import '../../contents/css/connect/ConnectTest.css';

// Image
import ConnectExampleImage from '../../contents/image/ConnectTest.png';

const ConnectTest = ({history}) => {
    // ref
    const testURLInput = useRef(null);
    
    // Filed
    const canUseType = ['tistory', 'blog.naver', 'smartstore'];
    function check(value) {
        try {
            if(value.length < 10) return;
            const analyzeURL = new URLModule().get(value);
            if(analyzeURL && !canUseType.includes(analyzeURL.type)) {
                history.push({
                    pathname: '/connect/result',
                    state : {
                        result: true,
                        url : analyzeURL.full
                    }
                });
            } else {
                history.push({
                    pathname: '/connect/result',
                    state: {
                        result: false
                    }
                });
            }
        } catch {
            return window.alert("조회할 수 없는 형식의 주소입니다.");
        }
    }
    return (
        <article className="test">
            <div>
                <h2>쇼핑몰 연동 확인</h2>
                <p>쇼핑몰이 사이즈리티로의 연동이 가능한지 확인합니다.</p>
                <p>사이즈리티와 연동될 페이지는 쇼핑몰 상품의 "상세 보기" 페이지입니다.</p>
                <p>쇼핑몰에서 아무 상품이나 눌러, "상세 보기" 페이지의 주소를 아래 붙여넣어 연동 가능 여부를 확인해주세요.</p>
                <div>
                    <input
                        ref={testURLInput}
                        onKeyPress={e => {if(e.key === 'Enter') check(e.target.value)}}
                        type="text"
                        placeholder="쇼핑몰의 상품 상세보기 주소를 입력해주세요."/>
                    <button onClick={() => check(testURLInput.current.value)}>확인</button>
                </div>
            </div>
            <img src={ConnectExampleImage} alt="상세보가 주소 예시" title="상세보기 주소 예시"/>
        </article>
    )
}
export default ConnectTest;