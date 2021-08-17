
// CSS
import '../../contents/css/ad/ADProductMain.css';

const ADProductMain = () => {
    return (
        <article id="ad-product" className="content-main">
            <header>
                <h1>상품 추천</h1>
            </header>
            <section className="start">
                <div className="explain">
                    <h2>무분별한 광고는 그만.</h2>
                    <p>사이즈 비교단계에 들어선 고객은 구매를 목적으로 하고있아요.</p>
                    <p>즉, 사이즈리티에 방문하여 사이즈를 비교하고 있다는 것은 실질적 구매자이죠.</p>
                    <p>구매자에게 현재 보고있는 상품과 유사한 상품을 추천하고 쇼핑몰 방문을 이끌어보세요.</p>
                    <h4>광고 입찰 가 노출 당 '0.8원' 부터</h4>
                    <button>광고 시작하기</button>
                </div>
            </section>
        </article>
    )
}
export default ADProductMain;