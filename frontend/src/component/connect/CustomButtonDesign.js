import { useState } from 'react';

// CSS
import '../../contents/css/etc/CustomButtonDesign.css';

const CustomButtonDesign = () => {

    // State    
    const [backColor, setBackColor] = useState("#00966B");
    const [baseColor, setBaseColor] = useState("#ffffff");
    const [bottom, _setBottom] = useState("12");
    const [right, _setRight] = useState("12");

    const event = {

        setBottom : function(value) {
            try {
                if(Number(value) < 0) {
                    window.alert("위치를 0 이하로 지정할 수 없습니다.");
                    _setBottom("0")
                    return;
                } else if(Number(value) > 763) {
                    window.alert("위로 764px 이상 설정할 수 없습니다.");
                    _setBottom("763")
                    return;
                }
                _setBottom(value);
            } catch {
                return window.alert("잘못된 입력입니다.");
            }
            
        },
        setRight: function(value) {
            try {
                if(Number(value) < 0) {
                    window.alert("위치를 0 이하로 지정할 수 없습니다.");
                    _setRight("0")
                    return;
                } else if(Number(value) > 352) {
                    window.alert("왼쪽으로 353px 이상 설정할 수 없습니다.");
                    _setRight("352")
                    return;
                }
                _setRight(value);
            } catch {
                return window.alert("잘못된 입력입니다.");
            }
        },
        copy : function(target) {
            const content = target.parentElement.querySelector("textarea");
            content.select();
            document.execCommand('copy');

            window.alert("복사되었습니다.");
        }
    }

    return (
        <article id="custom-design">
            <div>
                <div className="preview">
                    <p>미리보기</p>
                    <div style={{width: "3.7rem", height: "3.7rem", display: "flex", alignItems: "center",justifyContent: "center",borderRadius: "50%",backgroundColor: backColor || "#00966B", bottom: `${bottom || 12}px`, right: `${right || 12}px`}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 24 24" width="2rem" fill={baseColor || "#ffffff"}>
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                        </svg>
                    </div>
                </div>
                <div className="handler">
                    <ul>
                        <li className="position">
                            <div className="title">
                                <div className="dot"></div>
                                <h3>위치</h3>
                            </div>
                            <p>자동연결 버튼이 다른 버튼을 가리지 않게 위치를 조정해요.</p>
                            <div>
                                <i className="material-icons">arrow_back</i>
                                <p>왼쪽</p>
                                <input
                                    type="number"
                                    onChange={e => event.setRight(e.target.value)}
                                    defaultValue={right}
                                    min="0"/>
                                <h4>px</h4>
                            </div>
                            <div>
                                <i className="material-icons">arrow_upward</i>
                                <p>위</p>
                                <input
                                    type="number"
                                    onChange={e => event.setBottom(e.target.value)}
                                    defaultValue={bottom}/>
                                <h4>px</h4>
                            </div>
                        </li>
                        <li className="color">
                            <div className="title">
                                <div className="dot"></div>
                                <h3>색상</h3>
                            </div>
                            <p>쇼핑몰과 어울리는 색상을 입력해주세요. (HEX 값 입력 ex. #dd1818)</p>
                            <div>
                                <div className="color" style={{backgroundColor: baseColor || "#ffffff"}}></div>
                                <p>아이콘</p>
                                <input
                                    type="text"
                                    onChange={e => setBaseColor(e.target.value)}
                                    defaultValue={baseColor}
                                    placeholder="#ffffff"/>
                            </div>
                            <div>
                                <div className="color" style={{backgroundColor: backColor || "#00966B"}}></div>
                                <p>배경</p>
                                <input
                                    type="text"
                                    onChange={e => setBackColor(e.target.value)}
                                    defaultValue={backColor}
                                    placeholder="#00966B"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <h3>HTML 코드</h3>
            <textarea readOnly value={`<button onclick="location.href='https://www.sizelity.com/compare?domain='+encodeURIComponent(location.href)" style="all:unset; position: fixed; z-index: 999; bottom: ${bottom || 12}px; right: ${right || 12}px;"><div style="cursor:pointer;width: 3.7rem; height: 3.7rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: ${backColor || "#00966B"};"><svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 24 24" width="2rem" fill="${baseColor || "#ffffff"}"><path d="M0 0h24v24H0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg></div></button>`}>
                
            </textarea>
            <button className="copy" onClick={e => event.copy(e.target)}>복사</button>
        </article>
    )
}
export default CustomButtonDesign;