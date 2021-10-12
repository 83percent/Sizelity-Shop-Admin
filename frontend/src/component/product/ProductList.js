import ProductModule from '../../contents/js/product/Product'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getTypeName } from '../../contents/js/ProductType';
import { transformDate } from '../../contents/js/DateFormat';
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import ShareViewer from '../ShareViewer';

// Context
import { ServerContext } from '../../App';

// CSS
import '../../contents/css/product/ProductList.css';


const ProductList = ({history}) => {
    // State
    const [products, setProducts] = useState(undefined);
    const [detail, setDetail] = useState(null);
    const [share, setShare] = useState(null);

    // Ref
    const choiceCount = useRef(0);
    const deleteRef = useRef(null);

    // Context
    const server = useContext(ServerContext);
    
    // Memo
    const productModule = useMemo(() => {
        return new ProductModule(server);
    }, [server]);

    // Callback
    const getProducts = useCallback(async (count) => {
        const response = await productModule.getList(count);
        switch(response.type) {
            case 'success' : {
                if(products === undefined) setProducts(response.data);
                else setProducts([...products, ...response.data]);
                break;
            }
            case 'error' :
            default : {
                if(products === undefined) setProducts(null);
                window.alert(response?.msg || "문제가 발생했습니다.");
                break;
            }
        }
    }, [productModule, products]);

    const event = {
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
                    if(elements[index]?.checked) deletes.push(products[index]._id);
                }
                if(deletes.length > 0) {
                    const response = await productModule.removes(deletes);

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
        }, // deletes
        edit : function(data) {
            if(!window.confirm("상품 정보를 수정할까요?")) return;
            history.push("/product/edit", {data})
        } // edit(data)
    }

    useEffect(() => {
        if(products === undefined) getProducts(0);
    }, [products, getProducts]);

    if(products === undefined) {
        return (
            <main id="product" className="list">
                <div className="loader-frame">
                    <div className="loader"></div>
                </div>
            </main>
        )
    } else {
        if(products === null) {
            return (
                <main id="product" className="list">
                    <div className="none">
                        <h2>아직 상품 등록을 하지 않았구요?</h2>
                        <Link to="/product/add">
                            <p>상품 추가</p>
                            <i className="material-icons">chevron_right</i>
                        </Link>
                    </div>
                </main>
            )
        } else {
            return (
                <main id="product" className="list">
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
                            products.map((element, index) => (
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
                        (products === undefined || products.length === 0) ? null : (products.length%20 === 0) ? (
                            <div className="more-btn">
                                <button onClick={() => getProducts(products.length)}>더 보기</button>
                            </div>
                        ) : null
                    }
                    <div className="delete-btn">
                        <button ref={deleteRef} onClick={() => event.delete()}>
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                    {
                        share ? (
                            <ShareViewer value={share} setValue={setShare}/>
                        ) : null
                    }
                    <ProductDetail detail={detail} setDetail={setDetail}/>

                </main>
            )
        }
    }

}

export default ProductList;