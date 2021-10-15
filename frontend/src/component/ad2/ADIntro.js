// CSS
import '../../contents/css/ad2/ADIntro.css';

const ADIntro = ({history}) => {
    
    function moveStart(adType) {
        switch(adType) {
            case 'popup' : {
                history.push('/advertisement/popup');
                break;
            }

            case 'top' : {
                history.push('/advertisement/top');
                break;
            }
            default : {
                return window.alert("잘못된 접근입니다");
            }
        }
    }

    return (
        <article className="intro">
            <section className="popup">
                <img src="https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/systemimage/popup_image.png" alt="팝업 광고 예시 이미지" title="팝업 광고" />
                <div>
                    <h2>팝업 배너</h2>
                    <p>사이즈 비교를 위해 방문시,</p>
                    <p>화면 하단에 노출되는 주목도 높은</p>
                    <p>영역입니다.</p>
                    <button onClick={() => moveStart("popup")}>시작하기</button>
                    <ul className="price">
                        <li className="pure">
                            <p>1일</p>
                            <h4>60,000원</h4>
                        </li>
                        <li>
                            <p>50% 할인</p>
                            <h4>30,000원</h4>
                        </li>
                        <li>
                            <p>추가 혜택 50%</p>
                            <h4><strong>15,000원</strong></h4>
                        </li>
                    </ul>
                    <i>(부가세 10% 별도)</i>
                </div>
            </section>
            <section className="top">
                <div>
                    <h2>상위 노출</h2>
                    <p>여러 쇼핑몰에서 제공하는 혜택을 비교하는</p>
                    <p>고객에게 가장 먼저 노출 되는 영역입니다.</p>
                    <button onClick={() => moveStart('top')} >시작하기</button>
                    <ul className="price">
                        <li className="pure">
                            <p>1일</p>
                            <h4>2,000원 ~ 36,000원</h4>
                        </li>
                        <li>
                            <p>50% 할인</p>
                            <h4>1,000원 ~ 18,000원</h4>
                        </li>
                        <li>
                            <p>추가 혜택 50%</p>
                            <h4><strong>500원 ~ 9,000원</strong></h4>
                        </li>
                    </ul>
                    <i>(부가세 10% 별도)</i>
                </div>
                <img src="https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/systemimage/top_image.png" alt="상위 노출 광고 예시 이미지" title="상위 노출 광고" />
            </section>
            <section className="center">
                <div>
                    <h2>최소 보장 환급 광고</h2>
                    <p>1개월간 최소 7일 ~ 최대 31일의 광고 노출을 보장하는 팝업 배너 광고.</p>
                    <p>날짜 지정이 불가능 하지만, 최소 보장 7일을 달성하지 못할 시, 전액 광고비를 환불해드립니다.</p>
                    <p style={{marginTop: "1rem"}}>(일반 '팝업 배너'와는 다른 상품이며, 할인 혜택이 적용되지 않습니다.)</p>
                    <button onClick={() => moveStart('popup')}>시작하기</button>
                    <div>
                        <p>1개월</p>
                        <h4>70,000원</h4>
                    </div>
                </div>
            </section>
        </article>
    )
}
export default ADIntro;