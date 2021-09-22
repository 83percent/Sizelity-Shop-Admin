import DateFormat from '../../../contents/js/DateFormat';

// CSS
import '../../../contents/css/ad/event/ADEventPreview.css';



const ADEventPreview = ({imageURL, data, user}) => {
    return (
        <article className="preview">
            <i className="material-icons">arrow_back</i>
            <h2>진행중인 이벤트</h2>
            <p>프로모션</p>
            <div>
                
                <ul>
                    <li style={{cursor:"pointer"}}>
                        <div className="info">
                            <h3>{user.sname}</h3>
                            {
                                <EventType type={data?.type} />
                            }
                            <h4 className="expire">{DateFormat.eventDay(data?.expire)}</h4>
                        </div>
                        <div className="image">
                            {
                                imageURL ? (
                                    <img src={imageURL} alt="Event Image" className="image-frame"/>
                                ) : (
                                    <div className="image-frame"></div>
                                )
                            }
                        </div>                      
                    </li>
                    <li style={{opacity: "0.5"}}>
                        <div className="info">
                            <h3>사이즈리티</h3>
                            <p></p>
                        </div>
                        <div className="image">
                            <div className="image-frame"></div>
                        </div>                     
                    </li>
                    <li style={{opacity: "0.5"}}>
                        <div className="info">
                            <h3>사이즈리티</h3>
                            <p></p>
                        </div>
                        <div className="image">
                            <div className="image-frame"></div>
                        </div>                     
                    </li>
                </ul>
            </div>
        </article>
    )
}
const EventType = ({type}) => {
    switch (type) {
        case "discount": {
            return (
                <p style={{backgroundColor: "#FE4F12"}}>할인</p>
            )
        }
        case "free" : {
            return (
                <p style={{backgroundColor: "#E61050"}}>무료배송</p>
            )
        }
        case "coupon" : {
            return (
                <p style={{backgroundColor: "#C11EFC"}}>쿠폰</p>
            )
        }
        case "saving" : {
            return (
                <p style={{backgroundColor: "#00966B"}}>적립</p>
            )
        }
        default: {
            return null;
        }
    }
}
export default ADEventPreview;