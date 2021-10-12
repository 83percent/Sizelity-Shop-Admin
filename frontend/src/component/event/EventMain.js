import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import DeteFormat from '../../contents/js/DateFormat';
import EventModule from '../../contents/js/Event';

import EventDetail from './EventDetail';

// Context
import { ServerContext, UserContext } from '../../App';

// CSS
import '../../contents/css/event/EventMain.css';

const EventMain = () => {
    // State
    const [eventArrays, setEventArrays] = useState(null);
    const [activeData, setActiveData] = useState(null);
    
    // Context
    const { user } = useContext(UserContext);
    const server = useContext(ServerContext);

    // Memo
    const eventModule = useMemo(() => {
        return new EventModule(server);   
    }, [server]);

    // Ref
    const activeCard = useRef(null);
    const modifyCheck = useRef(false);

    const event = {
        create : function() {
            if(eventArrays?.length < 10) {
                const _o = {
                    name : "",
                    text : "",
                    type : "",
                    date : "",
                    url : "",
                    unsave : true // 서버에 저장된 상태가 아니면 true
                }
                setEventArrays([...eventArrays, _o])
            } else {
                window.alert("생성 개수를 초과하였습니다. (최대 10개)");
            }
        },
        explainToggle : function(target) {
            for(let i=0; i<3; ++i) {
                if(target.classList.contains("text")) break;
                else target = target.parentElement;
            }
            if(!target.classList.contains("text")) return;
            target.classList.toggle("on");
        }
    }
    const card = {
        select : function(index, target, data) {
            if(activeData?.index === index) return;
            if(modifyCheck.current) {
                if(!window.confirm("저장이 안된 정보가 있습니다.\n변경 내용을 취소하시겠습니까?")) return;
            }
            for(let i=0; i<5; ++i) {
                if(target.nodeName === "LI") break;
                else target = target.parentElement;
            }
            if(target.nodeName !== "LI") return;
            if(activeCard.current !== null) {
                activeCard.current.classList.remove("active");
            }
            target.classList.add("active");
            activeCard.current = target;
            setActiveData({
                index : index,
                data: data
            });
        }, // select(inde,x target, data)
        save : async function({index, id, data, isNew}) {
            let response = null;
            
            if(isNew) {
                response = await eventModule.set(data);
            } else {
                response = await eventModule.update(id, data);
            }
            console.log(response);
            switch(response.type) {
                case 'success' : {
                    const _e = JSON.parse(JSON.stringify(eventArrays));
                    if(isNew) {
                        _e[index] = response.data;
                    } else {
                        for(let [cate, value] of Object.entries(data)) {
                            console.log(cate);
                            console.log(value);
                            _e[index][cate] = value;
                        }
                    }
                    modifyCheck.current = false;
                    window.alert("저장되었습니다.");
                    setActiveData(null);
                    setEventArrays(_e);
                    break;
                }
                case 'error' : {
                    window.alert(response?.msg);
                    break;
                }
                default : {
                    window.alert("문제가 발생했습니다.\n잠시 후 다시 시도해주세요.");
                }
            }
        }, //save()
        remove : async function(index, eventID) {
            console.log(eventID)
            if(!window.confirm("이벤트를 삭제하시겠습니까?")) return;
            if(!eventID) {
                const _e = JSON.parse(JSON.stringify(eventArrays)).filter((_,i) => i !== index);
                setEventArrays(_e);
                return;
            } else {
                const response = await eventModule.remove(eventID);
                switch(response.type) {
                    case 'success' : {
                        const _e = JSON.parse(JSON.stringify(eventArrays)).filter((_,i) => i !== index);
                        setEventArrays(_e);
                        setActiveData(null);
                        break;
                    }
                    case 'error' : {
                        window.alert(response?.msg);
                        break;
                    }
                    default : {
                        window.alert("문제가 발생했습니다.\n잠시 후 다시 시도해주세요.");
                    }
                }
            }
        }, // remove(eventID)
    }
    useEffect(() => {
        if(eventArrays === null) {
            (async () => {
                const response = await eventModule.getList();
                switch(response.type) {
                    case 'success' : {
                        setEventArrays(response.data);
                        break;
                    }
                    case 'error' : {
                        window.alert(response?.msg);
                        break;
                    }
                    default : {}
                }
            })();
        }
    }, [eventArrays, eventModule]);
    return (
        <section id="event">
            <header>
                <h1>쇼핑몰 이벤트</h1>
                <p>쇼핑몰에서 진행중인 이벤트 정보를 고객과 공유해보세요.</p>
            </header>
            <article>
                <section className="handler-wrapper">
                    <div className="list-wrapper">
                        <div className="title">
                            <h2>나의 진행중인 이벤트 목록</h2>
                            {
                                eventArrays !== null ? (
                                    <p>({eventArrays.length}/10)</p>
                                ) : null
                            }
                        </div>
                        
                        <p>각각의 이벤트들은 실제로 고객에게 보이는 모습이에요.</p>
                        <ul>
                            {
                                eventArrays?.length > 0 ? (
                                    eventArrays.map((element, index) => (
                                        <li key={index} onClick={(e) => card.select(index, e.target, element)}>
                                            {
                                                element.unsave ? (
                                                    <div className="newDot" title="저장되지 않은 이벤트"></div>
                                                ) : null
                                            }
                                            <div className="info">
                                                <div>
                                                    <h3>{user.sname}</h3>
                                                    <EventType type={element.type} />
                                                </div>
                                                <p>{element.date ? DeteFormat.eventDay(element.date) : null}</p>
                                                <i className="material-icons">expand_more</i>
                                            </div>
                                            <div className="text">
                                                <h3>{element.name}</h3>
                                                <div className="explain">
                                                    {
                                                        element.text?.split("\n").map((line, i2) => (
                                                            <p key={i2}>{line}</p>
                                                        ))
                                                    }
                                                    
                                                </div>
                                                <button onClick={(e) => event.explainToggle(e.target)}>
                                                    <i className="material-icons">expand_more</i>
                                                </button>
                                                {
                                                    element.url ? (
                                                        <div className="btn">
                                                            <a href={element.url}>쇼핑몰로 이동</a>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="none">
                                        <p>진행중인 이벤트가 없어요.</p>
                                        <button onClick={() => event.create()}>새로운 이벤트 추가</button>
                                    </li>
                                )
                            }
                        </ul>
                        <div className="handler">
                            <button onClick={() => event.create()}>새로운 이벤트 추가</button>
                        </div>
                    </div>
                </section>
                {
                    activeData ? (
                        <EventDetail 
                            activeData={activeData}
                            modifyCheck={modifyCheck}
                            cardSave={card.save}
                            cardRemove={card.remove}/>
                    ) : null    
                }
            </article>
        </section>
    )
}
const EventType = ({type}) => {
    switch (type) {
        case "discount": {
            return (
                <p style={{backgroundColor: "#FE4F12"}}>할인</p>
            )
        }
        case "free" : {
            return (
                <p style={{backgroundColor: "#E61050"}}>무료배송</p>
            )
        }
        case "coupon" : {
            return (
                <p style={{backgroundColor: "#C11EFC"}}>쿠폰</p>
            )
        }
        case "saving" : {
            return (
                <p style={{backgroundColor: "#00966B"}}>적립</p>
            )
        }
        default: {
            return null;
        }
    }
}
export default memo(EventMain);