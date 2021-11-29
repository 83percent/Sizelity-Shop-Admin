import { useEffect, useRef } from 'react';
import '../../contents/css/init/InitPassword.css';

const InitPassword = ({next, passwordSetting, setPassword}) => {
    // Ref
    const password = useRef(null);
    const rePassword = useRef(null);

    function pass() {
        const _p = password.current.value;
        if(_p.length >= 8 &&  _p.length <= 20) {
            const isPwd = ((value) => {
                return (/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(value);
            })(password);
            if(!isPwd) {
                password.current.classList.add("wrong");
                return false;
            } else {
                password.current.classList.remove("wrong");
            }
        } else {
            password.current.classList.add("wrong");
            return false;
        }

        try {
            if(_p === rePassword.current.value) {
                setPassword(_p);
                next();
            } else {
                rePassword.current.classList.add("wrong");
                return false;
            }
        } catch {
            return window.alert("문제가 발생했습니다.");
        }
        return;
    }

    useEffect(() => {
        if(passwordSetting) {
            password.current.value = passwordSetting;
        }
    }, [passwordSetting])

    return (
        <>
            <header>
                <h1>비밀번호</h1>
                <p>이후 로그인에 사용될 비밀번호를 설정합니다.</p>
            </header>
            <section>
                <div className="title">
                    <h2>비밀번호 설정</h2>
                </div>
                <ul>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>비밀번호</p>
                            </div>
                            <input type="password" maxLength="25" ref={password}/>
                            <div className="caution">
                                <p>영문 대,소문자와 숫자 및 특수문자를 포함한 8~20자</p>
                            </div>
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="sub-title">
                                <p>비밀번호 확인</p>
                            </div>
                            <input type="password" maxLength="25" ref={rePassword}/>
                        </label>
                    </li>
                </ul>
            </section>
            <div className="btn-wrapper">
                <button className="next" onClick={() => pass()}>
                    <i className="material-icons">check</i>
                </button>
            </div>
        </>
    )
}

export default InitPassword;