import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import ProductType from '../../contents/js/ProductType';
import URLModule from '../../contents/js/URL';

// Context
import { ServerContext, UserContext } from '../../App';

// CSS
import '../../contents/css/product/ProductSearch.css';

let urlModule = null;
const ProductSearch = ({history}) => {

    // State
    const [loader, setLoader] = useState(false);

    // Context
    const server = useContext(ServerContext);
    const { user } = useContext(UserContext);

    // ref
    const cautionRef = useRef(null);
    const SearchData = useRef({
        value : undefined,
        way : "pname",
        ptype : "all",
        date : "all"
    })
    
    const event = {
        search : async function(sendData) {
            setLoader(true);
            let {value, way, ptype, date} = sendData;
            const _sd = {way, ptype, date};
            if(!value) {
                this.setCautionToggle("검색어가 너무 짧습니다.")
                return;
            } else {
                switch(way) {
                    case 'pname' : {
                        if(value.length < 3) {
                            this.setCautionToggle("검색어가 너무 짧습니다. (2~20자)")
                            return;
                        } else if(value.length < 20) {
                            this.setCautionToggle("검색어가 너무 깁니다. (2~20자)")
                        }
                        const isURL = ((value) => {
                            let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                            return regex.test(value);
                        })(value);
                        if(isURL) {
                            this.setCautionToggle("검색 방식을 '상품 주소'로 변경해주세요.");
                            return;
                        }
                        _sd.value = value;
                        break;
                    }
                    case 'url' : {
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
                this.setCautionToggle("",false)
            } // 검색 조건 확인.
            await axios({
                method : "post",
                url : server + "/product/search",
                data : _sd,
                withCredentials: true,
                timeout: 10000
            }).then(response => {
                switch(response?.status) {
                    case 200 : {
                        break;
                    }
                    case 204 : {
                        break;
                    }
                    default : {
                        this.setCautionToggle("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
                        break;
                    }
                }
            }).catch(err => {
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
                setLoader(false);
            });
        }, // search(sendData)
        setCautionToggle : function(msg, toggle) {
            if(toggle === false) {
                cautionRef.current.innerHTML = "";
            } else {
                cautionRef.current.innerHTML = msg;
            }
        }, // setCautionToggle(msg, toggle)
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
                            <option value="week">이번 주</option>
                            <option value="month">이번 달</option>
                            <option value="year">올해</option>
                        </select>
                    </li>
                </ul>
                <p ref={cautionRef}></p>
            </div>
        </article>
    )
}
export default ProductSearch;