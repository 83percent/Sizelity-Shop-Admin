import { useCallback, useContext, useEffect, useState } from "react";
import ProductModule from '../../../contents/js/product/Product';
import ShareViewer from "../../ShareViewer";

// Context
import { ServerContext, UserContext } from "../../../App";
import { Link } from "react-router-dom";

const ProductCreateStep5 = ({init, product, history}) => {
    // State
    const [__shareProduct, __setShareProduct] = useState(null);
    const [loader, setLoader] = useState(true);
    const [result, setResult] = useState(undefined);

    // Context
    const { user } = useContext(UserContext);
    const server = useContext(ServerContext);

    // Callback
    const save = useCallback(async () => {
        try {
            const {praw, info, size} = product;
            if(!praw.domain || !praw.code || !praw.type || !praw.full) return setResult(false);
            if(!info.pname || !info.sname || !info.subtype || !info.ptype) return setResult(false);
            if(size.length <= 0) return setResult(false);
            
            const response = await new ProductModule(server).create({
                shopRef: user._id,
                data : product
            });
            setLoader(false);
            setResult(response);
            
        } catch {
            history.push('/wrong');
        }
    }, [server, product]);
    const event = {
        onShareViewer : function() {
            __setShareProduct({
                shop : product.praw.domain,
                no : product.praw.code,
                pname: product.info.pname,
                sname: product.info.sname
            });
        }
    }

    useEffect(() => {
        if(loader) {
            console.log("상품 저장 요청 보냄")
            save();
        }
    }, [loader, save])

    return (
        <section className="step5">
            {
                loader ? (
                    <>
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                    <p>상품 저장중...</p>
                    </>
                ) : (
                    result ? (
                        <>
                        {
                            __shareProduct ? (
                                <ShareViewer value={__shareProduct} setValue={__setShareProduct} />
                            ) : null
                        }
                        <div className="success-wrapper">
                            <h2>상품 등록이 완료 되었습니다.</h2>
                            <article className="link">
                                <p>등록한 상품의 사이즈 비교 링크</p>
                                <div>
                                    <p>https://www.sizelity.com/compare?shop={result.shop}&no={result.code}</p>
                                    <button>
                                        <i className="material-icons">content_copy</i>
                                    </button>
                                </div>
                            </article>
                            <article className="connect">
                                <div>
                                    <p>잠깐! 쇼핑몰 연동 하셨나요?</p>
                                    <Link to="/connect">
                                        <i className="material-icons">autorenew</i>
                                        <p>연동하기</p>
                                    </Link>
                                </div>
                                <div>
                                    <p>다양한 방법으로 사이즈비교를 제공해보세요.</p>
                                    <button onClick={() => event.onShareViewer()}>
                                        <i className="material-icons">share</i>
                                        <p>내보내기</p>
                                    </button>
                                </div>
                            </article>
                            <button onClick={() => init()}>
                                계속 추가하기
                            </button>
                        </div>
                        </>
                    ) : (
                        <div>
                            <p>저장에 실패했어요.</p>
                        </div>
                    )
                )
            }
        </section>
    )
}
export default ProductCreateStep5;