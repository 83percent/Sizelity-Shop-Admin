
// CSS
import '../../contents/css/ad2/ADStart.css';

const ADStart = () => {

    const event = {
        month : new Date().getMonth() + 1,
        getMonth : function() {
            return this.month;
        },
        getNextMonth : function() {
            if(this.month <=11) return this.month + 1;
            else return 1;
        }
    }

    return (
        <main className="start">
            <div className="title">
                <h1>광고 시작하기.</h1>
            </div>
            <article className="ways">
                <h2>진행 절차</h2>
                <div>
                    <ul>
                        <li>
                            <p>1. 하단의 진행을 원하는 광고의 <strong>'광고 단가 및 예약 현황'</strong>을 내려받아 주세요.</p>
                        </li>
                        <li>
                            <p>2. 광고 노출을 원하는 성별과 날짜에 광고 <strong>예약이 가능한지 확인</strong>해주세요. </p>
                        </li>
                        <li>
                            <p>3. <a href="http://pf.kakao.com/_xfvrYs" rel="noreferrer" target="_blank">카카오톡 파트너 센터</a> 메뉴에 "광고 문의" 를 눌러주세요.</p>
                        </li>
                        <li>
                            <p>4. 그 후 광고 이미지, 클릭 시 이동할 페이지 링크, 결제와 관련된 내용을 전달해드릴게요.</p>
                        </li>
                    </ul>
                    <p>50% 할인 및 추가 50% 할인 혜택은 자동으로 적용됩니다. :)</p>
                    <p>부가세(10%)가 미포함된 가격입니다.</p>
                </div>
            </article>
            <article className="file">
                <div className="title">
                    <h2>광고 단가 및 예약 현황</h2>
                    <p>하단의 '단가 및 예약 현황' 이외의 날짜에 예약을 희망하는 경우, 문의해주세요.</p>
                </div>
                <section>
                    <div style={{marginRight: "0.5rem"}}>
                        <h3>팝업 배너</h3>
                        <p>하루에 진행되는 광고는 최대 4개입니다.</p>
                        <p>희망하는 날짜와 노출될 성별을 확인하고, 해당 날짜에 예약할 수 있는지 확인해주세요.</p>
                        <p>최소 1일 단위로 예약이 가능합니다.</p>
                        <ul>
                            <li>
                                <p>이번 달</p>
                                <button>{event.getMonth()}월 팝업 배너</button>
                            </li>
                            <li>
                                <p>다음 달</p>
                                <button>{event.getNextMonth()}월 팝업 배너</button>
                            </li>
                        </ul>
                    </div>
                    <div style={{marginLeft: "0.5rem"}}>
                        <h3>상위 노출</h3>
                        <p>희망하는 날짜와 노출될 성별을 확인하고, 해당 날짜에 예약할 수 있는지 확인해주세요.</p>
                        <p>최소 3일 이상 예약이 가능합니다.</p>
                        <ul>
                            <li>
                                <p>이번 달</p>
                                <button>{event.getMonth()}월 상위 노출</button>
                            </li>
                            <li>
                                <p>다음 달</p>
                                <button>{event.getNextMonth()}월 상위 노출</button>
                            </li>
                        </ul>
                    </div>
                </section>
            </article>
            <article className="file">
                <section>
                    <div>
                        <h3>최소 보장 광고</h3>
                        <p>1개월간 최소 7일 ~ 최대 31일의 광고 노출을 보장하며, 보장된 최소 노출 7일을 달성하지 못할 경우, 광고비 전액을 환급해드려요.</p>
                        <p>날짜 지정이 불가능한, 팝업 배너 광고 상품입니다.</p>
                        <p>1개월 단위의 예약이 가능합니다.</p>
                        <ul>
                            <li>
                                <p>1개월 70,000원<br /><i>(부가세 별도)</i></p>
                                <a href="http://pf.kakao.com/_xfvrYs" rel="noreferrer" target="_blank">카카오톡 채널로 신청하기</a>
                            </li>
                        </ul>
                    </div>
                </section>
            </article>
        </main>
    )
}

export default ADStart;