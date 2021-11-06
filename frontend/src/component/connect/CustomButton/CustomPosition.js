import { memo } from "react";

const CustomPosition = ({position, setPosition, setMenuToggle}) => {
    const event = {
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
        getClone: function() {
            return JSON.parse(JSON.stringify(position));
        },
        setAlign: function(value) {
            const __position = this.getClone();
            __position.align = value;
            setPosition(__position);
        },
        setPosition: function(type, value) {
            const __position = this.getClone();
            __position[type] = value;
            setPosition(__position);
        }
    }

    return (
        <section className="custom-button" >
            <div className="title" onClick={e => setMenuToggle(e.target)}>
                <h2>위치</h2>
                <i className="material-icons">expand_more</i>
            </div>
            <main>
                <ul>
                    <li>
                        <div className="sub-title" onClick={e => event.setOptionToggle(e.target)}>
                            <div className="dot"></div>
                            <h3>정렬</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="frame">
                            <div className="select-row">
                                <label>
                                    <div className={`align left ${position.align === "left" ? "on" : ""}`} title="완쪽 정렬">
                                        <div></div>
                                    </div>
                                    <input type="radio" name="button-align" value="left" onChange={e => event.setAlign(e.target.value)}/>
                                </label>
                                <label>
                                    <div className={`align right ${position.align === "right" ? "on" : ""}`} title="오른쪽 정렬">
                                        <div></div>
                                    </div>
                                    <input type="radio" name="button-align" value="right" onChange={e => event.setAlign(e.target.value)}/>
                                </label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="sub-title" onClick={e => event.setOptionToggle(e.target)}>
                            <div className="dot"></div>
                            <h3>간격</h3>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <div className="frame">
                            <div className="select-range">
                                <h3>{position.horizontal}px</h3>
                                <p>좌우 간격</p>
                                <input type="range" min="0" max="353" defaultValue={position.horizontal} onChange={e => event.setPosition("horizontal",e.target.value)}/>
                            </div>
                            <div className="select-range">
                                <h3>{position.vertical}px</h3>
                                <p>아래 간격</p>
                                <input type="range" min="0" max="353" defaultValue={position.vertical} onChange={e => event.setPosition("vertical",e.target.value)}/>
                            </div>
                        </div>
                    </li>
                </ul>
            </main>
        </section>
    )
}

export default memo(CustomPosition);