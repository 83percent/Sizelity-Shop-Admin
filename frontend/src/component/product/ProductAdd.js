import axios from 'axios';
import URLModule from '../../contents/js/URL';

// CSS
import { useContext, useRef, useState } from 'react';
import '../../contents/css/product/ProductAdd.css';

// Context 
import { ServerContext, UserContext } from '../../App';

let urlModule = null;
const ProductAdd = () => {
    // State
    const [_productURL, _setProductURL] = useState(undefined);
    const [_productInfo, _setProductInfo] = useState(undefined);

    // Context
    const server = useContext(ServerContext);
    const { user } = useContext(UserContext);

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
        getProductURL : function(value) {
            if(value.length < 15) {
                this.setURLCaution("너무 짧습니다.");
                return;
            } else {
                if(urlModule === null) urlModule = new URLModule();
                const _urlData = urlModule.get(value);
                
                if(_urlData.domain !== user.domain) {
                    this.setURLCaution("다른 쇼핑몰의 상품입니다.");
                    _setProductURL(null);
                    return;
                }

                _setProductURL(_urlData);
                if(_urlData) {
                    this.setURLCaution("", false);
                } else {
                    this.setURLCaution("지원하지 않는 형식의 주소입니다.");
                }
                
            }
            
        }, // getProductURL(value)
        setURLCaution : function(msg, toggle) {
            if(toggle !== false) {
                cautionRef.current.innerHTML = msg;
            } else {
                cautionRef.current.innerHTML = "";
            }

            
        }, // setURLCaution(msg, toggle)
        saveProductInfo : function(data) {
            if(data.pname?.length < 3) {
                this.setInfoCaution("상품명이 너무 짧습니다. (2자 이상)");
                _setProductInfo(null);
                return;
            }
            if(data.ptype.length === "") {
                this.setInfoCaution("상품 종류를 선택해주세요.");
                _setProductInfo(null);
                return;
            }
            if(data.ptype.subtype === "") {
                this.setInfoCaution("세부 분류를 입력해주세요.");
                _setProductInfo(null);
                return;
            }
            this.setInfoCaution("",false);
            _setProductInfo(data);
            
        }, // saveProductInfo(data)
        setInfoCaution: function(msg, toggle) {
            if(toggle !== false) {
                infoCautionRef.current.innerHTML = msg;
            } else {
                infoCautionRef.current.innerHTML = "";
            }
        }, // setInfoCaution(msg, toggle)
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
                            <input type="text" ref={urlInputRef} onKeyUp={(e) => {if(e.key === 'Enter') event.getProductURL(e.target.value)}} defaultValue="http://taranto.co.kr/product/detail.html?product_no=14732&cate_no=1&display_group=2"/>
                            <button onClick={() => event.getProductURL(urlInputRef.current.value)}>적용</button>
                        </div>
                        <p ref={cautionRef}></p>
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
                                            <p>하나만 입력해주세요.</p>
                                            <p>ex) 긴팔, 청바지, 슬랙스, 나그랑 등</p>
                                            <input type="text" onChange={e => productinfoRef.current.subtype = e.target.value}/>
                                        </li>
                                    </ul>
                                    <div className="save-frame">
                                        <button onClick={() => event.saveProductInfo(productinfoRef.current)}>적용</button>
                                        <p ref={infoCautionRef}></p>
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
                    <p>작은 사이즈부터 입력해주세요.</p>
                    <p>모든 사이즈 부위의 사이즈 정보를 입력할 필요는 없어요.</p>
                </div>
                {
                    !_productInfo ? null : (
                        <div>
                        
                        </div>
                    )
                }
            </div>
        </article>
    )
}
export default ProductAdd;