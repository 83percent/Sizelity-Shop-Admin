import { memo, useState } from 'react';

// CSS
import '../../../contents/css/etc/CustomButton.css';

const CustomButton = ({setMenuToggle, options, setOptions, setSaveCustomButton}) => {
    // State
    const [_options, _setOptions] = useState(options);
    const event = {
        getIcon : function(value) {
            switch(value) {
                case "logo" : return (
                    <>
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                    </>
                )
                case "ruler" : return (
                    <>
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/>
                    </>
                )
                case "checkroom" : return (
                    <>
                        <g><rect fill="none" height="24" width="24"/><path d="M21.6,18.2L13,11.75v-0.91c1.65-0.49,2.8-2.17,2.43-4.05c-0.26-1.31-1.3-2.4-2.61-2.7C10.54,3.57,8.5,5.3,8.5,7.5h2 C10.5,6.67,11.17,6,12,6s1.5,0.67,1.5,1.5c0,0.84-0.69,1.52-1.53,1.5C11.43,8.99,11,9.45,11,9.99v1.76L2.4,18.2 C1.63,18.78,2.04,20,3,20h9h9C21.96,20,22.37,18.78,21.6,18.2z M6,18l6-4.5l6,4.5H6z"/></g>
                    </>
                )
                case "emotion" : return (
                    <>
                        <path d="M0 0h24v24H0V0z" fill="none"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    </>
                )
                default : return null;
            }
        },
        getPreviewButton : function() {
            return (
                <button style={{
                    width: `${_options.background.shape === 'round' ? `${_options.background.size}rem` : `${_options.background.width}rem`}`,
                    height: `${_options.background.size}rem`,
                    display: "flex",
                    flexDirection: `${['top', 'bottom'].includes(_options.text.align) ? 'column' : 'row'}`,
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    borderRadius: `${_options.background.shape === 'round' ? '50%' : `${_options.background.radius}px`}`,
                    backgroundColor: `${_options.background.color}`}}>
                        {
                            _options.text.use && ['top', 'right'].includes(_options.text.align) ? (
                                <p style={{
                                    color: `${_options.text.color}`,
                                    fontSize: `${_options.text.size}px`,
                                    fontWeight: `${_options.text.weight}`,
                                    margin: `${_options.text.align === 'top' ? `0 0 ${_options.text.margin}px 0` : `0 ${_options.text.margin}px 0 0`}`,
                                    fontFamily: 'sans-serif',
                                    whiteSpace: "nowrap"
                                }}>{_options.text.value}</p>
                            ) : null
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" height={`${_options.icon.size}rem`} viewBox="0 0 24 24" width={`${_options.icon.size}rem`} fill={_options.icon.color}>
                            {this.getIcon(_options.icon.type)}
                        </svg>
                        {
                            _options.text.use && ['bottom', 'left'].includes(_options.text.align) ? (
                                <p style={{
                                    color: `${_options.text.color}`,
                                    fontSize: `${_options.text.size}px`,
                                    fontWeight: `${_options.text.weight}`,
                                    margin: `${_options.text.align === 'bottom' ? `${_options.text.margin}px 0 0 0` : `0 0 0 ${_options.text.margin}px`}`,
                                    fontFamily: 'sans-serif',
                                    whiteSpace: "nowrap"
                                }}>{_options.text.value}</p>
                            ) : null
                        }
                </button>
            )
        },
        getClone: function() {
            return JSON.parse(JSON.stringify(_options));
        },
        setColor: function(type, value) {
            const _optionClone = this.getClone();
            switch(type) {
                case "background" : {
                    _optionClone.background.color = value;
                    _setOptions(_optionClone);
                    break;
                }
                case "icon" : {
                    _optionClone.icon.color = value;
                    _setOptions(_optionClone);
                    break;
                }
                case "text" : {
                    _optionClone.text.color = value;
                    _setOptions(_optionClone);
                    break;
                }
                default : {}
            }
        },
        setIcon: function(type, value) {
            const _optionClone = this.getClone();
            _optionClone.icon[type] = value;
            _setOptions(_optionClone);
        },
        setBackground: function(type, value) {
            const _optionClone = this.getClone();
            _optionClone.background[type] = value;
            _setOptions(_optionClone);
        },
        setText: function(type, value) {
            const _optionClone = this.getClone();
            _optionClone.text[type] = value;
            _setOptions(_optionClone);
        },
        setOptionToggle: function(target) {
            for(let i=0; i<4; i++) {
                if(target.nodeName === "LI") {
                    target.classList.toggle("on");
                    break;
                } else {
                    target = target.parentElement;
                }
            }
        },
        apply: function() {
            setOptions(this.getClone());
        },
        save: function() {
            setSaveCustomButton(_options);
        },
        reset: function() {
            _setOptions(options);
        }
    }

    return (
        <section className="custom-button">
            <div className="title" onClick={e => setMenuToggle(e.target)}>
                <h2>버튼 디자인</h2>
                <i className="material-icons">expand_more</i>
            </div>
            <main>
                <div className="preview">
                    {
                        event.getPreviewButton()
                    }
                </div>
                <ul>
                    <li>
                        <div className="sub-title" onClick={e => event.setOptionToggle(e.target)}>
                            <div className="dot"></div>
                            <h3>아이콘</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="frame">
                            <div className="select-row">
                                <label>
                                    <div className={_options.icon.type === "logo" ? 'active' : ''}>
                                        <i className="material-icons">sell</i>
                                    </div>
                                    <input type="radio" name="icon" value="logo" onChange={e => event.setIcon("type",e.target.value)}/>
                                </label>
                                <label>
                                    <div className={_options.icon.type === "ruler" ? 'active' : ''}>
                                        <i className="material-icons">straighten</i>
                                    </div>
                                    <input type="radio" name="icon" value="ruler" onChange={e => event.setIcon("type",e.target.value)}/>
                                </label>
                                <label>
                                    <div className={_options.icon.type === "checkroom" ? 'active' : ''}>
                                        <i className="material-icons">checkroom</i>
                                    </div>
                                    <input type="radio" name="icon" value="checkroom" onChange={e => event.setIcon("type",e.target.value)}/>
                                </label>
                                <label>
                                    <div className={_options.icon.type === "emotion" ? 'active' : ''}>
                                        <i className="material-icons">sentiment_satisfied_alt</i>
                                    </div>
                                    <input type="radio" name="icon" value="emotion" onChange={e => event.setIcon("type",e.target.value)}/>
                                </label>
                            </div>
                            <div className="select-color">
                                <div className="color-view" style={{backgroundColor: `${_options.icon.color}`}}></div>
                                <p>아이콘 색상</p>
                                <input type="color" defaultValue={_options.icon.color} onChange={e => event.setIcon("color", e.target.value)}/>
                            </div>
                            <div className="select-range">
                                <h3>{_options.icon.size}rem</h3>
                                <p>아이콘 크기</p>
                                <input type="range" min="5" max="50" defaultValue={_options.icon.size*10} onChange={(e) => event.setIcon("size", e.target.value/10)}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="sub-title" onClick={e => event.setOptionToggle(e.target)}>
                            <div className="dot"></div>
                            <h3>배경</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="frame">
                            <div className="select-row">
                                <label>
                                    <div className={_options.background.shape === "round" ? 'active' : ''}>
                                        <i className="material-icons">radio_button_unchecked</i>
                                    </div>
                                    <input type="radio" name="icon" value="round" onChange={e => event.setBackground("shape", e.target.value)}/>
                                </label>
                                <label>
                                    <div className={_options.background.shape === "square" ? 'active' : ''}>
                                        <i className="material-icons">check_box_outline_blank</i>
                                    </div>
                                    <input type="radio" name="icon" value="square" onChange={e => event.setBackground("shape",e.target.value)}/>
                                </label>
                            </div>
                            <div className="select-color">
                                <div className="color-view" style={{backgroundColor: `${_options.background.color}`}}></div>
                                <p>배경 색상</p>
                                <input type="color" defaultValue={_options.background.color} onChange={e => event.setBackground("color", e.target.value)}/>
                            </div>
                            {
                                _options.background.shape === "square" ? (
                                    <div className="select-range">
                                        <h3>{_options.background.radius || 0}%</h3>
                                        <p>모서리 둥글기</p>
                                        <input type="range" min="0" max="50" defaultValue={_options.background.radius} onChange={e => event.setBackground("radius",e.target.value)}/>
                                    </div>
                                ): null
                            }
                            <div className="select-range">
                                <h3>{_options.background.size || 0}rem</h3>
                                <p>{_options.background.shape === 'round' ? '크기' : '세로 넓이'}</p>
                                <input type="range" min="10" max="50" defaultValue={_options.background.size*10} onChange={e => event.setBackground("size",e.target.value/10)}/>
                            </div>
                            {
                                _options.background.shape === "square" ? (
                                    <div className="select-range">
                                        <h3>{_options.background.width || 0}rem</h3>
                                        <p>가로 넓이</p>
                                        <input type="range" min="10" max="200" defaultValue={_options.background.width*10} onChange={e => event.setBackground("width",e.target.value/10)}/>
                                    </div>
                                ): null
                            }
                        </div>
                    </li>
                    <li>
                        <div className="sub-title" onClick={e => event.setOptionToggle(e.target)}>
                            <div className="dot"></div>
                            <h3>텍스트</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="frame">
                            <div className={`select-checkbox ${_options.text.use ? "on" : ""}`}>
                                <label>
                                    <p>{_options.text.use ? "활성화" : "비활성화"}</p>
                                    <input type="checkbox" defaultValue={_options.text.use} onChange={(e) => event.setText("use", e.target.checked)}/>
                                </label>
                            </div>
                            {
                                _options.text.use ? (
                                    <>
                                        <div className="input">
                                            <h3>텍스트</h3>
                                            <input type="text" defaultValue={_options.text.value} onChange={e => event.setText("value", e.target.value)}/>
                                        </div>
                                        <div className="select-row">
                                            <h3>정렬</h3>
                                            <label>
                                                <div className={_options.text.align === "right" ? 'active' : ''}>
                                                    <i className="material-icons">align_horizontal_right</i>
                                                </div>
                                                <input type="radio" name="align" value="right" onChange={e => event.setText("align",e.target.value)}/>
                                            </label>
                                            <label>
                                                <div className={_options.text.align === "top" ? 'active' : ''}>
                                                    <i className="material-icons">align_vertical_bottom</i>
                                                   </div>
                                                <input type="radio" name="align" value="top" onChange={e => event.setText("align",e.target.value)}/>
                                            </label>
                                            <label>
                                                <div className={_options.text.align === "left" ? 'active' : ''}>
                                                    <i className="material-icons">align_horizontal_left</i>
                                                </div>
                                                <input type="radio" name="align" value="left" onChange={e => event.setText("align",e.target.value)}/>
                                            </label>
                                            <label>
                                                <div className={_options.text.align === "bottom" ? 'active' : ''}>
                                                    <i className="material-icons">align_vertical_top</i>
                                                </div>
                                                <input type="radio" name="align" value="bottom" onChange={e => event.setText("align",e.target.value)}/>
                                            </label>
                                        </div>
                                        <div className="select-range">
                                            <h3>{_options.text.size}px</h3>  
                                            <p>폰트 크기</p>
                                            <input type="range" min="8" max="40" defaultValue={_options.text.size} onChange={(e) => event.setText("size",e.target.value)}/>
                                        </div>
                                        <div className="select-color">
                                            <div className="color-view" style={{backgroundColor: `${_options.text.color}`}}></div>
                                            <p>텍스트 색상</p>
                                            <input type="color" defaultValue={_options.text.color} onChange={e => event.setText("color", e.target.value)}/>
                                        </div>
                                        <div className="select-range">
                                            <h3>{_options.text.weight}</h3>  
                                            <p>폰트 굴기</p>
                                            <input type="range" min="1" max="9" defaultValue={_options.text.weight / 100} onChange={(e) => event.setText("weight",e.target.value*100)}/>
                                        </div>
                                        <div className="select-range">
                                            <h3>{_options.text.margin}</h3>  
                                            <p>아이콘과의 거리  </p>
                                            <input type="range" min="0" max="30" defaultValue={_options.text.margin} onChange={(e) => event.setText("margin",e.target.value)}/>
                                        </div>
                                    </>
                                ): null
                            }
                        </div>
                    </li>
                    <li className="button-wrapper">
                        <button className="apply" onClick={() => event.apply()}>
                            적용
                        </button>
                        <button className="save" onClick={() => event.save()}>
                            디자인 저장
                        </button>
                        <button className="reset" onClick={() => event.reset()}>
                            되돌리기
                        </button>
                    </li>
                </ul>
            </main>
        </section>
    )
}

export default memo(CustomButton);