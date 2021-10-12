import { Link } from "react-router-dom";

const MainAutoHelp = () => {
    return (
        <article className="autoHelp">
            <i className="material-icons">help</i>
            <div>
                <p>쇼핑몰과 사이즈리티의 '자동연결' 하셨나요?</p>
                <p>도와드릴게요.</p>
                <Link to="/connect">
                    <p>자동연결 설정하기</p>
                    <i className="material-icons">arrow_forward_ios</i>
                </Link>
            </div>
        </article>
    )
}
export default MainAutoHelp;