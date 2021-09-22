import { memo, useContext, useMemo, useRef, useState } from 'react';
import DateFormat from '../../../contents/js/DateFormat';
import ADEventModule from '../../../contents/js/ADEvent';


// Context
import { ServerContext, UserContext } from '../../../App';

// Component
import Preview from './ADEventPreview';
import ADBidSetting from '../ADBidSetting';
import ADPlanSetting from '../ADPlanSetting';
import ADBidPreview from '../ADBidPreview';
import ADMaxCountPreview from '../ADMaxCountPreview';
import ADCreateBtn from '../ADCreateBtn';

// CSS
import '../../../contents/css/ad/event/ADEventCreate.css';

let adEventModule = null;

const ADEventCreate = () => {
    // State
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState({
        url : "",
        target : "",
        type : "",
        bid : 0,
        plan : 0,
        expire : ""
    });

    const _copyData = useMemo(() => {
        return JSON.parse(JSON.stringify(data));
    }, [data])

    // Context
    const server = useContext(ServerContext);
    const { user } = useContext(UserContext);

    // Ref
    const dateFrameRef = useRef(null);

    const event = {
        imageChange : function(e) {
            e.preventDefault();
            
            let reader = new FileReader();
            let file = e.target.files[0];
            if(!file) return;
            if(file?.type !== 'image/png') {
                window.alert("'PNG' 파일이 아닙니다.");
                setPreviewImage(null);
                return;
            }
            if(file?.size > 204800) {
                window.alert("이미지가 200KB를 초과합니다.");
                setPreviewImage(null);
                return;
            } else {
                reader.onloadend = () => {  
                  setPreviewImage({file: file, imagePreviewUrl: reader.result});
                };
                reader.readAsDataURL(file);
            }
        }, // imageChange(e)
        checkURL : function(target, value="") {
            if(value.length < 10) return false;
            const isURL = ((value) => {
                let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                return regex.test(value);
            })(value);
            if(!isURL) {
                target.classList.add('wrong');
                _copyData.url = "";
                window.alert("주소 형식이 맞지 않습니다.");
                return false;
            } else {
                target.classList.remove('wrong');
                _copyData.url = value;
                return true;
            }
        }, // checkURL(value)
        targetChange: function(target, value) {
            console.log(value)
            target.parentElement.querySelector("li.on")?.classList.remove("on")
            target.classList.add("on");
            _copyData.target = value;
        }, // targetChange(target, value)
        typeChange : function(target, value) {
            target.parentElement.querySelector("li.on")?.classList.remove("on")
            target.classList.add("on");
            _copyData.type = value;
        }, // typeChange(target, value)
        dateChange : function(wrapper) {
            const frame = wrapper.querySelectorAll("input[type='number']");
            const check = DateFormat.eventDateCheck(frame[0].value,frame[1].value,frame[2].value);
            if(check === false) _copyData.expire = "";
            else {
                _copyData.expire = check;
            }
        }, // dateChange(type, value)
        apply : function(root, data) {
            if(root === undefined) return false;
            const {target, type, url, expire} = data;
            
            

            // type Check
            if(!type) {
                root.querySelector("li.type-wrapper")?.classList.add("wrong");
                window.alert("카테고라를 선택해주세요.");
                return false;
            } else {
                root.querySelector("li.type-wrapper")?.classList.remove("wrong");
            }

            // Image Check
            if(!previewImage) {
                root.querySelector("li.image-wrapper")?.classList.add("wrong");
                window.alert("광고 이미지를 등록해주세요.");
                return false;
            } else {
                root.querySelector("li.image-wrapper")?.classList.remove("wrong");
            }

            // Check URL
            if(!url) {
                root.querySelector("li.url-wrapper")?.classList.add("wrong");
                window.alert("연결된 링크를 입력해주세요.");
                return false;
            } else {
                root.querySelector("li.url-wrapper")?.classList.remove("wrong");
            }

            // expire Check
            if(!expire) {
                root.querySelector("li.expire-wrapper")?.classList.add("wrong");
                window.alert("이벤트 종료 날짜를 입력해주세요.");
                return false;
            } else {
                if(expire.type === 'error') {
                    root.querySelector("li.expire-wrapper")?.classList.add("wrong");
                    window.alert(expire.msg);
                    return false;
                }
                if(expire.type === 'success') {
                    _copyData.expire = expire.date;
                }
                root.querySelector("li.expire-wrapper")?.classList.remove("wrong");
            }
            // Target Check
            if(!target || !['male', 'female'].includes(target)) {
                root.querySelector("li.target-wrapper")?.classList.add("wrong");
                window.alert("노출 대상을 선택해주세요.");
                return false;
            } else {
                root.querySelector("li.target-wrapper")?.classList.remove("wrong");
            }
            setData(JSON.parse(JSON.stringify(_copyData)));
        }, // apply()
        setBid : function(value) {
            _copyData.bid = value;
            setData(JSON.parse(JSON.stringify(_copyData)));
        }, // setBid(value)
        setPlan : function(value) {
            _copyData.plan = value;
            setData(JSON.parse(JSON.stringify(_copyData)));
        }, // setPlan(value)
        createSendData : function(data) {
            const {type, url, target, expire, bid, plan} = data;
            console.table(data)
            console.log(bid, plan)
            const sendData = {
                info : {},
                config : {}
            };
            if(!type || !url || !target || !bid || !plan) {
                window.alert("위 내용에 오류가 있습니다.");
                return null;
            } else {
                sendData.info = {type, url};
                sendData.config = {target, bid, plan};
                sendData.config.maxCount =  Math.floor(Number(plan) / Number(((bid + (bid / 10))/1000)));
            }
            console.log("기간 : ",expire)
            if(!expire) {
                window.alert("이벤트 종료 날짜를 확인하세요.");
                return null;
            } else {
                sendData.info.expire = expire;
            }
            return sendData;
        },
        test : function() {
            
        },
        send : async function() {
            const _sendData = event.createSendData(data);
            if(_sendData === null) return;
            if(!previewImage) {
                window.alert("광고 이미지를 등록해주세요.");
                return;
            }
            console.log(_sendData);
            if(!adEventModule) adEventModule = new ADEventModule(server);
            adEventModule.set({event: _sendData ,image: previewImage})
        }
    }

    return (
        <section className="create">
            <section>
                <div>   
                    <div className="title">
                        <h2>광고 생성</h2>
                        <p>이벤트 상위 노출 광고를 시작하기 위해 광고를 생성합니다.</p>
                        <p>아래 형식에 맞게 입력해주세요.</p>
                    </div>
                    <ul style={{marginBottom:"2rem"}}>
                        <li className="type-wrapper">
                            <h3><span className="dot"></span>이벤트 종류*</h3>
                            <p>광고가 상위 노출될 카테고리를 선택해주세요.</p>
                            <p>'전체'는 모든 이벤트를 모아보는 '전체' 탭을 뜻합니다.</p>
                            <ul className="select-frame">
                                <li onClick={(e) => event.typeChange(e.target, "discount")}>할인</li>
                                <li onClick={(e) => event.typeChange(e.target, "free")}>무료배송</li>
                                <li onClick={(e) => event.typeChange(e.target, "coupon")}>쿠폰</li>
                                <li onClick={(e) => event.typeChange(e.target, "saving")}>적립</li>
                                <li onClick={(e) => event.typeChange(e.target, "etc")}>기타</li>
                            </ul>
                        </li>
                        <li className="image-wrapper">
                            <h3><span className="dot"></span>이미지*</h3>
                            <p>*200kb 이하의 16:9 비율의 이미지를 등록해주세요.</p>
                            <p>파일 형식 : '.png'</p>
                            <label className="input-image">
                                <p>광고 이미지 등록</p>
                                <input 
                                    type="file" 
                                    accept="image/png"
                                    style={{display:"none"}}
                                    onChange={(e) => event.imageChange(e)}/>
                            </label>
                        </li>
                        <li className="url-wrapper">
                            <h3><span className="dot"></span>연결된 페이지*</h3>
                            <p>고객이 이벤트 내용을 누를 시 이동할 페이지의 주소를 입력해주세요.</p>
                            <input
                                type="url"
                                placeholder={`http(s)://www.${user?.domain}/...`}
                                onBlur={(e) => event.checkURL(e.target ,e.target.value)}
                                className="input-link"/>
                        </li>
                        <li className="expire-wrapper">
                            <h3><span className="dot"></span>종료 날짜</h3>
                            <p>이벤트 종료 날짜를 입력해주세요.</p>
                            <p>최소 0일, 최대 1년 입력이 가능합니다.</p>
                            <div className="date-wrapper" ref={dateFrameRef}>
                                <input type="number" name="year" onBlur={() => event.dateChange(dateFrameRef.current)} placeholder="YYYY"/>
                                <p>/</p>
                                <input type="number" name="month" onBlur={() => event.dateChange(dateFrameRef.current)} placeholder="MM"/>
                                <p>/</p>
                                <input type="number" name="day" onBlur={() => event.dateChange(dateFrameRef.current)} placeholder="DD"/>
                            </div>
                        </li>
                    </ul>
                    <div className="title">
                        <h2>광고 설정</h2>
                        <p>생성된 광고의 타겟과 노출 될 탭을 설정합니다.</p>
                    </div>
                    <ul>
                        <li className="target-wrapper">
                            <h3><span className="dot"></span>광고 타겟*</h3>
                            <p>광고를 노출할 대상을 선택해주세요.</p>
                            <ul className="select-frame">
                                <li onClick={(e) => event.targetChange(e.target, "male")}>남자</li>
                                <li onClick={(e) => event.targetChange(e.target, "female")}>여자</li>
                            </ul>
                        </li>
                    </ul>
                    <button onClick={(e) => event.apply(e.target.parentElement, _copyData)}>적용</button>
                </div>
                <article>
                    <div className="title">
                        <h2>미리보기</h2>
                        <p>생성될 광고의 미리보기 입니다.</p>
                    </div>
                    <Preview imageURL={previewImage?.imagePreviewUrl} data={data} user={user}/>
                </article>
            </section>
            <ADBidPreview maxBidPrice="800"/>
            <ADBidSetting applyBid={event.setBid}/>
            <ADPlanSetting applyPlan={event.setPlan}/>
            <ADMaxCountPreview bid={data.bid} plan={data.plan} />
            <ADCreateBtn saveFunction={event.send}/>
        </section>
    )
}

export default memo(ADEventCreate);