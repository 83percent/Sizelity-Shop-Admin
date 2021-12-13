import { Link } from 'react-router-dom';

// CSS
import '../../contents/css/connect/ConnectStart.css';
import ConnectWays from './ConnectWays';
import CustomIndex from './CustomButton/CustomIndex';

const ConnectStart = () => {
    return (
        <main id="connect" className="start">
            <header>
                <div className="logo">
                    <i className="material-icons">sell</i>
                </div>
                <h1>쇼핑몰 연동 가이드</h1>
            </header>
            {/* <article className="dev">
                <div>
                    <h2>개발자가 있나요?</h2>
                    <p>개발자가 존재한다면, 자유로운 방식으로 자동연결이 가능합니다.</p>
                </div>
                <Link to="/connect/dev">개발자 가이드</Link>
            </article> */}
            <ul>
                <li>
                    <div className="title">
                        <h4>1</h4>
                        <h3>나만의 "사이즈리티 연동 버튼" 만들기</h3>
                        <p>여러분의 쇼핑몰에 어울리는 디자인으로 만들어보세요.</p>
                    </div>
                    <div className="custom-design-wrapper">
                        <CustomIndex/>
                    </div>
                </li>
                <li>
                    <div className="title">
                        <h4>2</h4>
                        <h3>상세보기 페이지에 붙여넣기</h3>
                    </div>
                    <div className="sub-title">
                        <p>많은 쇼핑몰 솔루션들은 운영자가 직접 HTML 편집을 할 수 있는 기능을 지원해요.</p>
                        <p>"상품 상세보기" 제작, 디자인 및 관리하는 HTML 편집기에 복사된 '버튼 코드'를 붙여넣어주세요.</p>
                    </div>
                    
                    <ConnectWays />
                </li>
                <li>
                    <div className="title">
                        <h4>3</h4>
                        <h3>확인</h3>
                    </div>
                    <div className="sub-title">
                        <p>쇼핑몰을 PC와 모바일에서 추가된 버튼을 확인하세요.</p>
                        <p>추가한 버튼이 적절한 위치인지 확인하고 수정이 필요한 경우 복사한 코드를 붙여넣었던 부분만 다시 붙여 넣기만 하면되요.</p>
                        <p>위치가 적절하다면, 버튼을 눌러 확인해보세요.</p>
                        <p>- 정상작동 : 사이즈 비교 화면이 뜨거나, 상품 정보가 없다고 뜨면 완료</p>
                        <p>("잘못된 접근" 이라 뜨는 경우, 문의해주세요.)</p>
                    </div>
                </li>
            </ul>
            <article className="help">
                <h2>추가 중 문제가 발생했나요?</h2>
                <h2>또는 도움이 필요하신가요?</h2>
                <a href="http://pf.kakao.com/_xfvrYs" rel="noreferrer" target="_blank">문의하기</a>
            </article>
            <article className="su">
                <h3>추가가 완료 되었나요?</h3>
                <h2>이제 상품 등록을 통해 고객에게 최고의 경험을 선사해보세요.</h2>
                <Link to="/product">
                    <p>상품으로 이동</p>
                    <i className="material-icons">arrow_forward_ios</i>
                </Link>
            </article>
        </main>
    )
}

export default ConnectStart;