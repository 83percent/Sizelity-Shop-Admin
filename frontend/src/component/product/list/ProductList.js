import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ProductType from '../../../contents/js/ProductType';
import DataFormat from '../../../contents/js/DateFormat';
import ProductModule from '../../../contents/js/product/Product';

// Component
import ProductDetail from '../ProductDetail';
import ShareViewer from '../../ShareViewer';

// Context
import { ServerContext } from '../../../App';

// CSS
import '../../../contents/css/product/ProductList.css';

const ProductList = () => {
    //State
    const [datas, setDatas] = useState([]);
    const [detail, setDetail] = useState(null);
    const [share, setShare] = useState(null);

    // Context
    const server = useContext(ServerContext);

    // Memo
    const productModule = useMemo(() => {
        return new ProductModule(server);
    }, [server])

    // CallBack
    const getDatas = useCallback(async (count) => {
        const response = await productModule.getList(count);
        switch(response.type) {
            case 'success' : {
                if(count === 0) {
                    setDatas(response.data);
                } else {
                    setDatas([...datas, ...response.data]);
                }
                break;
            }
            case 'error' :
            default : {
                return window.alert(response.msg || "문제가 발생했습니다.");
            }
        }
        
    }, [productModule, datas, setDatas]);

    const event = {
        share : function(element) {
            setShare({
                shop : element.praw.domain,
                no : element.praw.code,
                pname : element.info.pname,
                sname : element.info.sname
            })
        },
        remove : async function(target, id) {
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
                case 'error' :
                default : {
                    return window.alert("문제가 발생했습니다.");
                }
            }
        }
    }

    useEffect(() => {
        if(datas.length === 0) getDatas();
    }, [datas, getDatas]);
    return (
        <>
        <main id="product" className="list">
            <ul>
                <li>
                    <p>no.</p>
                    <h4>상품명</h4>
                    <p>대분류</p>
                    <p>소분류</p>
                    <p>등록날짜</p>
                    <p>Fnc.</p>
                </li>
                {
                    datas.map((data, index) => (
                        <li key={index} onClick={() => setDetail(data)}>
                            <p>{index+1}</p>
                            <h4>{data.info.pname}</h4>
                            <p>{ProductType.getTypeName(data.info.ptype)}</p>
                            <p>{data.info.subtype}</p>
                            <p>{DataFormat.transformDate(data.reg_date)}</p>
                            <div>
                                <a href={`http://${data.praw.full}`} rel="noreferrer" target="_blank">
                                    <i className="material-icons">open_in_new</i>
                                </a>
                                <button onClick={e => {e.stopPropagation(); event.share(data);}}>
                                    <i className="material-icons">share</i>
                                </button>
                                <button onClick={e => {e.stopPropagation(); event.remove(e.target, data._id)}}>
                                    <i className="material-icons">delete</i>
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                datas.length !== 0 && datas.length % 40 === 0  ? (
                    <button onClick={() => getDatas(datas.length)}>더보기</button>
                ) : null
            }
        </main>
        {
            share ? (
                <ShareViewer value={share} setValue={setShare} />
            ) : null
        }
        <ProductDetail detail={detail} setDetail={setDetail}/>
        </>
    )
}

export default ProductList;