import { useContext, useMemo, useState } from 'react';
import PriceModule from '../../contents/js/account/Price';

// Context
import { UserContext } from '../../App';

// CSS
import '../../contents/css/init/InitCheck.css';
import InitPay from './InitPay';

const InitCheck = ({next, setting}) => {
    // State
    const [checking, setChecking] = useState(false);
    const [terms, setTerms] = useState(false);
    const [agree, setAgree] = useState(false);


    // Context
    const { user } = useContext(UserContext);

    // Memo
    const priceModule = useMemo(() => {
        if(setting?.price) {
            return new PriceModule(setting.price?.name, setting.price.expire);
        } else return null
    }, [setting]);
    const applyPrice = useMemo(() => {
        return priceModule.applyExpirePrice();
    }, [priceModule]);

    const basePrice = useMemo(() => {
        return priceModule.getPrice();
    }, [priceModule]);

    const benefit = useMemo(() => {
        return priceModule.getBenefit();
    }, [priceModule])

    
    const event = {
        pass: function() {
            if(!terms || !agree) return;
            next();
        }
    }

    return (
        <>
            <header>
                <h1>설정 확인</h1>
                <p>설정 내용을 확인해주세요.</p>
            </header>
            <section className="info-frame">
                <h2>쇼핑몰 정보</h2>
                <ul>
                    <li>
                        <h3>쇼핑몰 명</h3>
                        <div>
                            <p>{user?.sname}</p>
                        </div>
                    </li>
                    <li>
                        <h3>쇼핑몰 주소</h3>
                        <div>
                            <p>{user?.domain}</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section className="info-frame">
                <h2>기본 정보</h2>
                <ul>
                    <li>
                        <h3>대표자 성명</h3>
                        <div>
                            <p>{setting?.info?.ceo}</p>
                        </div>
                    </li>
                    <li>
                        <h3>연락처</h3>
                        <div>
                            <p>{setting?.info?.tel}</p>
                        </div>
                    </li>
                    <li>
                        <h3>이메일</h3>
                        <div>
                            <p>{setting?.info?.email}</p>
                        </div>
                    </li>
                    <li>
                        <h3>사업자 번호</h3>
                        <div>
                            <p>{setting?.info?.reg_number || "-"}</p>
                        </div>
                    </li>
                    <li>
                        <h3>사업자 주소지</h3>
                        <div>
                            <p>{setting?.info?.address || "-"}</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section className="info-frame">
                <h2>요금 정보</h2>
                <ul>
                    <li>
                        <h3>요금 명</h3>
                        <div>
                            <p>{setting?.price?.name || "-"}</p>
                        </div>
                    </li>
                    <li>
                        <h3>선결제</h3>
                        <div>
                            <p>{setting?.price?.expire ? `${setting?.price?.expire}개월` : "-"}</p>
                        </div>
                    </li>
                </ul>
                <h2>상세 내용</h2>
                <ul>
                    <li>
                        <h3>기본요금</h3>
                        <div>
                            <p>{setting?.price?.expire > 0 ? "0원" : applyPrice.base.toLocaleString() + "원" || "-"}</p>
                            {
                                setting?.price?.expire > 0 ? 
                                (<p className="ap">(선결제)</p>) : ""
                            }
                        </div>
                    </li>
                    <li>
                        <h3>무료 제공량</h3>
                        <div>
                            <p>{applyPrice.count.toLocaleString() + "회" || "-"}</p>
                        </div>
                    </li>
                    <li>
                        <h3>무료 제공량 이후<br />(1회 당)</h3>
                        <div>
                            <p>{applyPrice.price.toLocaleString() + "원" || "-"}</p>
                        </div>
                    </li>
                    <li>
                        <h3>정보 제공 수익<br />(1회 당)</h3>
                        <div>
                            <p>{applyPrice.income.toLocaleString() + "원" || "-"}</p>
                            <p className="ap">({basePrice.income.toLocaleString()}원 + {benefit.income}원)</p>
                        </div>
                    </li>
                </ul>
            </section>
            {
                setting.price?.expire !== 0 && applyPrice.base > 0 ? (
                    <InitPay base={basePrice.base} pay={applyPrice.base} discount={benefit.discount} expire={setting.price.expire}/>
                ) : null
            }
            <section className="setting-check">
                <h2>설정한 내용이 맞나요?</h2>
                <button className={checking ? 'check' : ""} onClick={() => setChecking(!checking)}>
                    <i className="material-icons">thumb_up</i>
                </button>
            </section>
            <section className={`end-checking ${checking ? "active" : ""}`}>
                <ul>
                    <li className={terms ? 'on' : ""} onClick={() => setTerms(!terms)}>
                        <h2>결제 및 서비스 이용약관<a href="null">약관 보기</a></h2>
                        <i className="material-icons">check</i>
                    </li>
                    <li className={agree ? 'on' : ""} onClick={() => setAgree(!agree)}>
                        <h2>서비스 이용에 대한 비용 부과 내용을 확인 하였으며, 이에 동의합니다.</h2>
                        <i className="material-icons">check</i>
                    </li>
                </ul>
                <button className={terms && agree ? 'on' : ""} onClick={() => event.pass()}>
                    <h2>사이즈리티 시작하기</h2>
                    <i className="material-icons">chevron_right</i>
                </button>
            </section>
            <div className="btn-wrapper">
                <button className="previous" onClick={() => next(-1)}>
                    <p>이전 단계</p>
                </button>
            </div>
        </>
    )
}

export default InitCheck;