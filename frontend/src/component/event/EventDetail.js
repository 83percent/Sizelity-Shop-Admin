import { useContext, useEffect, useMemo, useRef } from "react";
import { eventDateCheck } from '../../contents/js/DateFormat';
import { UserContext } from '../../App';

const EventDetail = ({activeData, modifyCheck, cardSave, cardRemove}) => {

    // Context
    const {user} = useContext(UserContext);

    // Ref
    const typeRef = useRef(null);
    const targetRef = useRef(null);
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
        targetSelect : function(target, value) {
            if(activeData?.data?.target === value) return;
            this.setModifyCheck();

            if(targetRef.current !== null) {
                targetRef.current.classList.remove("active");
            }
            target = target.parentElement;
            if(target.nodeName !== "LABEL") return;
            target.classList.add("active");
            targetRef.current = target;
            
            _activeData.data.target = value;
        }, // targetSelect(target, value)
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
                window.alert("?????? ????????? ????????????.");
                return;
            }
            const {type:afterType, target:afterTarget,name:afterName, text:afterText, url:afterURL} = _activeData.data;
            if(!afterType) {
                window.alert("????????? ????????? ??????????????????.");
                return;
            }
            if(!afterTarget) {
                window.alert("????????? ????????? ??????????????????.");
                return;
            }
            if(!afterName) {
                window.alert("????????? ?????? ??????????????????.");
                return;
            }
            if(!afterURL) {
                window.alert("????????? ???????????? ??????????????????.");
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
                window.alert("????????? ???????????? ??????????????? ????????????.\nEx. http://www.example.com");
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
                        window.alert("????????? ???????????? ?????????????????? ??????????????????.");
                        return null;
                    }
                })(afterURL);
                if(host !== user.domain) {
                    window.alert(`????????? ???????????? ?????? ????????? ????????? ???????????? ????????? ???????????? ???????????????.\n(Ex. 'http(s)://${user.domain}/...')`)
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
                window.alert("????????? ??????????????????.\n?????? ??? ?????? ??????????????????.");
            }
            if(activeData.data._id) {
                // ??????
                const {type:beforeType, target:beforeTarget,name:beforeName, text:beforeText, url:beforeURL, date:beforeDate} = activeData.data;
                const _d = {}
                if(beforeType !== afterType) _d.type = afterType;
                if(beforeTarget !== afterTarget) _d.target = afterTarget;
                if(beforeName !== afterName) _d.name = afterName;
                if(beforeText !== afterText) _d.text = afterText;
                if(beforeURL !== afterURL) _d.url = afterURL;
                if(new Date(beforeDate).getTime() !== new Date(_activeData.data.date).getTime()) _d.date = _activeData.data.date;

                if(Object.entries(_d).length === 0) {
                    window.alert("?????? ????????? ????????????.");
                    return;
                }
                console.log(_d)
                cardSave({index : activeData.index, id : activeData.data._id, data: _d, isNew : false});
            } else {
                // ??????
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
            // Target
            if(targetRef.current?.nodeName === 'LABEL') {
                targetRef.current.classList.remove("active");
                targetRef.current = targetRef.current.parentElement;
            }
            if(activeData.data?.target) {
                const frame = targetRef.current.querySelector(`input[value=${activeData.data.target}]`);
                if(frame.parentElement.nodeName === "LABEL") {
                    frame.parentElement.classList.add("active");
                    targetRef.current = frame.parentElement;
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
            <section className="detail-wrapper">
                <div className="detail-frame">
                    <div>
                        <h2>????????? ?????? ??????</h2>
                    </div>
                    <div>
                        <div className="title">
                            <h3>????????? ??????*</h3>
                            <p>??????????????? ???????????? ????????? ??????????????????.</p>
                        </div>
                        <div className="input-wrapper" ref={typeRef}>
                            <label>
                                <p>??????</p>
                                <input type="radio" name="type" value="discount" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>????????????</p>
                                <input type="radio" name="type" value="free" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>??????</p>
                                <input type="radio" name="type" value="coupon" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>??????</p>
                                <input type="radio" name="type" value="saving" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>??????</p>
                                <input type="radio" name="type" value="etc" onClick={(e) => event.typeSelect(e.target, e.target.value)}/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="title">
                            <h3>??????*</h3>
                            <p>???????????? ????????? ????????? ??????????????????.</p>
                        </div>
                        <div className="input-wrapper" ref={targetRef}>
                            <label>
                                <p>??????</p>
                                <input type="radio" name="target" value="male" onClick={(e) => event.targetSelect(e.target, e.target.value)}/>
                            </label>
                            <label>
                                <p>??????</p>
                                <input type="radio" name="target" value="female" onClick={(e) => event.targetSelect(e.target, e.target.value)}/>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            <section className="none"></section>
            <section className="detail-wrapper"  ref={frameRef}>
                <div className="detail-frame">
                    <div>
                        <h2>????????? ????????????</h2>
                    </div>
                    <div>
                        <div className="title">
                            <h3>????????? ???*</h3>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="40??? ??????"
                            onBlur={(e) => event.setEventName(e.target.value)}
                            maxLength="40"/>
                    </div>
                    <div>
                        <div className="title">
                            <h3>??????</h3>
                            <p>????????? ?????? ????????? ??????????????????.</p>
                            <p>??????????????? ?????????!</p>
                        </div>
                        <textarea
                            placeholder="300??? ??????..."
                            defaultValue={_activeData?.data?.text}
                            onBlur={(e) => event.setEventText(e.target.value)}
                            maxLength="300">
                        </textarea>
                    </div>
                    <div>
                        <div className="title">
                            <h3>????????? ?????????*</h3>
                            <p>????????? ????????? ????????? ????????? ????????? ???????????? ??????????????????.</p>
                        </div>
                        <input 
                            type="url"
                            name="url"
                            onBlur={(e) => event.setEventURL(e.target.value)}
                            placeholder={`${user?.domain ? "http(s)://www."+user.domain+"/" : "http(s)://example.com/"}`}/>
                    </div>
                    <div>
                        <div className="title">
                            <h3>?????? ??????*</h3>
                            <p>????????? ?????? ????????? ??????????????????.</p>
                            <p>????????? ????????? ????????? ??????????????? ?????? ?????????. ??????, ????????? ????????? ?????? ???????????? ????????????.</p>
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