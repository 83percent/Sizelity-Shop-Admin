import { Link } from "react-router-dom";

const MainADEvent = () => {
    return (
        <article className="autoHelp">
            <p>50%</p>
            <div>
                <p>광고, 하루 1,000원 ~ 30,000원으로</p>
                <p>지금 할인중.<i>(VAT 10% 별도)</i></p>
                <p>이번 달, 무려 50% 더 할인.</p>
                <Link to="/advertisement">
                    <p>광고 신청하러 가기</p>
                    <i className="material-icons">arrow_forward_ios</i>
                </Link>
            </div>
        </article>
    )
}

export default MainADEvent;