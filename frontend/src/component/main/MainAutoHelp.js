import { Link } from "react-router-dom";

const MainAutoHelp = () => {
    return (
        <article className="autoHelp">
            <i className="material-icons">help</i>
            <div>
                <p>사이즈리티와 쇼핑몰 연동 하셨나요?</p>
                <p>도와드릴게요.</p>
                <Link to="/connect">
                    <p>쇼핑몰 연동하기</p>
                    <i className="material-icons">arrow_forward_ios</i>
                </Link>
            </div>
        </article>
    )
}
export default MainAutoHelp;