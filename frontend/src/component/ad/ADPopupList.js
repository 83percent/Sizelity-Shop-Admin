import { useState } from "react";
import { Link } from "react-router-dom";

const ADPopupList = () => {
    const [data, setData] = useState(null);
    return (
        
            data !== null ? (
                <>
                    <section>

                    </section>
                </>
            ) : initComp()
        
    )
}

const initComp = () => {
   
    return (
        <section className="start">
            <div className="explain">
                <h2>소비자의 이목을 끌자.</h2>
                <p>사이즈리티를 방문한 고객에게 직접적으로 노출이 가능한 보장형 광고에요.</p>
                <p>이미지 기반의 광고로 시작하기 위해서는 1:1 비율의 광고 이미지가 필요해요.</p>
                <p>효과적인 광고 메세지 전달을 통해 쇼핑몰 유입을 높여보세요.</p>

                <h4>광고 입찰 가 노출 당 '1.4원' 부터</h4>
                <div>
                    <Link to="/advertisement/popup/create">광고 시작하기</Link>
                </div>
            </div>
        </section>
    )
}

export default ADPopupList;