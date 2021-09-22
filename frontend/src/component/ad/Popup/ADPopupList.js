import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ADPopupModule from '../../../contents/js/ADPopup';
import DateFormat from '../../../contents/js/DateFormat';


// Context
import { ServerContext } from '../../../App';

// CSS
import '../../../contents/css/ad/popup/ADPopupList.css';

const ADPopupList = ({history}) => {
    // State
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState(null);
    const [activeData, setActiveData] = useState(null);

    // Context
    const server = useContext(ServerContext);
    
    // Memo
    const adPopupModule = useMemo(() => {return new ADPopupModule(server)}, [server])
    
    // Ref
    const activeWrapperRef = useRef(null);

    const event = {
        onActive : function(adData, index) {
            setActiveData({data : adData, index: index});
            activeWrapperRef.current.classList.add("on")
        },
        offActive : function() {
            activeWrapperRef.current.classList.remove("on")
        },
        removeAD : async function(ADID, index) {
            if(!window.confirm("광고를 삭제하시겠습니까?")) return;
            const response = await adPopupModule.remove(ADID);
            switch(response.type) {
                case 'success' : {
                    window.alert("삭제되었습니다.");
                    const _d = JSON.parse(JSON.stringify(data));
                    _d.bid = _d?.bid?.filter((_,i) => i !== index);
                    setData(_d);
                    this.offActive();
                    setActiveData(null);
                    break;
                }
                case 'error' : {
                    window.alert(response.msg);
                    break;
                }
                default : {
                    window.alert("잠시 후 시도해주세요.");
                    break;
                }
            }

        }
    }

    useEffect(() => {
        if(data === null) {
            async function fetchData() {
                const response = await adPopupModule.getAll();
                switch(response.type) {
                    case 'success' : {
                        setData(response.data);
                        break;
                    }
                    case 'error' : {
                        window.alert(response.msg);
                        break;
                    }
                    default : {
                        window.alert("광고 목록을 불러오는데 실패했습니다.\n잠시 후 시도해주세요.");
                    }
                }
                setLoader(false);
            }
            fetchData();
        }
    }, [data, adPopupModule]);
    if(loader) {
        return (
            <section>
                <div className="loader-frame">
                    <div className="loader"></div>
                </div>
            </section>
        )
    } else {
        return (
        
            data !== null ? (
                <>
                    <section id="list">
                        <div>
                            <div className="title">
                                <h2>진행중인 광고</h2>
                                <p>압찰되어 현재 진행중인 광고입니다.</p>
                            </div>
                            <ul>
                                {
                                    data?.ongoing?.length > 0 ? (
                                        <li style={{cursor : 'pointer'}}></li>
                                    ) : (
                                        <li className="none" style={{color: "#dd1818"}}>
                                            <p>진행중인 광고가 없습니다.</p>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div>
                            <div className="title">
                                <h2>광고 목록</h2>
                                <p>입찰 대기중인 광고로 매일 04시에 입찰이 이루어집니다.</p>
                            </div>
                            <ul>
                                <li>
                                    <h3>광고 분류</h3>
                                    <p>희망 입찰가 (VAT 포함)</p>
                                    <p>일일 예산</p>
                                    <p>최대 노출 횟수</p>
                                    <p>광고 생성날짜</p>
                                </li>
                                {
                                    data?.bid.map((element, index) => (
                                        <li key={index} onClick={() => event.onActive(element, index)} style={{cursor : 'pointer'}}>
                                            <h3>팝업 배너 광고</h3>
                                            <p className="bid">{(element?.bid*1000)?.toLocaleString()}원</p>
                                            <p className="plan">{element?.plan.toLocaleString()}원</p>
                                            <p className="plan">{element?.maxCount.toLocaleString()}</p>
                                            <p className="reg_date">{DateFormat.transformDate(  element?.reg_date)}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="btn-wrapper">
                                <button onClick={() => history.push("/advertisement/popup/create")}>광고 생성</button>
                            </div>
                        </div>
                        <nav ref={activeWrapperRef}>
                            {
                                activeData ? (
                                    <>
                                        <div className="back-btn">
                                            <button onClick={() => event.offActive()}>
                                                <i className="material-icons">close</i>
                                            </button>
                                        </div>
                                        <div className="preview">
                                            <img src={activeData?.data?.image} alt="Preview AD"/>
                                        </div>
                                        <ul className="info">
                                            <li>
                                                <p>입찰 희망가 (VAT 포함)</p>
                                                <h3>{(activeData?.data?.bid*1000)?.toLocaleString()}</h3>
                                            </li>
                                            <li>
                                                <p>일일 예산</p>
                                                <h3>{activeData?.data?.plan?.toLocaleString()}</h3>
                                            </li>
                                            <li>
                                                <p>입찰 시 최대 노출 수</p>
                                                <h3>{activeData?.data?.maxCount?.toLocaleString()}</h3>
                                            </li>
                                            <li>
                                                <p>광고 생성날짜</p>
                                                <h3>{DateFormat.transformDate(activeData?.data?.reg_date)}</h3>
                                            </li>
                                        </ul>
                                        <div className="btn-wrapper">
                                            <button className="remove" onClick={() => event.removeAD(activeData.data._id, activeData.index)}>
                                                <i className="material-icons">delete</i>
                                            </button>
                                            <button className="edit">
                                                <i className="material-icons">edit</i>
                                            </button>
                                        </div>
                                    </>
                                ) : null
                            }
                        </nav>
                    </section>
                </>
            ) : initComp()
        
        )
    }
    
}

const initComp = () => {
    return (
        <section className="start">
            <div className="explain">
                <h2>소비자의 이목을 끌자.</h2>
                <p>사이즈리티를 방문한 고객에게 직접적으로 노출이 가능한 보장형 광고에요.</p>
                <p>이미지 기반의 광고로 시작하기 위해서는 1:1 비율의 광고 이미지가 필요해요.</p>
                <p>효과적인 광고 메세지 전달을 통해 쇼핑몰 유입을 높여보세요.</p>

                <h4>광고 입찰 가 노출 당 '1.4원' 부터</h4>
                <div>
                    <Link to="/advertisement/popup/create">광고 시작하기</Link>
                </div>
            </div>
        </section>
    )
}

export default ADPopupList;