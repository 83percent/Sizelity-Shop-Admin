import { useContext, useMemo, useState } from "react";
import ADPopupModule from '../../../contents/js/ADPopup';


// Context
import { ServerContext, UserContext } from '../../../App';
import { ADUserContext } from './../ADMain';

// Component
import ADPlanSetting from "../ADPlanSetting";
import ADBidSetting from "../ADBidSetting";
import ADBidPreview from "../ADBidPreview";

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
    const { ADUser, setADUser } = useContext(ADUserContext);
    const { user } = useContext(UserContext);


    // Field
    const _copyData = JSON.parse(JSON.stringify(adPopupData));

    const event = {
        imageChange : function(e) {
            e.preventDefault();
            let reader = new FileReader();
            let file = e.target.files[0];
            if(!file) return;
            if(file?.type !== 'image/png') {
                window.alert("'PNG' 파일이 아닙니다.");
                return;
            }
            if(file?.size > 204800) {
                window.alert("이미지가 200KB를 초과합니다.");
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
                _copyData.url = "";
                setADPopupData(_copyData)
                return false;
            } else {
                _copyData.url = value;
                setADPopupData(_copyData)
                return true;
            }
        },
        checkBid : function(value) {
            _copyData.bid = value;
            setADPopupData(_copyData)
            return true;
        },
        checkPlan : function(value) {
            _copyData.plan = value;
            setADPopupData(_copyData)
            return true;
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
                    const _d = JSON.parse(JSON.stringify(ADUser));
                    _d.plan.popup = _d.plan.popup + data.plan;
                    setADUser(_d);
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
                            <li>
                                <h3><span className="dot"></span>타겟</h3>
                                <p>*광고를 노출시킬 타겟을 선택해주세요.</p>
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
            <ADBidPreview maxBidPrice="800"/>
            <ADBidSetting applyBid={event.checkBid} />
            <ADPlanSetting applyPlan={event.checkPlan} />
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