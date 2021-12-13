import { useState, useRef, useMemo, useContext } from 'react';
import URLModule from '../../../contents/js/URL';
import ProductModule from '../../../contents/js/product/Product';
import { Link } from 'react-router-dom';

// Component
import ProductSearchList from './ProductSearchList';
import ShareViewer from '../../ShareViewer';
import ProductDetail from '../ProductDetail';

// Context
import { ServerContext } from '../../../App';

// CSS
import '../../../contents/css/product/ProductSearch.css';

const ProductSearch = () => {
    // State
    const [onFilter, setOnFilter] = useState(false);
    const [searchType, setSearchType] = useState('pname');
    const [loader, setLoader] = useState(false);
    const [count, setCount] = useState(0);
    
    const [datas, setDatas] = useState(null);
    const [detail, setDetail] = useState(null);
    const [shareProduct, setShareProduct] = useState(null);

    // Context
    const server = useContext(ServerContext);

    // Memo
    const urlModule = useMemo(() => {
        return new URLModule()
    });
    const productModule = useMemo(() => {
        return new ProductModule(server);
    }, [server]);

    // Ref
    const SearchData = useRef({
        value : undefined,
        //way : "pname",
        ptype : "all",
        date : "all"
    });
    const searchInput = useRef(null);

    

    const event = {
        checking : function(data) {
            const {value, way} = data;
            switch(way) {
                case 'pname' : {
                    if(value && (value.length < 2 || value.length > 20)) {
                        window.alert("검색어는 '2 ~ 20자'를 입력해주세요.");
                        return false;
                    }
                    return true;
                }
                case 'url' : {
                    if(!value || value.length < 5 || value.length > 150) {
                        window.alert("주소는 '5 ~ 150자'를 입력해주세요.");
                        return false;
                    }
                    const isURL = ((value) => {
                        let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
                        return regex.test(value);
                    })(value);

                    if(!isURL) {
                        window.alert("주소 형식(URL)이 올바르지 않습니다.");
                        return false;
                    } else {
                        const _u = urlModule.get(value);
                        if(!_u) return window.alert("검색을 지원하지 않는 주소 형식 입니다.");
                        else {
                            SearchData.current.domain = _u.domain;
                            SearchData.current.code = _u.code;
                        }
                    }
                    return true;
                }
                default : return null;
            } 
        }, // Checking
        search : async function({value, count}) {
            if(count === 0) {
                setCount(0);
                setLoader(true);
            }
            if(value !== undefined) SearchData.current.value = value;
            SearchData.current.way = searchType;

            if(event.checking(SearchData.current)) {
                if(count !== undefined) SearchData.current.count = count;
                else SearchData.current.count = 0;
                
                console.log(SearchData.current)
                
                const response = await productModule.search(SearchData.current);
                switch(response.type) {
                    case 'success' : {
                        if(count === 0) {
                            setDatas(response.data);
                            setCount(response.data.length);
                        } else {
                            setDatas([...datas, ...response.data]);
                            if(response.data.length === 0) setCount(count+1);
                            else setCount(count+response.data.length);
                        }
                        break;
                    }
                    case 'error' : {
                        break;
                    }
                    default : {
                        break;
                    }
                }
            }
            setLoader(false);
        }, // Error
        remove: async function(target, id) {
            if(!id) return;
            if(!window.confirm("상품을 삭제합니다")) return;
            
            const response = await productModule.removes([id]);
            switch(response.type) {
                case 'success' : {
                    for(let i=0; i<5; i++) {
                        if(target.nodeName === 'LI') {
                            target.classList.add("remove");
                            break;
                        } else target = target.parentElement;
                    }
                    break;
                }
                case 'error' : {
                    return window.alert("문제가 발생했습니다.");
                }
            }
        } // remove
    }


    return (
        <main id="product" className="search">
            <nav id="search-wrapper">
                <div id="input-wrapper">
                    <div className="input-frame">
                        <i className="material-icons">search</i>
                        <input
                            type="text"
                            ref={searchInput}
                            placeholder={searchType === 'pname' ? "검색하려는 상품명을 입력해주세요." : "검색하려는 상품 주소를 입력해주세요."}
                            onBlur={e => SearchData.current.value = e.target.value}
                            onKeyDown={e => {if(e.key === 'Enter') event.search({value : e.target.value, count: 0})}}/>
                    </div>
                    <div className="btn-frame">
                        <button onClick={() => event.search({value: searchInput.current.value,count: 0})}>
                            <p>검색</p>
                        </button>
                        <button onClick={() => setOnFilter(!onFilter)} className={onFilter ? 'active' : ""}>
                            <p>필터</p>
                            <i className="material-icons">arrow_drop_down</i>
                        </button>
                    </div>
                </div>
                <ul id="filter-wrapper" className={onFilter ? 'active' : ""}>
                    <li>
                        <h3>검색 방식</h3>
                        <label>
                            <select onChange={e => setSearchType(e.target.value)}>
                                <option value="pname">상품명</option>
                                <option value="url">상품 주소</option>
                            </select>
                            <i className="material-icons">arrow_drop_down</i>
                        </label>
                    </li>
                    <li>
                        <h3>종류</h3>
                        <label>
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
                            <i className="material-icons">arrow_drop_down</i>
                        </label>
                    </li>
                    <li>
                        <h3>기간</h3>
                        <label>
                            <select onChange={e => SearchData.current.date = e.target.value}>
                                <option value="all">전체기간</option>
                                <option value="today">오늘</option>
                                <option value="week">일주일 이내</option>
                                <option value="month">1개월 이내</option>
                                <option value="quarterYear">3개월 이내</option>
                                <option value="halfYear">6개월 이내</option>
                                <option value="year">1년 이내</option>
                            </select>
                            <i className="material-icons">arrow_drop_down</i>
                        </label>
                    </li>
                </ul>
            </nav>
            <section className={onFilter ? "activeFilter" : ""}>
                {
                    loader ? (
                        <div>
                            <div className="loader"></div>
                        </div>
                    ) : null
                }
                {
                    datas === null ? (
                        <div>
                            <p>{searchType === 'pname' ? "검색하려는 상품명을 입력해주세요." : "검색하려는 상품 주소를 입력해주세요."}</p>
                        </div>
                    ) : (
                        datas.length > 0 ? (
                            <>
                            <ProductSearchList datas={datas} setShareProduct={setShareProduct} remove={event.remove} setDetail={setDetail}/>
                            {
                                count % 40 === 0 ? (
                                    <button onClick={() => event.search({count : datas.length})}>더보기</button>
                                ) : null
                            }
                            </>
                        ) : (
                            <div>
                                <p>결과 없음</p>
                                <Link to="/product/add">
                                    <p>상품 추가</p>
                                    <i className="material-icons">chevron_right</i>
                                </Link>
                            </div>
                        )
                    )
                }
            </section>
            <ProductDetail detail={detail} setDetail={setDetail} />
            {
                shareProduct ? (
                    <ShareViewer value={shareProduct} setValue={setShareProduct} />
                ) : null
            }
        </main>
    )
}

export default ProductSearch;