import axios from 'axios';
import URLModule from '../../contents/js/URL';
import ProductType from '../../contents/js/ProductType';
import ProductModule from '../../contents/js/product/Product';

// CSS
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import '../../contents/css/product/ProductAdd.css';

// Context 
import { ServerContext, UserContext } from '../../App';

let urlModule = null;
const ProductAdd = ({history, location}) => {

    // State
    const [_productURL, _setProductURL] = useState(undefined);
    const [_productInfo, _setProductInfo] = useState(undefined);

    // Context
    const server = useContext(ServerContext);
    const { user } = useContext(UserContext);
    
    // memo
    const productModule = useMemo(() => {
        return new ProductModule(server);
    }, [server]);

    console.log(user);

    // Ref
    const urlInputRef = useRef(null);
    const cautionRef = useRef(null);
    const infoCautionRef = useRef(null);
    const productinfoRef = useRef({
        sname : user.sname,
        pname : "",
        ptype : "",
        subtype : ""
    });
    
    const event = {
        getProductURL : async function(value) {
            if(value.length < 15) {
                this.setURLCaution("너무 짧습니다.");
                return;
            }
            try {
                new URL(value);
            } catch {
                this.setURLCaution("주소 형식을 입력해주세요. (http://example.com/path?query=123)");
                _setProductURL(null);
                return;
            }

            const _urlData = this.checkURL(value);

            if(!_urlData || !_urlData.code) {
                if(!window.confirm("입력하신 상품 주소로는 내보내기 기능만이 사용가능합니다.\n계속 진행하겠습니까?")) {
                    _setProductInfo(null);
                    return;
                } else {
                    // 지원하지 않는 형식의 상품 생성
                    const response = await productModule.getNextProductIndex();
                    switch(response.type) {
                        case 'success' : {
                            try {
                                if(Number(response.data?.lastIndex) >= 0) {
                                    // 라스트 인덱스 데이터 정상 유입
                                    _setProductURL({
                                        domain: user.domain,
                                        type: "auto",
                                        code: Number(response.data.lastIndex)+1,
                                        full: value
                                    });
                                    this.setURLCaution("", false);
                                } else {
                                    window.alert("문제가 발생했습니다.");
                                    _setProductURL(null);
                                    return;
                                }
                            } catch(err) {
                                console.log(err)
                                window.alert("문제가 발생했습니다.");
                                _setProductURL(null);
                                return;
                            }
                            break;
                        }
                        case 'error' :
                        default : {
                            return window.alert(response?.msg || "문제가 발생했습니다.");
                        }
                    }
                }
            } else {
                // 분석 결과 null 아님
                if(_urlData.domain !== user.domain) {
                    this.setURLCaution("다른 쇼핑몰의 상품입니다.");
                    _setProductURL(null);
                    return;
                }
                _setProductURL(_urlData)
            }
            
        }, // getProductURL(value)
        checkURL : function(url) {
            if(urlModule === null) urlModule = new URLModule();
            const _urlData = urlModule.get(url);

            try {
                // 지원하는 쇼핑몰
                if(_urlData?.code) {
                    return _urlData;
                }
                return null;
            } catch {
                return null;
            } 
        },
        setNotSupportProduct : function(url) {
            
        },
        setURLCaution : function(msg, toggle) {
            if(toggle !== false) {
                cautionRef.current.innerHTML = msg;
            } else {
                cautionRef.current.innerHTML = "";  
            }

            
        }, // setURLCaution(msg, toggle)
        saveProductInfo : function(data) {
            if(data.pname?.length < 3) {
                this.setInfoCaution("상품명이 너무 짧습니다. (3자 이상)");
                _setProductInfo(null);
                return;
            }
            if(!data?.ptype || data.ptype === "" || data.ptype.length <= 2) {
                this.setInfoCaution("상품 종류를 선택해주세요.");
                _setProductInfo(null);
                return;
            }
            console.log(data.subtype)
            if(data.subtype === "") {   
                this.setInfoCaution("세부 분류를 입력해주세요.");
                _setProductInfo(null);
                return;
            }
            this.setInfoCaution("",false);
            _setProductInfo(JSON.parse(JSON.stringify(data)));
            
        }, // saveProductInfo(data)
        setInfoCaution: function(msg, toggle) {
            if(toggle !== false) {
                infoCautionRef.current.innerHTML = msg;
            } else {
                infoCautionRef.current.innerHTML = "";
            }
        }, // setInfoCaution(msg, toggle)
        send : async function(sizeData, cautionFnc, loaderToggle) {
            const _sendData = {
                praw : {
                    domain : user.domain,
                    code : _productURL.code,
                    full : _productURL.full,
                    type : _productURL.type
                },
                info : _productInfo,
                size : sizeData
            }
            loaderToggle(true);
            await axios({
                method: 'POST',
                url : server + "/product",
                data : {
                    data : _sendData,
                    shopRef : user.id
                },
                withCredentials: true,
                timeout: 4500
            }).then(response => {
                loaderToggle(false);
                if(response.status === 200) {
                    const {shop, code} = response.data;
                    history.push("/product/success", {shop, code});
                }
            }).catch(err => {
                switch(err?.response?.status) {
                    case 401 : {
                        cautionFnc("로그인에 문제가 발생했습니다.");
                        break;
                    }
                    case 403 : {
                        cautionFnc("잘못된 요청 입니다.");
                        break;
                    }
                    case 419 : {
                        cautionFnc("이미 존재하는 상품의 주소입니다.");
                        break;
                    }
                    case 500 : {
                        cautionFnc("서버에 문제가 발생했습니다.");
                        break;
                    }
                    default : {
                        cautionFnc("인터넷 연결을 확인해주세요.");
                        break;
                    }
                }
                loaderToggle(false);
            })
        } // async send()
    }
    
    return (
        <article className="add">
            <div className="add-wrapper">
                <div>
                    <div className="url-input-wrapper">
                        <div className="title">
                            <div>
                                {
                                    _productURL === undefined ? (
                                        <div></div>
                                    ) : _productURL === null ? (
                                        <div className="fail">
                                            <i className="material-icons">close</i>
                                        </div>
                                    ) : (
                                        <div className="pass">
                                            <i className="material-icons">check</i>
                                        </div>
                                    )
                                }
                                <h2>상품 주소 입력</h2>
                            </div>
                            <p>상품 식별을 위해 상품 주소가 필요해요.</p>
                            <p>추가하려는 상품 상세보기 화면의 주소를 밑에 붙여넣어주세요.</p>
                        </div>
                        <div className="url-input-frame">
                            <input type="text" ref={urlInputRef} defaultValue={location.state?.url ? location.state.url : null} onKeyUp={(e) => {if(e.key === 'Enter') event.getProductURL(e.target.value)}}/>
                        </div>
                        <p ref={cautionRef}></p>
                        <button onClick={() => event.getProductURL(urlInputRef.current.value)}>적용</button>
                    </div>
                </div>
                <div className={!_productURL ? 'off' : ""}>
                    <div className="info-input-wrapper">
                        <div className="title">
                            <div>
                                {
                                    _productInfo === undefined ? (
                                        <div></div>
                                    ) : _productInfo === null ? (
                                        <div className="fail">
                                            <i className="material-icons">close</i>
                                        </div>
                                    ) : (
                                        <div className="pass">
                                            <i className="material-icons">check</i>
                                        </div>
                                    )
                                }   
                                <h2>상품 정보 입력</h2>
                            </div>
                        </div>
                        {
                            !_productURL ? null : (
                                <>
                                    <ul className="info-input-frame">
                                        <li>
                                            <h3>상품 명</h3>
                                            <p>[1+1], 재입고, 인기 등을 제외한 온전한 상품명만 입력해주세요.</p>
                                            <input type="text" onChange={e => productinfoRef.current.pname = e.target.value}/>
                                        </li>
                                        <li>
                                            <h3>상품 종류</h3>
                                            <select onChange={(e) => productinfoRef.current.ptype = e.target.value}>
                                                <option style={{display: "none"}}>상품 종류</option>
                                                <option value="outer">아우터</option>
                                                <option value="top">상의</option>
                                                <option value="bottom">하의</option>
                                                <option value="skirt">치마</option>
                                                <option value="onepiece">원피스</option>
                                                <option value="suit">한벌 옷</option>
                                                <option value="set">세트</option>
                                                <option value="shoes">신발</option>
                                            </select>
                                        </li>
                                        <li>
                                            <h3>세부 분류</h3>
                                            <p>사이즈 식별이 가능한 세부 분류 하나만 입력해주세요.</p>
                                            <p>올바른 예) 긴팔티, 반팔티, 긴바지, 7부 바지 등 </p>
                                            <p>잘못된 예) 나그랑티, 청바지, 빈티지티, 무지티 등 </p>
                                            <input type="text" onChange={e => productinfoRef.current.subtype = e.target.value}/>
                                        </li>
                                    </ul>
                                    <div className="save-frame">
                                        <p ref={infoCautionRef}></p>
                                        <button onClick={() => event.saveProductInfo(productinfoRef.current)}>적용</button>
                                    </div>
                                    
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`size-input-frame ${!_productInfo ? "off" : null}`}>
                <div className="title">
                    <div>
                        <h2>사이즈 정보 입력</h2>

                    </div>
                    <p>작은 사이즈부터 입력해주세요. (작은 사이즈가 위로)</p>
                    <p>모든 사이즈 부위의 사이즈 정보를 입력할 필요는 없어요.</p>
                    <p>입력한 부위의 수치 정보는 중간에 비어있으면 안 돼요. 모든 사이즈에 해당 부위의 수치정보가 입력되어야해요.</p>
                </div>
                {
                    !_productInfo ? null : (
                        <ProductRateAdd type={_productInfo.ptype} send={event.send} />
                    )
                }
            </div>
        </article>
    )
}

const ProductRateAdd = ({type, send}) => {
    // State
    const [_sizeList, _setSizeList] = useState([]);
    const [loader, setLoader] = useState(false);
    
    // Ref
    const sizeFormat = useRef({});
    const sizeCaution = useRef(null);
    const sendCaution = useRef(null);
    const loaderRef = useRef(null);

    const _typeSizeData = ProductType.getSizeRate(type);

    function saveData(data) {
        const saveData = [];
        let _d = ((data) => {
            return Object.entries(data).reduce((acc, element) => {
                if(element[1]) {
                    acc.push(element[0])
                }
                return acc;
            }, []);
        })(data[0]);
        if(!_d.includes("name")) {
            window.alert("사이즈 명을 입력해주세요.");
            return;
        } else if(_d.length <=1 ) {
            window.alert("사이즈는 최소 하나 이상을 입력해야합니다.");
            return;
        }
        
        let pass = false;
        for(let row of data) {
            const _imsi = {};
            for(let hasName of _d) {
                if(row.name === undefined) {
                    window.alert("사이즈 명을 입력해주세요.");
                    pass = false;
                    break;
                }
                if((row[hasName] > 0 || row[hasName].length > 0)) {
                    _imsi[hasName] = row[hasName];
                    pass = true;
                } else {
                    pass = false;
                    window.alert(`${row.name}의 ${ProductType.getSizeRateName(hasName)} 수치가 없습니다.`);
                    break;
                }
            }
            if(pass) saveData.push(_imsi);
            else break;
        }
        if(pass) send(saveData, sizeEvent.setSendCautionToggle, sizeEvent.loaderToggle);
        else return;
    }

    const sizeEvent = {
        addList : function() {
            if(_sizeList.length >= 10) {
                this.sizeCautionToggle("10개 이하의 사이즈만 입력 가능합니다.");
                return;
            }
            _setSizeList([..._sizeList, JSON.parse(JSON.stringify(sizeFormat.current))]);
        }, //addList()
        removeList : function() {
            if(_sizeList.length <= 1) {
                this.sizeCautionToggle("1개 이상의 사이즈가 필요합니다.");
                return;
            }
            _sizeList.pop();
            _setSizeList([..._sizeList]);
        }, // removeList()
        listValueChange : function(index, rateName, value, target) {
            if(value.length > 0) target.classList.add("on");
            else target.classList.remove("on");
    
            _sizeList[index][rateName] = isNaN(value) ? value.trim().toUpperCase() : Number(value);
            _setSizeList(_sizeList);
        }, // listValueChange(index, rateName, value, target)
        sizeCautionToggle : function(msg, toggle) {
            if(toggle !== false) {
                sizeCaution.current.innerHTML = msg;
            } else {
                sizeCaution.current.innerHTML = "";
            }
        }, // sizeCautionToggle()
        setSendCautionToggle : function(msg, toggle) {
            if(toggle !== false) {
                sendCaution.current.innerHTML = msg;
            } else {
                sendCaution.current.innerHTML = "";
            }
        }, // setSendCautionToggle(msg, toggle)
        loaderToggle : function(toggle) {
            setLoader(toggle);
        }
    }
    useEffect(() => {
        sizeFormat.current = ProductType.getSizeRate(type).reduce((acc, element) => {
            acc[element[0]] = 0;
            return acc;
        }, {});
        _setSizeList([JSON.parse(JSON.stringify(sizeFormat.current))]);
    }, [type]);
    return (
        <>
            <div className="size-input-table">
                
                <table>
                    <thead>
                        <tr>
                            <th>사이즈 명</th>
                            {
                                _typeSizeData.map((element,index) => (
                                    <th key={index}>{element[1]}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _sizeList.map((row, i1) => (
                                <tr key={i1}>
                                    <td>
                                        <input type="text" className="name" onChange={(e) => sizeEvent.listValueChange(i1, "name", e.target.value, e.target)} defaultValue={row?.name ? row.name : null}/>
                                    </td>
                                    {
                                        Object.entries(row).map((element, i2) => {
                                            if(element[0] !== 'name') {
                                                return (
                                                    <td key={i2}>
                                                        <input type="number" min={0} onChange={(e) => sizeEvent.listValueChange(i1, element[0], e.target.value, e.target)} defaultValue={element[1] ? element[1] : null}/>
                                                    </td>
                                                )
                                            } else return null;
                                        })
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <p>(단위 cm)</p>
            </div>
            <div className="btn-wrapper">
                <div>
                    <button className="su" onClick={() => sizeEvent.addList()}>
                        <i className="material-icons">add</i>
                    </button>
                    <button className="fa" onClick={() => sizeEvent.removeList()}>
                        <i className="material-icons">remove</i>
                    </button>
                    <button onClick={() => console.log("데이터 : ", _sizeList)}>
                        <i className="material-icons">comment</i>
                    </button>
                </div>
                <p ref={sizeCaution}></p>
            </div>
            <div className="save-frame">
                <p ref={sendCaution}></p>
                <div className={`loader-frame ${loader ? 'on' : null}`} ref={loaderRef}>
                    <div className="loader"></div>
                </div>
                <button onClick={() => saveData(_sizeList)}>
                    <i className="material-icons">save</i>
                    <p>상품 등록</p>
                </button>
            </div>
            
        </>
    )
}
export default ProductAdd;