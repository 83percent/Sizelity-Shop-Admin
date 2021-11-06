import { useState } from 'react';
import CustomButtonModule from '../../../contents/js/etc/CustomButton';

// CSS
import '../../../contents/css/etc/CustomButtonDesign.css';
import CustomButton from './CustomButton';
import CustomCurrent from './CustomCurrent';
import CustomPosition from './CustomPosition';

const CustomButtonDesign = () => {
    // State
    const [options, setOptions] = useState({
        icon : {
            type: "ruler", // logo || ruler || checkroom || emotion
            size: "2",
            color: "#ffffff"
        },
        text : {
            use: false,
            value: "사이즈 비교",
            color: "#ffffff",
            size: 8,
            weight: 400,
            margin: 0,
            align: "left" // top || right || left || bottom
        },
        background: {
            shape: "round", // square || round
            size: "3.7",
            width: "3.7",
            color: "#00966B",
            radius: 0
        }
    });
    const [position, setPosition] = useState({vertical: 12, horizontal: 12, align: "right"});
    const [saveCustomButton, setSaveCustomButton] = useState(CustomButtonModule.get());

    const event = {
        copy : function(target) {
            const content = target.parentElement.querySelector("textarea");
            content.select();
            document.execCommand('copy');

            window.alert("복사되었습니다.");
        },
        setMenuToggle: function(target) {
            if(!target) return;
            for(let i=0; i<5; i++) {
                if(target.nodeName === 'SECTION') {
                    target.classList.toggle("on");
                    break;
                } else {
                    target = target.parentElement;
                }
            }
        },
        getIconCode: function(value) {
            switch(value) {
                case "logo" : return `
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                `;
                case "ruler" : return `
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/>
                `
                case "checkroom" : return `
                    <g><rect fill="none" height="24" width="24"/><path d="M21.6,18.2L13,11.75v-0.91c1.65-0.49,2.8-2.17,2.43-4.05c-0.26-1.31-1.3-2.4-2.61-2.7C10.54,3.57,8.5,5.3,8.5,7.5h2 C10.5,6.67,11.17,6,12,6s1.5,0.67,1.5,1.5c0,0.84-0.69,1.52-1.53,1.5C11.43,8.99,11,9.45,11,9.99v1.76L2.4,18.2 C1.63,18.78,2.04,20,3,20h9h9C21.96,20,22.37,18.78,21.6,18.2z M6,18l6-4.5l6,4.5H6z"/></g>
                `
                case "emotion" : return `
                    <path d="M0 0h24v24H0V0z" fill="none"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                `
                default : return null;
            }
        },
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
                    zIndex: "888",
                    position: "absolute",
                    right : `${position.align === "right" ? `${position.horizontal}px` : "auto"}`,
                    left : `${position.align === "left" ? `${position.horizontal}px` : "auto"}`,
                    bottom: `${position.vertical}px`,
                    width: `${options.background.shape === 'round' ? `${options.background.size}rem` : `${options.background.width}rem`}`,
                    height: `${options.background.size}rem`,
                    display: "flex",
                    flexDirection: `${['top', 'bottom'].includes(options.text.align) ? 'column' : 'row'}`,
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: `${options.background.shape === 'round' ? '50%' : `${options.background.radius}px`}`,
                    backgroundColor: `${options.background.color}`}}>
                        {
                            options.text.use && ['top', 'right'].includes(options.text.align) ? (
                                <p style={{
                                    color: `${options.text.color}`,
                                    fontSize: `${options.text.size}px`,
                                    fontWeight: `${options.text.weight}`,
                                    margin: `${options.text.align === 'top' ? `0 0 ${options.text.margin}px 0` : `0 ${options.text.margin}px 0 0`}`,
                                    fontFamily: 'sans-serif',
                                    whiteSpace: "nowrap"
                                }}>{options.text.value}</p>
                            ) : null
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" height={`${options.icon.size}rem`} viewBox="0 0 24 24" width={`${options.icon.size}rem`} fill={options.icon.color}>
                            {this.getIcon(options.icon.type)}
                        </svg>
                        {
                            options.text.use && ['bottom', 'left'].includes(options.text.align) ? (
                                <p style={{
                                    color: `${options.text.color}`,
                                    fontSize: `${options.text.size}px`,
                                    fontWeight: `${options.text.weight}`,
                                    margin: `${options.text.align === 'bottom' ? `${options.text.margin}px 0 0 0` : `0 0 0 ${options.text.margin}px`}`,
                                    fontFamily: 'sans-serif',
                                    whiteSpace: "nowrap"
                                }}>{options.text.value}</p>
                            ) : null
                        }
                </button>
            )
        },
        save: function(value) {
            if(saveCustomButton?.length < 5) {
                CustomButtonModule.set(value);
                if(saveCustomButton?.length > 0) setSaveCustomButton([...saveCustomButton, value]);
                else setSaveCustomButton([value]);
            } else {
                window.alert("최대 5개 까지 저장됩니다.");
            }
        },
        removeCustomButton: function(index) {
            CustomButtonModule.remove(index);
            const __clone = JSON.parse(JSON.stringify(saveCustomButton));
            __clone.splice(index,1);
            setSaveCustomButton(__clone);
        }
    }

    return (
        <article id="custom-design">
            <div>
                <div className="preview">
                    <p>미리보기</p>
                    {
                        event.getPreviewButton()
                    }
                </div>
                <div className="handler">
                    <CustomCurrent
                        setMenuToggle={event.setMenuToggle}
                        saveCustomButton={saveCustomButton}
                        setCustomButton={setOptions}
                        removeCustomButton={event.removeCustomButton}/>
                    <CustomButton
                        setMenuToggle={event.setMenuToggle}
                        options={options}
                        setOptions={setOptions}
                        setSaveCustomButton={event.save} />
                    <CustomPosition setMenuToggle={event.setMenuToggle} position={position} setPosition={setPosition} />
                </div>
            </div>
            <h3>HTML 코드</h3>
            <textarea readOnly value={
                `<button
                 onclick="location.href='https://www.sizelity.com/compare?domain='+encodeURIComponent(location.href)"
                 style="
                  all:unset;
                  z-index:999;
                  position:fixed;
                  bottom:${position.vertical}px;
                  ${position.align === "left" ? "left" : "right"}:${position.horizontal}px;
                  width:${options.background.shape === 'round' ? `${options.background.size}rem` : `${options.background.width}rem;`}
                  height:${options.background.size}rem;
                  border:none;
                  border-radius:${options.background.shape === 'round' ? '50%' : `${options.background.radius}px`};
                  display:flex;
                  flex-direction: ${['top', 'bottom'].includes(options.text.align) ? 'column' : 'row'};
                  align-items:center;
                  justify-content:center;
                  background-color:${options.background.color};
                  cursor: pointer;">
                   ${
                    options.text.use && ['top', 'right'].includes(options.text.align) ? (`
                        <p style="
                            color:${options.text.color};
                            font-size:${options.text.size}px;
                            font-weight: ${options.text.weight};
                            margin: ${options.text.align === 'top' ? `0 0 ${options.text.margin}px 0` : `0 ${options.text.margin}px 0 0`};
                            font-family: 'sans-serif';
                            white-space: nowrap;
                        ">${options.text.value}</p>
                    `) :""
                   }
                   <svg xmlns="http://www.w3.org/2000/svg" height="${options.icon.size}rem" viewBox="0 0 24 24" width="${options.icon.size}rem" fill="${options.icon.color}">
                        ${event.getIconCode(options.icon.type)}
                    </svg>
                    ${
                        options.text.use && ['bottom', 'left'].includes(options.text.align) ? (`
                            <p style="
                                color:${options.text.color};
                                font-size:${options.text.size}px;
                                font-weight: ${options.text.weight};
                                margin: ${options.text.align === 'bottom' ? `${options.text.margin}px 0 0 0` : `0 0 0 ${options.text.margin}px`};
                                font-family: 'sans-serif';
                                white-space: nowrap;
                            ">${options.text.value}</p>
                        `) :""
                       }
                  </button>
                  `
            } />
            <button className="copy" onClick={e => event.copy(e.target)}>복사</button>
        </article>
    )
}
export default CustomButtonDesign;