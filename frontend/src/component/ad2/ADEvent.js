// CSS
import '../../contents/css/ad2/ADIntro.css';

const ADEvent = () => {
    return (
        <article className="event">
            <div>
                <div>
                    <h2>할인 중.</h2>
                    <h2>무려 50%</h2>
                    <p style={{textDecoration: "line-through"}}>1일 2,000원 ~ 60,000원</p>
                    <h4>1일 1,000원 ~ 30,000원</h4>
                </div>
                <div>
                    <h2>이번 달,</h2>
                    <h2>50% 더 할인.</h2>
                    <h4 style={{textDecoration: "line-through"}}>1일 1,000원 ~ 30,000원</h4>
                    <h3>1일 500원 ~ 15,000원</h3>
                </div>
            </div>
        </article>
    )
}

export default ADEvent;