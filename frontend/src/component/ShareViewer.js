import { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';

// CSS
import '../contents/css/etc/ShareViewer.css';

const ShareViewer = ({value, setValue}) => {
    const {shop, no, pname, sname} = value;

    const shareFrame = useRef(null);

    const event = {
        copy: function(target) {
            const content = target.parentElement.querySelector("textarea");
            content.select();
            document.execCommand('copy');

            window.alert("복사되었습니다.");
        }, //copy(target)
        listToggle : function(target) {
            for(let i=0; i<5; i++) {
                if(target.classList.contains("cate")) {
                    target.classList.toggle("on");
                    break;
                } else target = target.parentElement;
            }
        }, // listToggle
        close: function() {
            shareFrame.current.parentElement.classList.remove("active");
            shareFrame.current.classList.remove("active");
            setValue(null);

        }
    }
    useEffect(() => {
        shareFrame.current.parentElement?.classList.add("active");
        setTimeout(() => {
            shareFrame.current.classList.add("active");
        }, 100)
    }, [value]);
    return (
        <article id="Share">
            <div ref={shareFrame}>
                <h1>내보내기</h1>
                <p>상품 사이즈비교를 고객과 공유할 수 있는 다양한 방법.</p>
                <p>자동연결이 설정되지 않은 경우 아래 방법으로 고객의 사이즈비교를 도와주세요.</p>
                <button onClick={() => event.close()}>
                    <i className="material-icons">close</i>
                </button>
                <ul>
                    <li className="cate">
                        <div className="title" onClick={e => event.listToggle(e.target)}>
                            <i className="material-icons">attachment</i>
                            <h2>링크</h2>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="info">
                            <div className="link">
                                <textarea readOnly value={
                                    `https://www.sizelity.com/compare?shop=${shop}&no=${no}`
                                }></textarea>
                                <button onClick={e => event.copy(e.target)}>URL 복사</button>
                            </div>
                            <p>!. 소스를 복사한 후, 원하는 곳에 붙여넣기(Ctrl+v) 해주세요.</p>
                        </div>
                    </li>
                    <li className="cate">
                        <div className="title" onClick={e => event.listToggle(e.target)}>
                            <i className="material-icons">qr_code</i>
                            <h2>QR 코드</h2>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="info">
                            <div className="qr">
                                {
                                    value ? (
                                        <QRCode value={`https://www.sizelity.com/compare?shop=${shop}&no=${no}`} />
                                    ) : null
                                }
                            </div>
                            <p>!. QR코드를 캡쳐 후, 원하는 곳에 삽입해주세요.</p>
                        </div>
                    </li>
                    <li className="cate">
                        <div className="title" onClick={e => event.listToggle(e.target)}>
                            <i className="material-icons">content_copy</i>
                            <h2>링크 카드</h2>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="info">
                            <pre>
                                <div href={`https://www.sizelity.com/compare?shop=${shop}&no=${no}`} target="_blank">
                                    <img src="https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/systemimage/sizelity_link_service_front_image.png" alt="사이즈리티" style={{}}/>
                                </div>
                                <div className="_b">
                                    <p>{sname}</p>
                                    <h2>{pname}</h2>
                                </div>
                            </pre>
                            <div className="html">
                                <textarea readOnly id="html" value={
                                    `
                                        <a href="https://www.sizelity.com/compare?shop=${shop}&no=${no}" target="_blank">
                                            <img src="https://sizelityimagebucket.s3.ap-northeast-2.amazonaws.com/systemimage/sizelity_link_service_front_image.png" style="border:1px solid #ccc; vertical-align: bottom; max-width: 500; width: 100%; max-height: 310px; height: auto;" alt="내옷과 비교하고 나에게 맞는 사이즈 찾기">
                                        </a>
                                        <div style="overflow:hidden;padding:12px 0px;border:1px solid #dfdfdf;border-color:rgba(0,0,0,.1);border-radius:0 0 2px 2px;background-color:#f9f9f9; max-width:501px; width: 100%;">
                                            <p style="margin: 0 0 0 3px;font-size: 0.9rem; padding: 0 11px;">${sname}</p>
                                            <h2 style="margin: 0;font-size: 1.5rem; padding: 0 11px;">${pname}</h2>
                                        </div>
                                    `
                                }>
                                </textarea>
                                <button onClick={(e) => event.copy(e.target)}>HTML 태그 복사</button>
                            </div>
                            <p>!. 소스를 복사한 후, 원하는 곳에 붙여넣기(Ctrl+v) 해주세요.</p>
                        </div>
                    </li>
                </ul>

                
            </div>
        </article>
    )
}

export default ShareViewer;