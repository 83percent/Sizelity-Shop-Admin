import { useContext } from "react";
import { UserContext } from "../../App";


const ServiceProvide = () => {
    // Conext
    const { user } = useContext(UserContext);
    
    console.log(user);

    const date = new Date();


    return (
        <>
            <section className="count-wrapper">
                
                <div className="count-frame">
                    <p>이번달 사이즈 정보 제공</p>
                    <div>
                        <p>총</p>
                        <h2>{user.count.provide}</h2>
                        <p>회</p>
                    </div>
                    <div>
                        <i className="material-icons">attach_money</i>
                        <div className="bubble">
                            <p>{date.getMonth() + 1}월 1 ~ {date.getDate()}일 까지 적립금</p>
                            <h2>{Math.round(user.count.provide * user.price.income).toLocaleString()}원</h2>
                        </div>
                    </div>
                </div>
                <div className="caution">
                    <p>이번달 1일 부터 오늘까지 타 쇼핑몰에 사이즈정보를 제공한 총 횟수입니다.</p>
                    <p>타 쇼핑몰 상품 사이즈 비교에 관여한 경우에만 해당하며, 자신의 쇼핑몰 상품끼리의 비교는 횟수에 포함하지 않습니다.</p>
                    <p>적립금은 월 1일에 쇼핑몰에 적용된 수익금을 곱하여 제공되고 초기화됩니다.</p>
                </div>
            </section>
        </>
    )
}

export default ServiceProvide;