import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PriceModule from '../../../contents/js/account/Price';
import DateFormat from '../../../contents/js/DateFormat';

// CSS
import '../../../contents/css/service/ServicePrice.css';
import { UserContext } from '../../../App';

const ServicePrice = () => {
    const {user} = useContext(UserContext);

    // Memo
    const priceModule = useMemo(() => {
        return new PriceModule(user.price.name, user.price.expire);
    }, [user]);

    const applyPrice = useMemo(() => {
        return priceModule.getPrice();
    }, [priceModule]);

    const benefit = useMemo(() => {
        return priceModule.getBenefit();
    }, [priceModule]);

    return (
        <>
            <p>적용중인 요금제</p>
            <h2>{priceModule.getPriceName()}</h2>
            <section>
                <ul>
                    <li>
                        <h4>기본요금 (월)</h4>
                        <p>{applyPrice.base.toLocaleString()}원</p>
                    </li>
                    <li>
                        <h4>사이즈 비교 무료 제공 (월)</h4>
                        <p>{applyPrice.count.toLocaleString()}회</p>
                    </li>
                    <li>
                        <h4>무료 제공 이후 (1회 당)</h4>
                        <p>{applyPrice.price.toLocaleString()}원</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h4>정보 제공 수익 (1회 당)</h4>
                        <p>{applyPrice.income.toLocaleString()}원</p>
                    </li>
                </ul>
            </section>
            <Link to="/service/price/edit">
                <p>요금제 변경</p>
                <i className="material-icons">chevron_right</i>
            </Link>
            {
                user.price?.expire ? (
                    <>
                    <p>약정</p>
                    <h2>{user.price.expire}개월</h2>
                    <section>
                        <h3>기간</h3>
                        {
                            user.price?.pre_pay?.check ? (
                                <ul>
                                    <li>
                                        <h4>시작 날짜</h4>
                                        <p>{DateFormat.transformDate(user.price.start_date)}</p>
                                    </li>
                                    <li>
                                        <h4>만료 날짜</h4>
                                        <p>{DateFormat.transformDate(user.price.start_date, user.price.expire)}</p>
                                    </li>
                                </ul>
                            ) : (
                                <p>선결제 이후 약정이 적용됩니다.</p>
                            )
                        }
                        </section>
                        {
                                user.price?.pre_pay?.check ? null : (
                                    <Link to="/service/claim/pre">
                                        <p>선결제 확인</p>
                                        <i className="material-icons">chevron_right</i>
                                    </Link>
                                )

                        }
                        <section>
                        <h3>혜택</h3>
                        <ul>
                        {
                            benefit.discount ? (
                                <li>
                                    <h4>기본요금</h4>
                                    <p>- {priceModule.getBenefit().discount}%</p>
                                </li>
                            ) : null
                        }
                        {
                            benefit.income ? (
                                <li>
                                    <h4>정보 제공 수익</h4>
                                    <p>+ {priceModule.getBenefit().income}원</p>
                                </li>
                            ) : null
                        }
                        </ul>

                    </section>
                    </>
                ) : null
            }
        </>
    )
}

export default ServicePrice;    