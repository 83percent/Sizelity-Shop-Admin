import { useContext, useEffect, useMemo, useRef, useState } from "react";
import PriceModule from '../../../contents/js/account/Price';

import { UserContext } from '../../../App';

const PriceEdit = () => {
    // Ref
    const price_wrapper = useRef(null);
    const expire_wrapper = useRef(null);

    // Context
    const {user} = useContext(UserContext);

    // State
    const [option, setOption] = useState({price: user.price.name, expire: user.price.expire});

    // Memo
    const priceModule = useMemo(() => {
        return new PriceModule(user.price.name, user.price.expire);
    }, [user]);

    const choice = {
        price : function(target, value) {
            if(option?.price === value) return;
            const __before = price_wrapper.current.querySelector(".select");
            if(__before) {
                __before.classList.remove("select");
            }
            
            for(let i=0; i<3; i++) {
                if(target.nodeName === 'LI') {
                    target.classList.add("select");
                    setOption({price: value, expire: option.expire});
                    break;
                } else target = target.parentElement;
            }
        },
        expire : function(target, value) {
            if(option.expire === value) return;
            const __before = expire_wrapper.current.querySelector(".select");
            if(__before) {
                __before.classList.remove("select");
            }

            if(value > 0 && option?.price === 'basic') {
                return window.alert("베이직 요금은 기본요금 선결제를 설정할 수 없습니다.");
            }
            
            for(let i=0; i<3; i++) {
                if(target.nodeName === 'LI') {
                    target.classList.add("select");
                    setOption({price: option.price, expire: value});
                    break;
                } else target = target.parentElement;
            }
        }
    }
    useEffect(() => {
        const name = user.price?.name;
        const expire = user.price?.expire;
        
        if(name) {
            const frame = price_wrapper.current.querySelector(`input[value='${name}']`);
            try {
                if(frame && frame?.parentElement.nodeName === "LI") {
                    frame.parentElement.classList.add("select");
                }
            } catch {}
        }
        if(!isNaN(expire) && [0,3,6,12].includes(expire)) {
            const frame = expire_wrapper.current.querySelector(`input[value='${expire}']`);
            try {
                if(frame && frame?.parentElement.nodeName === "LI") {
                    frame.parentElement.classList.add("select");
                }
            } catch {}
        }
    }, [user])
    return (
        <>
            <p>현재 요금제</p>
            <h2>{priceModule.getPriceName()}</h2>
            <div className="price-list">
                <ul ref={price_wrapper}>
                    <li>
                        <h3>요금제 명</h3>
                        <p>기본요금 (월)</p>
                        <p>사이즈 비교 무료 제공 (월)</p>
                        <p>무료 제공 이후 (1회)</p>
                        <p>정보 제공 수익 (1회)</p>
                    </li>
                    <li onClick={e => choice.price(e.target, 'basic')}>
                        <h3>베이직</h3>
                        <p>0원</p>
                        <p>0회</p>
                        <p>1.2원</p>
                        <p>0.4원</p>
                        <input type="hidden" name="price" value="basic" />
                    </li>
                    <li onClick={e => choice.price(e.target, 'standard')}>
                        <h3>스탠다드</h3>
                        <p>9,900원</p>
                        <p>20,000회</p>
                        <p>1.2원</p>
                        <p>0.4원</p>
                        <input type="hidden" name="price" value="standard" />
                    </li>
                    <li onClick={e => choice.price(e.target, 'deluxe')}>
                        <h3>디럭스</h3>
                        <p>49,000원</p>
                        <p>100,000회</p>
                        <p>1.1원</p>
                        <p>0.4원</p>
                        <input type="hidden" name="price" value="deluxe" />
                    </li>
                    <li onClick={e => choice.price(e.target, 'premium')}>
                        <h3>프리미엄</h3>
                        <p>99,000원</p>
                        <p>200,000회</p>
                        <p>0.9원</p>
                        <p>0.5원</p>
                        <input type="hidden" name="price" value="premium" />
                    </li>
                </ul>
                <div>
                    <p>(부가세 10% 미포함)</p>
                </div>
            </div>
            <div className="expire">
                <div className="title">
                    <h2>기본요금 선결제 설정</h2>
                    <p>일정 기간 기본요금 선결제를 설정합니다. 기간에 따라 혜택을 제공합니다.</p>
                </div>
                <ul ref={expire_wrapper}>
                    <li onClick={e => choice.expire(e.target, 0)}>
                        <h3>미지정</h3>
                        <input type="hidden" name="expire" value="0" />
                    </li>
                    <li onClick={e => choice.expire(e.target, 3)}>
                        <h3>3 개월</h3>
                        <p>기본 요금 - 5%</p>
                        <input type="hidden" name="expire" value="3" />
                    </li>
                    <li onClick={e => choice.expire(e.target, 6)}>
                        <h3>6 개월</h3>
                        <p>기본 요금 - 10%</p>
                        <p>정보 제공 수익 + 0.05원</p>
                        <p>이벤트 상위 노출 광고 1개월 무료</p>
                        <input type="hidden" name="expire" value="6" />
                    </li>
                    <li onClick={e => choice.expire(e.target, 12)}>
                        <h3>12 개월</h3>
                        <p>기본 요금 - 20%</p>
                        <p>정보 제공 수익 + 0.1원</p>
                        <p>이벤트 상위 노출 광고 3개월 무료</p>
                        <input type="hidden" name="expire" value="12" />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PriceEdit;