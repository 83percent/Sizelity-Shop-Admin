import { useContext, useEffect, useMemo, useRef, useState } from "react";
import URLModule from '../../../contents/js/URL';

// Context
import { UserContext } from "../../../App";

const ProductCreateStep1 = ({product, move, ProductModule, setProductInfo}) => {
    // Stete
    const [info, setInfo] = useState(product?.praw || null);

    // Context
    const { user } = useContext(UserContext);

    // Memo
    const urlModule = useMemo(() => {
        return new URLModule();
    }, []);
    const options = useMemo(() => {
        if(!info) return { search: false, auto: false };
        
        if(info.type === "auto") return { search: false, auto: false };
        else if(['smartstore','products','blog'].includes(info.type)) return {search: true, auto: false};
        else return {search: true, auto: true};
    }, [info]);

    // Ref
    const urlInput = useRef(null);
    const nextBtn = useRef(null);
    const cautionText = useRef(null);
    const fncWrapper = useRef(null);

    const event = {
        pass: async function(value) {
            if(value.length < 10) return this.setCaution("주소가 너무 짧아요.");
            if(value.length > 150) return this.setCaution("주소가 너무 길어요.");
            else this.setCaution("", false);
            try {
                new URL(value);
                this.setCaution("", false);
            } catch {
                return this.setCaution("주소 형식(URL)이 올바르지 않습니다.");
            }
            const __analyze = urlModule.get(value);

            if(info) {
                if(__analyze) {
                    if(info.domain === __analyze?.domain && info.code === __analyze?.code) return;
                } else {
                    if(value === info.full) return;
                }
                fncWrapper.current.classList.remove('active');
            }
            if(!__analyze?.code) {
                console.log(value);
                // 자동 생성 사용
                const autoCreate = await ProductModule.getNextProductIndex();
                switch(autoCreate.type) {
                    case 'success' : {
                        try {
                            if(Number(autoCreate.data?.lastIndex) >= 0) {
                                // 라스트 인덱스 데이터 정상 유입
                                setInfo({
                                    domain: user.domain,
                                    type: "auto",
                                    code: Number(autoCreate.data.lastIndex)+1,
                                    full: value
                                });
                                this.setCaution("", false);
                            } else {
                                window.alert("문제가 발생했습니다.");
                                return setInfo(null);
                            }
                        } catch {
                            window.alert("문제가 발생했습니다.");
                            return setInfo(null);
                        }
                        break;
                    }
                    case 'error' :
                    default : {
                        return window.alert(autoCreate?.msg || "문제가 발생했습니다.");
                    }
                }
            } else {
                // 소호 쇼핑몰 상품
                if(__analyze?.domain && __analyze?.domain !== user.domain) {
                    return this.setCaution("다른 쇼핑몰 상품입니다.");
                }
                const exist = await ProductModule.isExist(__analyze.code);
                if(exist.data.exist) {
                    return this.setCaution("이미 추가된 상품입니다.");
                } else {
                    setInfo(__analyze);
                }
            }
        },
        setCaution: function(text, reset) {
            cautionText.current.innerText = text;
            if(text !== "") fncWrapper.current.classList.remove("active");
            if(reset === undefined || reset) setInfo(null);
        },
        next : function() {
            if(!info) return window.alert("상품 주소 '확인'을 진행해주세요.");
            
            try {
                const value = urlInput.current.value;
                if(!value) return window.alert("상품 주소 '확인'을 진행해주세요.");
                new URL(value);
                const __analyze = urlModule.get(value);
                if(__analyze) {
                    if(info.domain !== __analyze?.domain || info.code !== __analyze?.code) return window.alert("상품 주소 '확인'을 진행해주세요.");
                } else {
                    if(value !== info.full) return window.alert("상품 주소 '확인'을 진행해주세요.");
                }
            } catch {
                return window.alert("상품 주소 '확인'을 진행해주세요.")
            }
            setProductInfo('praw', info);
            move();
        }
    }

    useEffect(() => {
        if(info && fncWrapper?.current) {
            fncWrapper.current.classList.add("active");
        }
    }, [info, fncWrapper])
    return (
        <section className="step1">
            <h2>상품 주소 입력</h2>
            <p>추가하려는 상품의 주소(URL)를 붙여넣어 주세요.</p>
            <p>추가가 가능한 상품인지 확인합니다.</p>
            <div className="input-frame">
                <input
                    type="url"
                    ref={urlInput}
                    onKeyDown={e => {if(e.key === 'Enter' && e.target.value.length > 6) event.pass(e.target.value)}}
                    onFocus={e => e.target.select()}
                    defaultValue={product?.praw?.full}/>
                <button className='next' ref={nextBtn} onClick={() => event.pass(urlInput.current.value)}>
                    확인
                </button>
            </div>
            <p className="caution" ref={cautionText}></p>
            <div className="fnc-wrapper">
                <div className={info ? 'active' : ""} ref={fncWrapper}>
                    <h3>지원 기능</h3>
                    <ul>
                        <li className={options.search ? null : "off"}>
                            <i className="material-icons">search</i>
                            <h4>검색</h4>
                            <p>사이즈리티 검색창에 주소를 붙여넣어 상품을 검색할 수 있습니다.</p>
                        </li>
                        <li className={options.auto ? null : "off"}>
                            <i className="material-icons">autorenew</i>
                            <h4>자동 연결</h4>
                            <p>쇼핑몰 연동 버튼을 통해 자동으로 사이즈 비교를 제공합니다.</p>
                        </li>
                        <li>
                            <i className="material-icons">link</i>
                            <h4>링크</h4>
                            <p>사이즈 비교 화면으로 바로 이동하는 링크를 생성하고 제공합니다.</p>
                        </li>
                        <li>
                            <i className="material-icons">qr_code</i>
                            <h4>QR코드</h4>
                            <p>QR스캔을 통해 등록하려는 상품의 사이즈 비교화면으로 바로 이동합니다.</p>
                        </li>
                    </ul>
                    <button onClick={() => event.next()}>
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductCreateStep1;