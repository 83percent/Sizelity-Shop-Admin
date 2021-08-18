import { useContext, useMemo, useState } from "react";
import ADPopupModule from '../../contents/js/ADPopup';


// Context
import { ServerContext, UserContext } from '../../App';
import { ADUserContext } from './ADMain';

const ADPopupCreate = ({history}) => {
    // State
    const [previewImage, setPreviewImage] = useState(null)
    const [adPopupData, setADPopupData] = useState({
        url : "",
        bid : 0,
        plan : 0
    });

    
    // Context
    const server = useContext(ServerContext);
    const { ADUser } = useContext(ADUserContext);
    const { user } = useContext(UserContext);
    
    // Memo
    const _acceptMaxPlan = useMemo(() => {
        const {popup=0, event=0, product=0} = ADUser.plan;
        const {credit=0, freetier=0} = ADUser.pay;
        return (credit+freetier) - (popup + event + product);
    }, [ADUser]);


    // Field
    const _data = JSON.parse(JSON.stringify(adPopupData));

    const event = {
        imageChange : function(e) {
            e.preventDefault();
            let reader = new FileReader();
            let file = e.target.files[0];
            if(file.type !== 'image/png') {
                window.alert("'PNG' 파일이 아닙니다.");
                return;
            }
            if(file.size > 102400) {
                window.alert("이미지가 100KB를 초과합니다.");
                return;
            } else {
                reader.onloadend = () => {
                  setPreviewImage({file: file, imagePreviewUrl: reader.result});
                };
                reader.readAsDataURL(file);
            }
        }, // imageChange(e)
        checkURL : function(value) {
            if(!value) return;
            const isURL = ((value) => {
                let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                return regex.test(value);
            })(value);
            if(!isURL) {
                window.alert("주소 형식이 올바르지 않습니다.");
                _data.url = "";
                setADPopupData(_data)
                return false;
            } else {
                _data.url = value;
                setADPopupData(_data)
                return true;
            }
        },
        checkBid : function(value) {
            value = Number(value);
            if(!value) return false;
            else {
                if(value < 1400) {
                    window.alert("희망 입찰가는 최소 1,400원 입니다.");
                    _data.bid = 0;
                    setADPopupData(_data);
                    return;
                } else {
                    if(value.toString().split('')[value.toString().length-1] !== '0') {
                        window.alert("10원 단위로 입력해주세요.");
                        _data.bid = 0;
                        setADPopupData(_data);
                        return;
                    }
                    _data.bid = value;
                    setADPopupData(_data)
                    return true;
                }
            }
        },
        checkPlan : function(value) {
            value = Number(value);
            if(!value) return false;
            else {
                if(value < 30000) {
                    window.alert("일일 예산은 최소 30,000원 입니다.");
                    _data.plan = 0;
                    setADPopupData(_data)
                    return false;
                } else if(value > _acceptMaxPlan) {
                    window.alert(`나의 사용가능한 최대 예산은 ${_acceptMaxPlan}`);
                    _data.plan = 0;
                    setADPopupData(_data)
                    return false;
                } else {
                    _data.plan = value;
                    setADPopupData(_data)
                    return true;
                }
            }
        },
        getMaxCount : function( plan, m ) {
            try {
                const result = Math.floor(Number(plan) / Number(m));
                return isFinite(result) ? result : 0;
            } catch {
                return 0;
            }
        }, // getMaxCount( plan, m) -> 예산 / CPM = 최대 노출 수
        send : async function({file, data}) {
            if(!file) {
                window.alert("광고 이미지를 생성해주세요.");
                return;
            } else if(file.size > 204800) {
                window.alert("이미지가 200KB를 초과합니다.");
                return;
            }

            let { url, bid, plan } = data;

            if(!url) {
                window.alert("'연결된 링크'를 입력해주세요.");
                return;
            }
            if(bid === 0) {
                window.alert("'희망 입찰가'를 입력해주세요.")
                return;
            } else {
                bid = (bid + (bid / 10))/1000;
            }
            if(plan === 0) {
                window.alert("'일일 예산'을 입력해주세요.")
                return;
            } else {
                data.maxCount = this.getMaxCount(plan, bid);
            }
            
            const adPopupModule = new ADPopupModule(server);
            const response = await adPopupModule.set({
                file : file,
                info : {
                    url, bid, plan, 
                    maxCount : this.getMaxCount(plan, bid)
                }
            });
            switch(response.type) 
            {
                case 'success' : {
                    history.replace('/advertisement/popup');
                    break;
                }
                case 'error' : {
                    window.alert(response.msg);
                    break;
                }
                default : {
                    window.alert("광고 생성에 실패했습니다.\n잠시 후 시도해주세요.");
                }
            }
        }
    }

    return (
        <section className="create">
            <section>
                <article>
                    <div className="input-wrapper">
                        <div className="title">
                            <h2>광고 생성</h2>
                            <p>팝업 광고를 시작하기 위해 광고를 생성합니다.</p>
                            <p>아래 형식에 맞게 생성해주세요.</p>
                        </div>
                        <ul>
                            <li>
                                <h3><span className="dot"></span>이미지</h3>
                                <p>*200kb 이하의 1:1 비율의 이미지를 등록해주세요.</p>
                                <p>파일 형식 : '.png'</p>
                                <label className="input-image">
                                    <p>광고 이미지 등록</p>
                                    <input 
                                        type="file" 
                                        accept="image/png"
                                        onChange={(e) => event.imageChange(e)}/>
                                </label>
                            </li>
                            <li>
                                <h3><span className="dot"></span>연결된 링크</h3>
                                <p>*팝업 배너를 누를 시 이동하려는 링크를 입력해주세요.</p>
                                <input 
                                    type="url"
                                    placeholder={`http(s)://www.${user?.domain}/...`}
                                    onBlur={(e) => event.checkURL(e.target.value)}
                                    className="input-link"/>
                            </li>
                        </ul>
                    </div>
                    <div className="explain-wrapper">
                        <div className="title">
                            <h2>미리보기</h2>
                            <p>이미지는 1:1 비율로 표시됩니다.</p>
                            <p>비율에서 벗어난 이미지는 가운데를 기준으로 양방향의 이미지가 잘립니다.</p>
                        </div>
                        <div className="preview">
                            {
                                previewImage?.imagePreviewUrl ? (
                                    <img src={previewImage.imagePreviewUrl} alt="preview"/>
                                ) : (<div></div>)
                            }
                        </div>
                    </div>
                </article>
            </section>
            <section>
                <article>
                    <div className="input-wrapper">
                        <div className="title">
                            <h2>광고 입찰</h2>
                        </div>
                        <ul>
                            <li>
                                <h3><span className="dot"></span>입찰 희망가</h3>
                                <div className="caution">
                                    <h4>가격 책정</h4>
                                    <p>최소 희망가는 1,400원 입니다. (노출 당 1.4원)</p>
                                    <p>10원 단위로 입력해주세요. (잘못된 예 : 1,628원 / 올바른 예 : 1,620원)</p>
                                    <p>CPM(1,000번 노출 당)을 기준으로 합니다. (입찰 희망가 1,620원 = 노출 당 1.62원)</p>
                                    <p>VAT 별도 (10%)</p>
                                </div>
                                <div className="input-bid">
                                    <input 
                                        type="number"
                                        placeholder="1000번 노출 당 희망가"
                                        onBlur={(e) => event.checkBid(e.target.value)}/>
                                    <p>원</p>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <div className="explain-wrapper">
                        <div className="title">
                            <h2>광고 입찰 방식이 어떻게 되나요?</h2>
                        </div>
                        <ul>
                            <li>
                                <p>제출하신 '입찰 희망가'를 기준으로 상위 3개의 광고에 실제 광고 집행이 이루어집니다.</p>
                                <p>상위 3개의 광고를 제외한 상위 10개의 '입찰 희망가'를 제출한 광고의 경우 '예비 입찰 번호'가 부여됩니다.</p>
                            </li>
                            <li>
                                <h3><span className="dot"></span>입찰 희망가</h3>
                                <p>'입찰 희망가'란, 광고 집행자가 책정을 희망하는 CPM 금액입니다.</p>
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
                    </div>
                </article>
            </section>
            <section>
                <article>
                    <div className="input-wrapper">
                        <div className="title">
                            <h2>일일 예산 책정</h2>
                        </div>
                        <ul>
                            <li>
                                <h3><span className="dot"></span>일일 예산</h3>
                                <p>하루에 팝업 광고로 소비될 최대 금액을 책정합니다.</p>
                                <p>책정한 일일 예산을 모두 소진 할 경우 광고 집행이 자동으로 중지됩니다.</p>
                                <div className="caution">
                                    <h4>예산 책정</h4>
                                    <p>최소 책정 금액은 30,000원 입니다.</p>
                                    <p>일일 예산은 '충전 잔액 + 크레딧' 을 합한 금액 보다 클 수 없습니다.</p>
                                    <p>총 광고의 예산책정 금액이 '충전 잔액 + 크레딧'을 합한 금액에서 벗어나면 다른 광고의 집행이 중지 될 수 있습니다. (오른쪽 설명란 참조)</p>
                                </div>
                                <div className="input-bid">
                                    <input 
                                        type="number"
                                        placeholder="하루 당 소비될 최대 예산" 
                                        onBlur={(e) => event.checkPlan(e.target.value)}/>
                                    <p>원</p>
                                </div>
                                <p style={{textAlign: "right", marginTop: "0.3rem", color: "#888"}}>사용가능한 예산 {_acceptMaxPlan.toLocaleString()} 원</p>
                            </li>
                        </ul>
                    </div>
                    <div className="explain-wrapper">
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
                                <p>'100,000원 / (2,000원 + VAT(200원)) = 최대 45,454회 노출' 입니다.</p>
                            </li>
                            <li>
                                <h3><span className="dot"></span>주의 사항(예산 우선순위)</h3>
                                <p>책정한 '일일 예산'은 '팝업배너 - 이벤트 상위 노출 - 상품 추천' 순서로 우선순위가 있습니다.</p>
                                <p>이것은 광고 입찰 참여에 영향을 줄 수 있습니다.</p>
                                <p>Ex) '충전 잔액 + 크레딧' 이 300,000원 이며, '이벤트 상위 노출', '상품 추천' 에 일일 예산으로 100,000원을 책정</p>
                                <p>위 예에서 남은 집행 가능 예산은 100,000원 입니다.</p>
                                <p>'팝업 배너' 광고에 일일 예산으로 100,000원을 책정할 시 모든 광고의 입찰에 참여가 됩니다.</p>
                                <p>하지만 '팝업 배너' 광고에 일일 예산으로 110,000원을 책정할 시 일일 예산을 책정해 놓은 광고 중 우선순위가 가장 낮은 '상품 추천' 광고의 예산에 10,000원의 미수금이 발생하여 '상품 추천'광고의 입찰이 불가능해집니다.</p>
                            </li>
                        </ul>
                    </div>
                </article>
            </section>
            <section>
                <article>
                    <div className="create-wrapper input-wrapper">
                        {
                            ADUser ? (
                                <ul className="result-frame">
                                    <h2>입찰 시 일일 최대 광고 노출 수</h2>
                                    <li>
                                        <div>
                                            <p>책정된 예산</p>
                                            <h3>{adPopupData.plan.toLocaleString()}</h3>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p>입찰 희망 가(VAT 포함)</p>
                                            <h3>{(adPopupData.bid + (adPopupData.bid / 10)).toLocaleString()}</h3>
                                        </div>
                                        <div>
                                            <p>1회 노출 당(VAT 포함)</p>
                                            <h3>{((adPopupData.bid + (adPopupData.bid / 10))/1000).toLocaleString()}</h3>
                                        </div>
                                    </li>
                                    <div></div>
                                    <li>
                                        <div>
                                            <p>최대 노출 수</p>
                                            <h3>{event.getMaxCount(adPopupData.plan, ((adPopupData.bid + (adPopupData.bid / 10))/1000))}</h3>
                                        </div>
                                    </li>
                                </ul>
                            ) : null
                        }
                        <p>광고 생성 전 <strong>오른쪽 '주의사항'</strong>을 읽어주세요. </p>
                        <button onClick={() => event.send({file : previewImage?.file, data : adPopupData})}>광고 생성</button>
                    </div>
                    <div className="explain-wrapper">
                        <div className="title">
                            <h2>주의 사항</h2>
                        </div>
                        <ul>
                            <li>
                                <h3><span className="dot"></span>광고 개제</h3>
                                <p>입찰을 통해 이루어지는 광고는 하루 단위의 광고입니다.</p>
                                <p>즉, 오늘 입찰된 광고의 경우 다음날 입찰이 되지 않는 경우 광고가 개제되지 않습니다.</p>
                                <p>생성된 광고에 입력된 '입찰 희망가'와 '일일 예산'으로 매일 자동으로 입찰에 참여하게 됩니다.</p>
                            </li>
                            <li>
                                <h3><span className="dot"></span>자동 입찰 참여</h3>
                                <p>생성된 광고는 매일 (한국시간) 매일 04시에 자동으로 진행됩니다.</p>
                                <p>자동 입찰을 막기 위해서는 광고 상태를 비활성화하거나, 삭제해야합니다.</p>
                            </li>
                            <li>
                                <h3><span className="dot"></span>수정</h3>
                                <p>입찰된 후 입찰된 광고의 '이미지', '링크'와 '입찰 희망가', '일일 예산' 모두 수정되어도 입찰된 광고에 반영되지 않습니다.</p>
                                <p>입찰 이후 수정된 내용은 다음날 입찰 참여에 반영됩니다.</p>
                            </li>
                            <li>
                                <h3><span className="dot"></span>입찰 포기</h3>
                                <p>입찰 후 진행되고 있는 광고의 중도포기는 특별한 사유가 있지 않는 한 불가합니다.</p>
                            </li>
                        </ul>
                    </div>
                </article>
            </section>
        </section>
    )
}

export default ADPopupCreate;