import { useContext } from 'react';

// Context
import { UserContext } from '../../../App';

// CSS
import '../../../contents/css/service/Claim.css';

const ClaimHome = ({history}) => {
    // Context
    const { user } = useContext(UserContext);

    function movePre() {
        history.push("/service/claim/pre")
    }

    return (
        <>
            <p></p>
            <h2>요금 납부</h2>
            <section className="claim-frame">
                <h3>선결제 납부</h3>
                {
                    user.price?.expire > 0 ? (
                        <div className="pre" onClick={() => movePre()}>
                            <p className={user.price.pre_pay?.check ? "check" : "wrong"}>
                                {user.price.pre_pay?.check ? "결제 완료" : "미결제"}
                            </p>
                            <h4>{user.price.pre_pay?.price.toLocaleString()}</h4>
                            <p className="per">원</p>
                        </div>
                    ) : (
                        <div>
                            <p>선결제 내역이 없습니다.</p>
                        </div>
                    )
                }
            </section>
            <section className="claim-frame">
                <h3>요금 납부 내역</h3>
                <div>
                    <p>요금 납부 내역이 없습니다.</p>
                </div>
            </section>
        </>
    )
}

export default ClaimHome;