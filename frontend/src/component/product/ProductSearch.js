import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getTypeName } from '../../contents/js/ProductType';
import URLModule from '../../contents/js/URL';
import { transformDate } from '../../contents/js/DateFormat';
import ProductModule from '../../contents/js/product/Product'
import ShareViewer from '../ShareViewer';

// Component
import ProductDetail from './ProductDetail';

// Context
import { ServerContext, UserContext } from '../../App';

// CSS
import '../../contents/css/product/ProductSearch.css';

let urlModule = null;
const ProductSearch = ({history}) => {

    // State
    const [loader, setLoader] = useState(false);
    const [detail, setDetail] = useState(null);
    const [resultDatas, setResultDatas] = useState(undefined);
    const [moreBtn, setMoreBtn] = useState(true);
    const [share, setShare] = useState(null);

    console.log(resultDatas);

    // Context
    const server = useContext(ServerContext);
    const { user } = useContext(UserContext);

    // ref
    const cautionRef = useRef(null);
    const choiceCount = useRef(0);
    const deleteRef = useRef(null);
    const SearchData = useRef({
        value : undefined,
        way : "pname",
        ptype : "all",
        date : "all"
    });
    const lastSearchQuery = useRef(null);

    const event = {
        search : async function(sendData) {
            let {value, way, ptype, date} = sendData;
            const _sd = {way, ptype, date};
            switch(way) {
                case 'pname' : {
                    console.log("검색어 : ", value);
                    if(value === undefined || value.length === 0 ) {
                        // 검색어 없음 = 전체 검색
                        _sd.value = "";
                    } else {
                        if(value.length < 2) {
                            this.setCautionToggle("검색어가 너무 짧습니다. (2~20자)")
                            return;
                        } else if(value.length > 20) {
                            const isURL = ((value) => {
                                let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                                return regex.test(value);
                            })(value);
                            if(isURL) {
                                this.setCautionToggle("검색 방식을 '상품 주소'로 변경해주세요.");
                                return;
                            } else {
                                this.setCautionToggle("검색어가 너무 깁니다. (2~20자)")
                                return;
                            }
                        }
                        _sd.value = value;
                    }
                    break;
                }
                case 'url' : {
                    if(!value || value?.length <= 15) {
                        this.setCautionToggle("검색할 주소가 너무 짧습니다.");
                        return;
                    }
                    const isURL = ((value) => {
                        if(value.indexOf("http") === -1) {
                            value = "http://"+value;
                        }
                        let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                        return regex.test(value);
                    })(value);
                    // 주소 형식 확인
                    if(!isURL) {
                        this.setCautionToggle("주소 형식이 아닙니다. (ex. www.example.com/path?query=1234)");
                        return;
                    }
                    if(!urlModule) urlModule = new URLModule();
                    const _u = urlModule.get(value);
                    if(_u === null) {
                        this.setCautionToggle("지원하지 않는 주소 형식입니다.");
                        return;
                    }
                    if(_u.domain !== user.domain) {
                        // 로그인 된 쇼핑몰과 같은 쇼핑몰 상품을 검색하는지 확인
                        this.setCautionToggle(`가입하신 '${user.domain}' 쇼핑몰의 상품만 검색 가능합니다.`);
                        return;
                    }
                    _sd.domain = _u.domain;
                    _sd.code = _u.code;
                    break;
                }
                default : {
                    this.setCautionToggle("잘못된 접근입니다.");
                    return;
                }
            } // swtich
            this.setCautionToggle("",false);
            lastSearchQuery.current = _sd;
            this._send(_sd);
            
        }, // search(sendData)
        setCautionToggle : function(msg, toggle) {
            if(toggle === false) {
                cautionRef.current.innerHTML = "";
            } else {
                cautionRef.current.innerHTML = msg;
            }
        }, // setCautionToggle(msg, toggle)
        getMoreDatas : function() {
            lastSearchQuery.current.count = resultDatas.length;
            this._send(lastSearchQuery.current, true);
        }, // getMoreDatas()
        _send : async function(query, isMore) {
            setLoader(true);
            await axios({
                method : "post",
                url : server + "/product/search",
                data : query,
                withCredentials: true,
                timeout: 15000
            }).then(response => {
                switch(response?.status) {
                    case 200 : {
                        if(isMore) {
                            setResultDatas([...resultDatas, ...response.data]);
                        } else {
                            setResultDatas(response.data);
                        }
                        if(!moreBtn) setMoreBtn(true);
                        break;
                    }
                    case 204 : {
                        setResultDatas([]);
                        break;
                    }
                    default : {
                        this.setCautionToggle("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
                        break;
                    }
                }
            }).catch(err => {
                if(isMore) {setMoreBtn(false);}
                switch(err?.response?.status) {
                    case 400 : {
                        window.alert("잘못된 접근입니다.");
                        history.push("/wrong");
                        break;
                    }
                    case 401 : {
                        this.setCautionToggle("로그인에 문제가 발생했습니다. 다시 로그인 해주세요.");
                        break;
                    }
                    case 500 : {
                        this.setCautionToggle("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
                        break;
                    }
                    default : {
                        this.setCautionToggle("서버 연결에 실패했습니다.");
                        break;
                    }
                }
            }).finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, 400);
            });
        }, // async function _send(query)
        deleteCountHandler : function(target) {
            if(target.checked) {
                deleteRef.current.classList.add("active");
                choiceCount.current++;
                target.parentElement.parentElement.classList.add("check");
            } else {
                choiceCount.current--;
                target.parentElement.parentElement.classList.remove("check");
                if(Number(choiceCount.current) === 0) {
                    deleteRef.current.classList.remove("active");
                }
            }
        }, // deleteCountHandler()
        delete : async function() {
            if(Number(choiceCount.current) <= 0) {
                window.alert("선택된 상품이 없습니다.");
                return;
            } else {
                const elements = document.querySelectorAll("input[type='checkbox']");
                const deletes = [];
                for(let index in elements) {
                    if(elements[index]?.checked) deletes.push(resultDatas[index]._id);
                }
                if(deletes.length > 0) {
                    const response = await new ProductModule(server).removes(deletes);

                    switch(response.type) {
                        case 'success' : {
                            window.alert("삭제가 완료되었습니다.(새로고침 후 반영)");
                            break;
                        }
                        case 'error' :
                        default : {
                            window.alert(response?.msg || "문제가 발생했습니다.");
                            break;
                        }
                    }
                } else return window.alert("선택된 상품이 없습니다.");
            }
            
        }, // delete
        edit : function(data) {
            if(!window.confirm("상품 정보를 수정할까요?")) return;
            history.push("/product/edit", {data})
        } // edit(data)
    }
    return (
        <article className="search">
            <div className="search-wrapper">
                <div className="search-input-frame">
                    <div>
                        <i className="material-icons">search</i>
                        <input
                            type="text" 
                            onKeyUp={(e) => {if(e.key === "Enter") event.search(SearchData.current)}}
                            onChange={(e) => SearchData.current.value = e.target.value}
                            />
                    </div>
                    <button onClick={() => event.search(SearchData.current)}>검색</button>
                </div>
                <ul>
                    <li>
                        <p>검색 방식 :</p>
                        <select onChange={e => SearchData.current.way = e.target.value}>
                            <option value="pname">상품명</option>
                            <option value="url">상품 주소</option>
                        </select>
                    </li>
                    <li>
                        <p>상품 종류 :</p>
                        <select onChange={e => SearchData.current.ptype = e.target.value}>
                            <option value="all">전체</option>
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
                        <p>등록 날짜 :</p>
                        <select onChange={e => SearchData.current.date = e.target.value}>
                            <option value="all">전체기간</option>
                            <option value="today">오늘</option>
                            <option value="week">일주일 이내</option>
                            <option value="month">1개월 이내</option>
                            <option value="quarterYear">3개월 이내</option>
                            <option value="halfYear">6개월 이내</option>
                            <option value="year">1년 이내</option>
                        </select>
                    </li>
                </ul>
                <p ref={cautionRef}></p>
            </div>
            <div className={`loader-frame ${loader ? "on" : ""}`}>
            {
                loader ? (
                        <div className="loader"></div>
                ) : null
            }
            </div>
            {
                resultDatas === undefined ? null : resultDatas.length === 0 ? (
                    <div className="no-result-frame">
                        <h3>검색 결과 없습니다.</h3>
                        <Link to="/product/add">
                            <p>상품 추가</p>
                            <i className="material-icons">chevron_right</i>
                        </Link>
                    </div>
                ) : (
                    <div className="result-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th className="check"></th>
                                    <th className="no">no.</th>
                                    <th className="pname">상품명</th>
                                    <th>종류</th>
                                    <th>세부분류</th>
                                    <th>등록날짜</th>
                                    <th className="option"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                resultDatas.map((element, index) => (
                                    <tr key={index}>
                                        <td className="check">
                                            <input type="checkbox" onChange={(e) => event.deleteCountHandler(e.target)}/>
                                        </td>
                                        <td className="no">
                                            <p>{index+1}</p>
                                        </td>
                                        <td className="pname" onClick={() => setDetail(element)}>
                                            <p>{element.info.pname}</p>
                                        </td>
                                        <td>
                                            <p>{getTypeName(element.info.ptype)}</p>
                                        </td>
                                        <td>
                                            <p>{element.info.subtype}</p>
                                        </td>
                                        <td>
                                            <p>{transformDate(element.reg_date)}</p>
                                        </td>
                                        <td className="option">
                                            <div>
                                                <button title="QR코드 생성">
                                                    <i
                                                        className="material-icons"
                                                        onClick={() => setShare({shop: element.praw.domain, no: element.praw.code, pname: element.info.pname, sname: element.info.sname})}>share</i>
                                                </button>
                                                <button title="수정하기">
                                                    <i className="material-icons" onClick={() => event.edit(element)}>edit</i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }           
                            </tbody>
                        </table>
                        {
                            (resultDatas === undefined || resultDatas.length === 0) ? null : (resultDatas.length%20 === 0 && moreBtn) ? (
                                <div className="more-btn">
                                    <button onClick={() => event.getMoreDatas()}>더 보기</button>
                                </div>
                            ) : null
                        }
                        <div className="delete-btn">
                            <button ref={deleteRef} onClick={() => event.delete()}>
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                share ? (
                    <ShareViewer value={share} setValue={setShare}/>
                ) : null
            }
            <ProductDetail detail={detail} setDetail={setDetail}/>
        </article>
    )
}
export default ProductSearch;