import '../../../contents/css/connect/custom/CustomCurrent.css';

const CustomCurrent = ({setMenuToggle, saveCustomButton, setCustomButton, removeCustomButton}) => {
    console.log(saveCustomButton);
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
        getPreviewButton : function(_options) {
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
        }
    }
    if(!saveCustomButton || saveCustomButton.length === 0) return null;
    return (
        <section id="custom-current" className="on">
            <div className="title" onClick={e => setMenuToggle(e.target)}>
                <h2>저장된 디자인</h2>
                <i className="material-icons">expand_more</i>
            </div>
            <main>
                
                <ul>
                    {
                        saveCustomButton.map((element, index) => {
                            return (
                                <li key={index} >
                                    <div className="close" onClick={() => removeCustomButton(index)}>
                                        <i className="material-icons">close</i>
                                    </div>
                                    <div className="preview" onClick={() => setCustomButton(element)}>
                                        {event.getPreviewButton(element)}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </section>
    )
}

export default CustomCurrent