import { useMemo, useContext } from 'react';

// Context
import { ADUserContext } from './ADMain';

// CSS
import '../../contents/css/ad/ADSettingComponent.css';

const ADPlanSetting = ({applyPlan, minimumPlan=30000}) => {
    
    // Context
    const { ADUser } = useContext(ADUserContext);

    // Memo
    const _acceptMaxPlan = useMemo(() => {
        const plan = Object.entries(ADUser.plan).reduce((acc,e) => {
            return acc += e[1];
        }, 0);
        const {credit=0, freetier=0} = ADUser.pay;
        return (credit+freetier) - plan;
    }, [ADUser]);

    const event = {
        warningTextElement : null,
        setPlan : function(target) {
            const value = Number(target.value);
            if(!value) return;
            if(!this.warningTextElement) this.warningTextElement = this.findWaringFrame(target);
            if(value < minimumPlan) {
                this.toggleWarning(`일일 예산 최소 금액은 ${minimumPlan.toLocaleString()} 입니다.`)
                applyPlan(0);
                return;
            } else if(value > _acceptMaxPlan) {
                this.toggleWarning(`나의 사용가능한 최대 예산은 ${_acceptMaxPlan.toLocaleString()}원 입니다.`);
                applyPlan(0);    
                return false;
            }
            this.toggleWarning(null, false);
            applyPlan(value);
        }, // setPlan(target)
        findWaringFrame : function(target) {
            for(let i=0; i<5; ++i) {
                if(target.nodeName === 'LI') break;
                else target = target.parentElement;
            }
            if(target.nodeName === 'LI') {
                target = target.querySelector("p.warning");
                return target;
            }
            else return null;
        }, // findWaringFrame(target)
        toggleWarning : function(text, toggle) {
            if(toggle === false) {
                this.warningTextElement.innerText = "";
            } else {
                this.warningTextElement.innerText = text;
            }
            
        }, // toggleWarning(text, toggle)
    }
    return (
        <section className="ad-setting-component">
            <div className="input-wrapper">
                <div className="title">
                    <h2>일일 예산 책정</h2>
                </div>
                <ul>
                    <li>
                        <h3><span className="dot"></span>일일 예산</h3>
                        <p>하루동안 생성돤 광고로 소비될 최대 금액을 설정합니다.</p>
                        <p>설정한 일일 예산을 모두 소진 할 경우 광고가 중지되어 설정한 예산을 초과하는 금액이 지출되는 것을 막을 수 있어요.</p>
                        <div className="caution">
                            <h4>예산 책정</h4>
                            <p>최소 책정 금액은 {minimumPlan.toLocaleString()}원 입니다.</p>
                            <p>일일 예산은 '충전 잔액 + 크레딧' 을 합한 금액 보다 클 수 없습니다.</p>
                            <p>총 광고의 예산책정 금액이 '충전 잔액 + 크레딧'을 합한 금액에서 벗어나면 다른 광고의 집행이 중지 될 수 있습니다. (오른쪽 설명란 참조)</p>
                        </div>
                        <div className="input-frame">
                            <input 
                                type="number"
                                placeholder="하루 당 소비될 최대 예산" 
                                onBlur={(e) => event.setPlan(e.target)}/>
                            <p>원</p>
                        </div>
                        <p style={{textAlign: "right", marginTop: "0.3rem", color: "#888"}}>사용가능한 예산 {_acceptMaxPlan.toLocaleString()} 원</p>
                        <p
                            className="warning"
                            style={{textAlign: "right", marginTop: "0.3rem", color: "#dd1818"}}></p>
                    </li>
                </ul>
            </div>
            <article>
                <div className="title">
                    <h2>일일 예산</h2>
                </div>
                <ul>
                    <li>
                        <p>'일일 예산'이란, 광고 입찰을 받아 실제 광고가 진행되는 경우, 소비될 하루 최대 예산 입니다.</p>
                        <p>'일일 예산'을 모두 소진하였을 경우 즉시, 광고 진행이 중단되어 추가 지출 막을 수 있습니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>일일 예산 책정</h3>
                        <p>'일일 예산' 책정은, '충전 잔액 + 크레딧'(이하 '잔액') 을 초과할 수 없습니다.</p>
                        <p>광고 금액 정산을 통해 '충전 잔액' 또는 '크레딧'에 변동이 생겨 책정해 놓은 '일일 예산'이 잔액을 초과할 경우, 다음 날 광고 입찰에 참여 할 수 없게 됩니다.</p>
                        <p></p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>주의 사항(최대 노출 수)</h3>
                        <p>실제 광고 집행이 이루어질 경우 VAT 별도(10%) 로 발생하게 됩니다.</p>
                        <p>이것은 '일일 예산' 대비 노출 횟수 산정 시 영향을 줍니다.</p>
                        <p>Ex) 입찰 희망가 '2,000원', 일일 예산 '100,000원' 으로 입찰 받은 경우.</p>
                        <p>단순 계산 '100,000원 / 2,000원 = 최대 50,000회 노출' 이 아닌, VAT이 발생이 아닌,</p>
                        <p>'100,000원 / (2,000원 + VAT(10%)) = 최대 45,454회 노출' 입니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>주의 사항(예산 우선순위)</h3>
                        <p>책정한 '일일 예산'은 '1.팝업배너, 2.이벤트 상위 노출, 3.상품 추천' 순서로 우선순위가 있습니다.</p>
                        <p>이것은 광고 입찰 참여에 영향을 줄 수 있습니다.</p>
                        <p>Ex) '충전 잔액 + 크레딧' 이 300,000원 이며, '이벤트 상위 노출', '상품 추천' 에 일일 예산으로 100,000원을 책정</p>
                        <p>위 예에서 남은 집행 가능 예산은 100,000원 입니다.</p>
                        <p>'팝업 배너' 광고에 일일 예산으로 100,000원을 책정할 시 모든 광고의 입찰에 참여가 됩니다.</p>
                        <p>하지만 '팝업 배너' 광고에 일일 예산으로 110,000원을 책정할 시 일일 예산을 책정해 놓은 광고 중 우선순위가 가장 낮은 '상품 추천' 광고의 예산에 10,000원의 미수금이 발생하여 '상품 추천'광고의 입찰이 불가능해집니다.</p>
                    </li>
                </ul>
        </article>
        </section>
    )
}
export default ADPlanSetting;