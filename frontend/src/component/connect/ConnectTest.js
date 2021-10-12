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
            <h2>자동연결이 가능한지 확인합니다.</h2>
            <div>
                <input
                    ref={testURLInput}
                    onKeyPress={e => {if(e.key === 'Enter') check(e.target.value)}}
                    type="text"
                    placeholder="쇼핑몰의 상품 상세보기 주소를 입력해주세요."/>
                <button onClick={() => check(testURLInput.current.value)}>확인</button>
            </div>
            <img src={ConnectExampleImage} alt="상세보가 주소 예시" title="상세보기 주소 예시"/>
        </article>
    )
}
export default ConnectTest;