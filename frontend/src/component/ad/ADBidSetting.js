// CSS

const ADBidSetting = ({applyBid, minimumBid=800}) => {
    

    const event = {
        warningTextElement : null,
        checkBid : function(target) {
            const value = Number(target.value);
            if(!value) return;
            if(!this.warningTextElement) this.warningTextElement = this.findWaringFrame(target);
            if(value < minimumBid) {
                this.toggleWarning(`입찰 희망가 는 최소 ${minimumBid.toLocaleString()}원 입니다.`)
                applyBid(0);
                return;
            }
            if(value.toString().split('')[value.toString().length-1] !== '0') {
                this.toggleWarning("10원 단위로 입력해주세요.");
                applyBid(0);
                return;
            }
            this.toggleWarning(null, false);
            applyBid(value);
        }, // CheckBid(target)
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
                    <h2>광고 입찰</h2>
                </div>
                <ul>
                    <li>
                        <h3><span className="dot"></span>입찰 희망가</h3>
                        <div className="caution">
                            <h4>희망가 책정</h4>
                            <p>최소 희망가는 {minimumBid.toLocaleString()}원 입니다. (노출 당 {minimumBid/1000}원)</p>
                            <p>10원 단위로 입력해주세요. (잘못된 예 : 1,628원 / 올바른 예 : 1,620원)</p>
                            <p>CPM(1,000번 노출 당)을 기준으로 합니다. (입찰 희망가 1,620원 = 노출 당 1.62원)</p>
                            <p style={{color: "#dd1818"}}>VAT 별도 (10%)</p>
                        </div>
                        <div className="input-frame">
                            <input 
                                type="number"
                                placeholder="1000번 노출 당 희망가"
                                onBlur={(e) => event.checkBid(e.target)}/>
                            <p>원</p>
                        </div>
                        <p
                            className="warning"
                            style={{textAlign: "right", marginTop: "0.3rem", color: "#dd1818"}}></p>
                    </li>
                </ul>
            </div>
            <article>
                <div className="title">
                    <h2>광고 입찰 방식이 어떻게 되나요?</h2>
                </div>
                <ul>
                    <li>
                        <p>여러 곳에서 제출된 '입찰 희망가'를 모아 가장 높은 금액을 제출한 3개의 광고에 실제 광고 집행이 이루어집니다.</p>
                        <p>상위 3개의 광고를 제외한 상위 6개의 광고에 '예비 입찰 번호'가 부여됩니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>입찰 희망가</h3>
                        <p>'입찰 희망가'란, 광고 집행자가 책정을 희망하는 CPM(1,000회 노출 당) 금액입니다.</p>
                        <p>입력하신 '입찰 희망가'로 실제 광고 집행의 우선순위가 책정됩니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>'예비 입찰 번호'가 무엇인가요?</h3>
                        <p>실제 광고가 진행 중인 상위 3개의 광고에서 책정한 '일일 예산 초과' 또는 '문제 발생'으로 인해 광고집행에 문제가 발생하였을 경우, 부여된 '예비 입찰 번호'의 순서대로 광고 집행이 시작됩니다.</p>
                    </li>
                    <li>
                        <h3><span className="dot"></span>같은 입찰 희망가가 제출된 경우 우선순위는 어떻게 책정되나요?</h3>
                        <p>'일일 예산 책정 금액'을 기준으로 우선순위를 부여합니다.</p>
                        <p>'일일 예산 책정 금액'도 같은 경우, '충전 잔액 + 크레딧' 기준으로 높은 순서대로 우선순위를 부여합니다.</p>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default ADBidSetting;