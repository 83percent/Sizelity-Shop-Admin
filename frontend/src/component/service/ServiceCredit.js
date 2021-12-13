import { useContext, useMemo } from 'react';

// Context
import { UserContext } from '../../App';


const ServiceCredit = () => {
    // Conext
    const { user } = useContext(UserContext);

    const date = new Date();
    date.setMonth(new Date().getMonth() - 1);

    const nextCredit = useMemo(() => {
        try {
            const monthCredit = user.count.provide * user.price.income;
            const __date = new Date();
            const today = __date.getDate();
            __date.setMonth(__date.getMonth() + 1);
            __date.setDate(0);
            if(__date.getDate() - today !== 0) {
                return Math.round((monthCredit / today) * (__date.getDate() - today));
            } else {
                return monthCredit;
            }
        } catch {
            return 0;
        }
    }, [user]);

    return (
        <>
            <section className="count-wrapper">
                
                <div className="count-frame">
                    <p>{date.getMonth() + 1}월 까지 수익</p>
                    <div>
                        <p></p>
                        <h2>{user.credit || 0}</h2>
                        <p>원</p>
                    </div>
                    <div>
                        <i className="material-icons">attach_money</i>
                        <div className="bubble">
                            <p>이번달 예상 수익</p>
                            <h2>{nextCredit ? `${nextCredit.toLocaleString()}원` : '데이터 수집 중' }</h2>
                        </div>
                    </div>
                </div>
                <div className="caution">
                    <p>이번달 1일 부터 오늘까지 사이즈 비교를 제공한 총 횟수이며, 서비스 사용 요금 산출은 무료 제공 횟수를 제외한 횟수에서 산출됩니다.</p>
                    <p>타 쇼핑몰 상품과 비교한 경우에만 해당하며, 자신의 쇼핑몰 상품끼리의 비교는 서비스 사용 요금 및 횟수에 포함하지 않습니다.</p>
                    <p>사이즈 비교 횟수는 월 1일에 초기화됩니다.</p>
                </div>
            </section>
        </>
    )
}

export default ServiceCredit;