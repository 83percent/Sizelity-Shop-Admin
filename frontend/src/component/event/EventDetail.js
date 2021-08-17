import { useContext, useEffect, useMemo, useRef } from "react";
import { eventDateCheck } from '../../contents/js/DateFormat';
import { UserContext } from '../../App';

const EventDetail = ({activeData, modifyCheck, cardSave, cardRemove}) => {

    // Context
    const {user} = useContext(UserContext);

    // Ref
    const typeRef = useRef(null);
    const frameRef = useRef(null);
    const _activeData = useMemo(() => JSON.parse(JSON.stringify(activeData)), [activeData]);

    const event = {
        setModifyCheck : function() {
            if(!modifyCheck.current) modifyCheck.current = true;
        }, // setModifyCheck
        typeSelect : function(target, value) {
            if(activeData?.data?.type === value) return;
            this.setModifyCheck();

            if(typeRef.current !== null) {
                typeRef.current.classList.remove("active");
            }
            target = target.parentElement;
            if(target.nodeName !== "LABEL") return;
            target.classList.add("active");
            typeRef.current = target;
            
            _activeData.data.type = value;

        }, // typeSelect(target, value)
        setEventName : function(value) {
            this.setModifyCheck();
            _activeData.data.name = value.trim();
        }, // setEventName(value)
        setEventText : function(value) {    
            this.setModifyCheck();
            _activeData.data.text = value.trim();
        }, // setEventText(value)
        setEventURL : function(value) {
            this.setModifyCheck();
            _activeData.data.url = value.trim();
        },
        save : function() {
            if(!modifyCheck.current) {
                window.alert("변경 내용이 없습니다.");
                return;
            }
            const {type:afterType, name:afterName, text:afterText, url:afterURL} = _activeData.data;
            if(!afterType) {
                window.alert("이벤트 종류를 선택해주세요.");
                return;
            }
            if(!afterName) {
                window.alert("이벤트 명을 입력해주세요.");
                return;
            }
            if(!afterURL) {
                window.alert("연결된 페이지를 입력해주세요.");
                return;
            }
            const isURL = ((value) => {
                if(value.indexOf("http") === -1) {
                    value = "http://"+value;
                }
                let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                return regex.test(value);
            })(afterURL);
            if(!isURL) {
                window.alert("연결된 페이지가 주소형식이 아닙니다.\nEx. http://www.example.com");
                return;
            } else {
                
                const host = ((value) => {
                    try {
                        if(value.indexOf("http") === -1) {
                            value = "http://"+value;
                        }
                        let hostname = new URL(value).hostname;
                        
                        let i = hostname.indexOf("www.");
                        let result = i === -1 ? hostname : hostname.slice(i+4, hostname.length);
                        // m. slice
                        let m = result.indexOf("m.");
                        hostname = m === 0 ? result.slice(2,result.length) : result;
                        console.log(hostname)
                        return hostname;
                    } catch {
                        window.alert("연결된 페이지는 주소형식으로 입력해주세요.");
                        return null;
                    }
                })(afterURL);
                if(host !== user.domain) {
                    window.alert(`연결된 페이지는 스팸 차단을 위하여 운영하는 쇼핑몰 안에서만 가능합니다.\n(Ex. 'http(s)://${user.domain}/...')`)
                    return;
                }
            }
            try {
                const _dateFrame = frameRef.current.date
                const result = eventDateCheck(_dateFrame[0].value,_dateFrame[1].value,_dateFrame[2].value);
                if(result.type === 'error') {
                    window.alert(result.msg);
                    return;
                } else {
                    _activeData.data.date = result.date;
                }
            } catch(err) {
                window.alert("문제가 발생했습니다.\n잠시 후 다시 시도해주세요.");
            }
            if(activeData.data._id) {
                // 수정
                const {type:beforeType, name:beforeName, text:beforeText, url:beforeURL, date:beforeDate} = activeData.data;
                const _d = {}
                if(beforeType !== afterType) _d.type = afterType;
                if(beforeName !== afterName) _d.name = afterName;
                if(beforeText !== afterText) _d.text = afterText;
                if(beforeURL !== afterURL) _d.url = afterURL;
                if(new Date(beforeDate).getTime() !== new Date(_activeData.data.date).getTime()) _d.date = _activeData.data.date;

                if(Object.entries(_d).length === 0) {
                    window.alert("변경 내용이 없습니다.");
                    return;
                }
                console.log(_d)
                cardSave({index : activeData.index, id : activeData.data._id, data: _d, isNew : false});
            } else {
                // 추가
                delete _activeData.data.unsave
                cardSave({index : activeData.index, data: _activeData.data, isNew : true});
            }
            modifyCheck.current = false;
        }, // save
    }

    useEffect(() => {
        if(frameRef.current.nodeName === 'SECTION') {
            frameRef.current = {
                name : frameRef.current.querySelector("input[name='name']"),
                text : frameRef.current.querySelector("textarea"),
                url : frameRef.current.querySelector("input[name='url']"),
                date : frameRef.current.querySelectorAll("input[type='number']"),
            }
        }
    }, []);
    useEffect(() => {
        modifyCheck.current = false;
        if(activeData?.data) {
            const { name, text, url, date} = activeData.data;
            // Type
            if(typeRef.current?.nodeName === 'LABEL') {
                typeRef.current.classList.remove("active");
                typeRef.current = typeRef.current.parentElement;
            }
            if(activeData.data?.type) {
                const frame = typeRef.current.querySelector(`input[value=${activeData.data.type}]`);
                if(frame.parentElement.nodeName === "LABEL") {
                    frame.parentElement.classList.add("active");
                    typeRef.current = frame.parentElement;
                }
            }
            // Name
            if(name !== undefined) frameRef.current.name.value = name;
            
            // Text
            if(text !== undefined) frameRef.current.text.value = text;

            // URL
            if(url !== undefined) frameRef.current.url.value = url;

            // Date
            try {
                if(date !== undefined) {
                    const _incomeDate = new Date(date);
                    const frames = frameRef.current.date;
                
                    frames[0].value = _incomeDate.getFullYear();
                    frames[1].value = _incomeDate.getMonth()+1;
                    frames[2].value = _incomeDate.getDate();
                }
            } catch {}
        }
    }, [activeData, modifyCheck]);
    return (
        <>
            <section className="none"></section>
            <section className="detail-wrapper" ref={frameRef}>
                <div className="detail-frame">
                    <div>
                        <div className="title">
                            <h3>이벤트 종류*</h3>
                            <p>진행하려는 이벤트의 종류를 선택해주세요.</p>
                        </div>
                        <div className="input-wrapper" ref={typeRef}>
                            <label>
                                <p>할인</p>
                                <input type="radio" name="type" value="discount" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>무료배송</p>
                                <input type="radio" name="type" value="free" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>쿠폰</p>
                                <input type="radio" name="type" value="coupon" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>적립</p>
                                <input type="radio" name="type" value="saving" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>기타</p>
                                <input type="radio" name="type" value="etc" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="title">
                            <h3>이벤트 명*</h3>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="40자 이하"
                            onBlur={(e) => event.setEventName(e.target.value)}
                            maxLength="40"/>
                    </div>
                    <div>
                        <div className="title">
                            <h3>내용</h3>
                            <p>이벤트 진행 내용을 입력해주세요.</p>
                            <p>간단할수록 좋아요!</p>
                        </div>
                        <textarea
                            placeholder="300자 이하..."
                            defaultValue={_activeData?.data?.text}
                            onBlur={(e) => event.setEventText(e.target.value)}
                            maxLength="300">
                        </textarea>
                    </div>
                    <div>
                        <div className="title">
                            <h3>연결된 페이지*</h3>
                            <p>고객이 이벤트 내용을 누를시 이동할 페이지를 입력해주세요.</p>
                        </div>
                        <input 
                            type="url"
                            name="url"
                            onBlur={(e) => event.setEventURL(e.target.value)}
                            placeholder={`${user?.domain ? "http(s)://www."+user.domain+"/" : "http(s)://example.com/"}`}/>
                    </div>
                    <div>
                        <div className="title">
                            <h3>종료 날짜*</h3>
                            <p>이벤트 종료 날짜를 입력해주세요.</p>
                        </div>
                        <div className="input-wrapper">
                            <input type="number" name="year" placeholder="YYYY" onBlur={() => event.setModifyCheck()}/>
                            <p>/</p>
                            <input type="number" name="month" placeholder="MM" onBlur={() => event.setModifyCheck()}/>
                            <p>/</p>
                            <input type="number" name="day" placeholder="DD" onBlur={() => event.setModifyCheck()}/>
                        </div>
                    </div>
                </div>
                <div className="btn-frame">
                    <button className="delete" onClick={() => cardRemove(activeData?.index, activeData?.data?._id)}>
                        <i className="material-icons">delete</i>
                    </button>
                    <button className="save" onClick={() => event.save()}>
                        <i className="material-icons">save</i>
                    </button>
                </div>
            </section>
        </>
    )
}

export default EventDetail;