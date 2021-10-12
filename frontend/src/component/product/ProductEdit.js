import { useContext, useRef, useState } from "react";
import { getTypeName, getSizeRate, getSizeRateName } from '../../contents/js/ProductType';
import URLModule from '../../contents/js/URL';
import ProductModule from '../../contents/js/product/Product';

// Context
import { ServerContext, UserContext } from '../../App';

// CSS
import '../../contents/css/product/ProductEdit.css';

const ProductEdit = ({history, location}) => {
    // Context
    const server = useContext(ServerContext);
    const {user} = useContext(UserContext);

    // Ref
    const oldData = useRef(location.state?.data);
    const inputSizeRef = useRef(null);
    const productinfoRef = useRef({
        pname : "",
        praw : "",
        subtype : ""
    });

    // State
    const [sizeData, setSizeData] = useState(JSON.parse(JSON.stringify(oldData.current?.size)) || []);

    // Field
    const rateNameArray = getSizeRate(oldData.current?.info?.ptype)

    const event = {
        edit : async function() {
            if(!window.confirm("상품 정보를 수정하시겠습니까?")) return;
            const rows = inputSizeRef.current.querySelectorAll('tr');
            
            // 적용된 정보 추출
            const activeSizeRates = (() => {
                const __active = [];
                for(let element of rows[0].querySelectorAll('input')) {
                    if(element?.value > 0) __active.push(element.name);
                }
                return __active;
            })();
            
            if(activeSizeRates.length === 1) return window.alert("최소 하나의 부위의 수치 정보를 입력해야합니다.");

            let pass = true;
            const editSizeData = [];
            for(let row of rows) {
                let rowPass = true;
                let element = null;
                const editSizeRowData = {};
                
                // 사이즘 명칭 검사
                element = row.querySelector('input[name="name"]');
                if(!element || !element.value || element.value.length < 0 || element.value.length > 8) {
                    pass = false;
                    window.alert("사이즈 명칭을 입력해주세요.");
                    break;
                } else {
                    editSizeRowData.name = element.value;
                }

                // 사이즈 올바르게 입력했는지 & 활성화된 사이즈의 모든 정보가 입력이 되었는지.
                for(let activeSizeRate of activeSizeRates) {
                    element = row.querySelector(`input[name="${activeSizeRate}"]`);
                    if(!element || !element.value || element.value < 1) {
                        // 입력 안됨
                        rowPass = false;
                        window.alert(`'${getSizeRateName(element.name)}'의 수치 정보를 사이즈별로 모두 입력해주세요.`);
                        break;
                    } else {
                        editSizeRowData[activeSizeRate] = element.value;
                    }
                }
                if(!rowPass) {
                    pass = false;
                    break;
                } else {
                    editSizeData.push(editSizeRowData);
                }
            }
            if(!pass) return;


            const {pname:_pname, praw:_praw, subtype:_subtype} = productinfoRef.current;
            const {
                info: {
                    pname,
                    subtype
                },
                praw : {
                    code
                }
            } = oldData.current;
            
            const _sendData = {size : editSizeData}
            if(_pname && _pname !== pname) {
                if(!_sendData.info) _sendData.info = {};
                _sendData.info.pname = _pname;
            }
            if(_subtype && _subtype !== subtype) {
                if(!_sendData.info) _sendData.info = {};
                _sendData.info.subtype = _subtype;
            }
            if(_praw) {
                const analyzeURL = new URLModule().get(_praw);
                if(!analyzeURL) return window.alert("지원하지 않는 주소입니다.");
                const {domain:_domain, code:_code, full:_full} = analyzeURL;
                if(_domain !== user.domain) return window.alert(`변경하려는 상품주소가 가입된 쇼핑몰의 주소가 아닙니다.\n'${user.domain}'으로된 주소여야합니다.`);
                if(_code !== code) {
                    if(!_sendData.praw) _sendData.praw = {};
                    _sendData.praw.code = _code;
                    _sendData.praw.full = _full;
                }
            }

            const response = await new ProductModule(server).edit(oldData.current._id, _sendData);
            switch(response.type) {
                case 'success' : {
                    window.alert("상품 정보를 수정했습니다.");
                    history.replace("/product");
                    break;
                }
                case 'error' :
                default : {
                    window.alert(response?.msg || "문제가 발생했습니다.");
                    break;
                }
            }
        }, // edit
        minus : function() {
            if(sizeData.length <= 1) {
                return window.alert("1개 이상의 사이즈가 필요합니다.")
            }
            sizeData.pop();
            setSizeData([...sizeData]);
        }, // minus
        plus : function() {
            if(sizeData.length >= 10) {
                return window.alert("10개 이하의 사이즈만 입력가능합니다.")
            }
            const sizeFormat = ((type) => {
                return getSizeRate(type).map(element => element[0]);
            })(oldData.current.info.ptype);
            setSizeData([...sizeData, sizeFormat])
        }, // plus()
    }

    if(!oldData?.current) {
        return (
            <main id="product" className="edit">
                <h2>잘못된 접근입니다.</h2>
            </main>
        )
    } else {
        return (
            <main id="product" className="edit">
                <h2>상품 정보를 수정합니다.</h2>
                <section className="row">
                    <div>
                        <div className="title">
                            <div className="dot"></div>
                            <h3>상품 기본 정보</h3>
                        </div>
                        <ul>
                            <li>
                                <h4>상품 명</h4>
                                <p>[1+1], 재입고, 인기 등을 제외한 온전한 상품명만 입력해주세요.</p>
                                <input
                                    type="text"
                                    defaultValue={oldData.current.info.pname} 
                                    onBlur={(e) => productinfoRef.current.pname = e.target.value}/>
                            </li>
                            <li>
                                <h4>상품 주소</h4>
                                <p>상품 식별을 위해 상품 주소가 필요해요.</p>
                                <p>추가하려는 상품 상세보기 화면의 주소를 밑에 붙여넣어주세요.</p>
                                <input
                                    type="text"
                                    defaultValue={oldData.current.praw.full} 
                                    onBlur={(e) => productinfoRef.current.praw = e.target.value}/>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="title">
                            <div className="dot"></div>
                            <h3>상품 사이즈 정보</h3>
                        </div>
                        <ul>
                            <li>
                                <h4>상품 분류</h4>
                                <p>상품의 분류는 변경할 수 없습니다.</p>
                                <input type="text" disabled="on" value={getTypeName(oldData.current.info.ptype)}/>
                            </li>
                            <li>
                                <h4>상품 세부 분류</h4>
                                <p>사이즈 식별이 가능한 세부 분류 하나만 입력해주세요.</p>
                                <p>올바른 예) 긴팔티, 반팔티, 긴바지, 7부 바지 등</p>
                                <p>잘못된 예) 나그랑티, 청바지, 빈티지티, 무지티 등</p>
                                <input
                                    type="text"
                                    defaultValue={oldData.current.info.subtype} 
                                    onBlur={(e) => productinfoRef.current.subtype = e.target.value}/>
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <div>
                        <div className="title">
                            <div className="dot"></div>
                            <h3>상품 사이즈</h3>
                        </div>
                        <p>작은 사이즈부터 입력해주세요. (작은 사이즈가 위로)</p>
                        <p>모든 사이즈 부위의 사이즈 정보를 입력할 필요는 없어요.</p>
                        <p>입력한 부위의 수치 정보는 중간에 비어있으면 안 돼요. 모든 사이즈에 해당 부위의 수치정보가 입력되어야해요.</p>
                        <div className="size-input">
                            <table>
                                <thead>
                                    <tr>
                                        <th>사이즈 명</th>
                                        {
                                            rateNameArray.map((element, index) => (
                                                <th key={index}>{element[1]}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody ref={inputSizeRef}>
                                    {
                                        sizeData.map((element, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="text" name="name" defaultValue={element?.name} />
                                                </td>
                                                {
                                                    rateNameArray.map((rate, index2) => (
                                                        <td key={index2}>
                                                            <input type="number" name={rate[0]} defaultValue={element[rate[0]]} />
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <h3>(단위 cm)</h3>
                        <div className="btn-frame">
                            <button onClick={() => event.plus()} style={{backgroundColor: "#00966B"}} title="사이즈 추가">
                                <i className="material-icons">add</i>
                            </button>
                            <button onClick={() => event.minus()} style={{backgroundColor: "#ff6347"}} title="사이즈 제거">
                                <i className="material-icons">remove</i>
                            </button>
                        </div>
                        <div className="send-frame">
                            <button onClick={() => event.edit()}>상품 정보 수정</button>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}
export default ProductEdit;