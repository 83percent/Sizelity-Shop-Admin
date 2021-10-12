// CSS
import '../../contents/css/connect/ConnectOther.css';

const ConnectOther = () => {
    return (
        <main id="connect" className="other">
            <header>
                <h1>다른 연결 방법</h1>
                <p>자동연결을 지원하지 않는 쇼핑몰인가요?</p>
                <p>걱정말아요. 다른 연결 방법을 알려드릴게요.</p>
            </header>
            <section>
                <div className="title">
                    <div className="icon-frame">
                        <i className="material-icons">checkroom</i>
                    </div>
                    <h2>상품 추가하셨나요?</h2>
                </div>
                <div className="explain">
                    <p>특정 상품의 사이즈 비교를 고객에게 제공하기 위해서는 상품 등록이 필요해요.</p>
                    <p>등록된 상품의 사이즈 비교로 이동하는 링크를 고객에게 제공할 수 있는 방법이 있어요.</p>
                </div>
            </section>
            <section>
                <div className="title">
                    <div className="icon-frame">
                        <i className="material-icons">share</i>
                    </div>
                    <h2>내보내기를 사용해보세요.</h2>
                </div>
                <div className="explain">
                    <p>등록된 상품의 내보내기 기능을 사용해서 원하는 곳에 붙여 넣어보세요.</p>
                </div>
                <ul>
                    <li>
                        <div className="title">
                            <div>
                                <i className="material-icons">attachment</i>
                            </div>
                            <h3>링크</h3>
                        </div>
                        <div className="explain">
                            <p>등록된 상품의 사이즈비교로 바로 이동하는 링크에요.</p>
                            <p>고객이 링크를 누르는 것 만으로도 상품의 사이즈 비교를 제공할 수 있어요.</p>
                            <h4>사용처 예시 : 쇼핑몰, 오픈마켓, 커머스 플랫폼, 블로그 마켓</h4>
                        </div>
                    </li>
                    <li>
                        <div className="title">
                            <div>
                                <i className="material-icons">content_copy</i>
                            </div>
                            <h3>링크 카드</h3>
                        </div>
                        <div className="explain">
                            <p>HTML로 만들어진 링크 카드에요.</p>
                            <p>HTML 추가가 가능한 곳에 붙여넣어 간단하게 상품의 사이즈비교를 사용자에게 제공해보세요.</p>
                            <h4>사용처 예시 : 블로그</h4>
                        </div>
                    </li>
                    <li>
                        <div className="title">
                            <div>
                                <i className="material-icons">qr_code</i>
                            </div>
                            <h3>QR 코드</h3>
                        </div>
                        <div className="explain">
                            <p>상품의 사이즈비교로 이동하는 QR코드 입니다.</p>
                            <p>화면 캡쳐 후 원하는 곳에 사용해요.</p>
                            <h4>사용처 예시 : 홈쇼핑</h4>
                        </div>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default ConnectOther;