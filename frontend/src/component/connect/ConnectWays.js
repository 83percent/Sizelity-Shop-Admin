import { useState } from 'react';

// CSS
import '../../contents/css/connect/ConnectWays.css';

const ConnectWays = () => {
    // State
    const [onWay, setWay] = useState(null);
    
    const event = {
        wayClick : function(type) {
            if(onWay === null || onWay !== type) {
                setWay(type);
            } else {
                setWay(null);
            }
        }
    }

    return (
        <article id="connect" className="ways">
            <ul>
                <li>
                    <div className="title" onClick={() => event.wayClick("cafe24")}>
                        <h2>카페24</h2>
                        <i className="material-icons">add</i>
                    </div>
                    <div className="more">
                        {
                            onWay === "cafe24" ? (
                                <img alt="연결 방법" title="연결 방법" src={"https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/ways/%EC%9E%90%EB%8F%99%EC%97%B0%EA%B2%B0_%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95_(%EC%B9%B4%ED%8E%9824).png"} />
                            ) : null
                        }
                    </div>
                </li>
                <li>
                    <div className="title" onClick={() => event.wayClick("godo")}>
                        <h2>고도몰</h2>
                        <i className="material-icons">add</i>
                    </div>
                    <div className="more">
                        {
                            onWay === "godo" ? (
                                <img alt="연결 방법" title="연결 방법" src={"https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/ways/%EC%9E%90%EB%8F%99%EC%97%B0%EA%B2%B0_%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95_(%EA%B3%A0%EB%8F%84%EB%AA%B0).jpg"} />
                            ) : null
                        }
                    </div>
                </li>
                <li>
                    <div className="title" onClick={() => event.wayClick("make")}>
                        <h2>메이크샵</h2>
                        <i className="material-icons">add</i>
                    </div>
                    <div className="more">
                        {
                            onWay === "make" ? (
                                <img alt="연결 방법" title="연결 방법" src={"https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/ways/%EC%9E%90%EB%8F%99%EC%97%B0%EA%B2%B0_%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95_(%EB%A9%94%EC%9D%B4%ED%81%AC%EC%83%B5).jpg"} />
                            ) : null
                        }
                    </div>
                </li>
                <li>
                    <div className="title" onClick={() => event.wayClick("wisa")}>
                        <h2>위사</h2>
                        <i className="material-icons">add</i>
                    </div>
                    <div className="more">
                        {
                            onWay === "wisa" ? (
                                <img alt="연결 방법" title="연결 방법" src={"https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/ways/%EC%9E%90%EB%8F%99%EC%97%B0%EA%B2%B0_%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95_(%EC%9C%84%EC%82%AC).jpg"} />
                            ) : null
                        }
                    </div>
                </li>
                
                <li>
                    <div className="title" onClick={() => event.wayClick("etc")}>
                        <h2>기타</h2>
                        <i className="material-icons">add</i>
                    </div>
                    <div className="more">
                        {
                            onWay === "etc" ? (
                                <>
                                    <h2>기타 연동 방법</h2>
                                    <p>사이즈 비교 서비스의 자동연결을 위해서는 "상품 상세보기 화면"에 위에서 생성된 버튼 코드가 포함되어야 해요.</p>
                                    <p>쇼핑몰 홈페이지를 커스텀 디자인할 수 있는지, 쇼핑몰을 제작한 업체에 의뢰해주세요.</p>
                                    <p>또는 제작 업체 측에 위 코드를 전달하여 "상품 상세 페이지"에 추가를 요청해보세요.</p>
                                </>
                            ) : null
                        }
                    </div>
                </li>
            </ul>
        </article>
    )
}

export default ConnectWays;