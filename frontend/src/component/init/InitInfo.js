import { useEffect, useRef } from 'react';
import '../../contents/css/init/InitInfo.css';

const InitInfo = ({next, infoSetting, setInfo}) => {
    // ref
    const inputWrapper = useRef(null);

    function pass() {
        const inputs = inputWrapper.current.querySelectorAll('input');
        if(inputs.length > 0) {
            let error = false;
            const __infoObject = {};
            for(let input of inputs) {
                switch(input.name) {
                    case 'ceo' : {
                        if(!checking.name(input.value)) {
                            error = true;
                            break;
                        }
                        __infoObject[input.name] = input.value;
                        break;
                    }
                    case 'tel' : {
                        if(!checking.tel(input.value)) {
                            error = true;
                            break;
                        }
                        __infoObject[input.name] = input.value;
                        break;
                    }
                    case 'email' : {
                        if(!checking.email(input.value)) {
                            error = true;
                            break;
                        }
                        __infoObject[input.name] = input.value;
                        break;
                    }
                    case 'reg_number' : {
                        if(input.value.length > 20) {
                            error = true;
                            break;
                        } else {
                            if(input.value.length > 0) {
                                __infoObject[input.name] = input.value;
                            }
                        }
                        break;

                    }
                    case 'address' : {
                        if(input.value.length > 40) {
                            error = true;
                            break;
                        } else {
                            if(input.value.length > 0) {
                                __infoObject[input.name] = input.value;
                            }
                        }
                        break;
                    }
                    default : {
                        error = true;
                        break;
                    }
                }
                if(error) {
                    input.classList.add("wrong");
                    break;
                } else {
                    input.classList.remove("wrong");
                }
            }
            
            if(error) return;
            else {
                setInfo(__infoObject)
                next();
            }
        }
    }
    useEffect(() => {
        if(infoSetting) {
            for(let [key, value] of Object.entries(infoSetting)) {
                if(value) {
                    inputWrapper.current.querySelector(`input[name='${key}']`).value = value;
                }
            }
        }
    }, [infoSetting])
    const checking = {
        name : function(value) {
            if(!value) return false;
            if(value.length < 2 || value.length > 12) return false;
            else return true;
        },
        tel : function(value) {
            if(!value) return false;
            if(value.length < 7 || value.length > 14) return false;
            else return true;
        },
        email : function(value) {
            if(!value) return false;
            if(value < 6) return false;
            const isEmail = ((value) => {
                return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
            })(value);
            return isEmail;
        }
    }
    return (
        <>
            <header>
                <h1>?????? ??????</h1>
                <p>????????? ??????????????? ????????? ?????? ?????? ????????? ???????????????.</p>
            </header>
            <section>
                <div className="title">
                    <h2>????????? ?????? ??????</h2>
                    <p>????????? ????????? ?????? ????????? ???????????????.</p>
                </div>
                <ul ref={inputWrapper}>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>????????? ??????</p>
                            </div>
                            <input type="text" name="ceo" maxLength="20" placeholder="(?????? ??????) ????????? ??????" autoComplete="off"/>
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>?????????</p>
                            </div>
                            <input type="number" name="tel" maxLength="18" placeholder="(?????? ??????) '-'??? ????????? ????????? ??????" autoComplete="off" />
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>?????????</p>
                            </div>
                            <input type="email" name="email" maxLength="50" placeholder="(?????? ??????)" autoComplete="off"/>
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>????????? ??????</p>
                            </div>
                            <input type="text" maxLength="20" name="reg_number" placeholder="(?????? ??????)" autoComplete="off" />
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>????????? ?????????</p>
                            </div>
                            <input type="text" maxLength="50" name="address" placeholder="(?????? ??????)" autoComplete="off" />
                        </label>
                    </li>
                </ul>
            </section>
            <div className="btn-wrapper">
                <button className="next" onClick={() => pass()}>
                    <i className="material-icons">check</i>
                </button>
                <button className="previous" onClick={() => next(-1)}>
                    <p>?????? ??????</p>
                </button>
            </div>

        </>
    )
}

export default InitInfo;