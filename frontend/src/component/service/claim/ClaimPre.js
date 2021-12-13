import { useContext, useMemo } from "react";
import DateFormat from '../../../contents/js/DateFormat';
import Price from '../../../contents/js/account/Price';

// Context
import { UserContext } from "../../../App";

const ClaimPre = () => {
    const { user } = useContext(UserContext);

    const PriceModule = useMemo(() => {
        return new Price(user.price?.name, user.price?.expire);
    }, [user]);

    const UserPrePrice = useMemo(() => {
        return PriceModule.getPrePay();
    }, [PriceModule]);

    return (
        <>
            <p>선결제 내역</p>
            <h2>약정 선결제</h2>
            <section>
                <ul>
                    <li>
                        <h4>약정 요금제</h4>
                        <p>{PriceModule.getPriceName(user.price?.name)}</p>
                    </li>
                    <li>
                        <h4>기간</h4>
                        <p>{user.price?.expire}개월</p>
                    </li>
                    {
                        user?.price?.pre_pay?.check ? (
                            <>
                            <li>
                                <h4>결제 상태</h4>
                                <p>결제 완료</p>
                            </li>
                            <li>
                                <h4>결제 날짜</h4>
                                <p>{DateFormat.transformDate(user.price.pre_pay.pay_date)}</p>
                            </li>
                            </>
                        ) : (
                            <li>
                                <h4>결제 상태</h4>
                                <p>미결제</p>
                            </li>
                        )
                    }
                </ul>
            </section>
            <div className="bill">
                <div className="detail">
                    <div>
                        <p>'{UserPrePrice.name}' 기본요금</p>
                        <p>{UserPrePrice.base.toLocaleString()}원</p>
                    </div>
                    <div className="under">
                        <p>약정 {UserPrePrice.discount.per}% 할인</p>
                        <p> - {UserPrePrice.discount.price.toLocaleString()}원</p>
                    </div>
                    <div>
                        <p>{UserPrePrice.expire}개월</p>
                        <p>{((UserPrePrice.base - UserPrePrice.discount.price) * UserPrePrice.expire).toLocaleString()}원</p>
                    </div>
                    <div>
                        <p>VAT 10%</p>
                        <p>+ {((UserPrePrice.vat.price * UserPrePrice.expire).toLocaleString())}원</p>
                    </div>

                </div>
                <div className="result">
                    <h4>{UserPrePrice.result.toLocaleString()}</h4>
                    <p>원</p>
                </div>
                <div className="caution">
                    <p>결제 방법과 내용은 설정한 전화번호를 통해 전달됩니다.</p>
                    <p>등록일 기준 1개월 이내에 결제 및 변경, 취소가 가능합니다.</p>
                    <p>결제 확인 이후, 요금이 적용됩니다. 무료 제공 기간이 존재할 경우 무료 제공 기간이 종료된 뒤 요금이 적용됩니다.</p>
                    <p>결제 내용은 기본요금의 선결제이며, 기본 제공되는 무료 제공량 소진 이후 발생하는 비용에 대한 부과는 별도입니다.(월 단위)</p>
                    <p>사용 예약 기간 소진 이전 해지의 경우, 기본요금 환불은 불가합니다.</p>
                </div>
            </div>
        </>
    )
}

export default ClaimPre;