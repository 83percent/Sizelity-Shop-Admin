import { useContext } from 'react';
import { UserContext } from '../../App';

const ServiceCompare = () => {
    // Conext
    const { user } = useContext(UserContext);
    
    return (
        <>
            <section className="count-wrapper">
                
                <div className="count-frame">
                    <p>이번달 사이즈 비교</p>
                    <div>
                        <p>총</p>
                        <h2>{user.count.compare}</h2>
                        <p>회</p>
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

export default ServiceCompare;