import AccountModule from '../../contents/js/account/Account';
import { useContext, useMemo, useRef } from 'react';

// COntext
import { ServerContext } from '../../App';

// CSS
import '../../contents/css/account/AccountEdit.css';

const AccountEdit = ({history, location}) => {
    // Field
    const shopInfo = location.state.shopInfo;

    // Ref
    const password_ref = useRef(null);
    const info_ref = useRef(null);

    // Context
    const server = useContext(ServerContext);
    
    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);

    // Event
    const event = {
        chpwd : async function() {
            if(!window.confirm("비밀번호를 변경할까요?")) return;
            const isPwd = function(value) {
                return (/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(value);
            };

            const inputs = password_ref.current.querySelectorAll('input[type="password"]');

            let pass = true;
            for(let input of inputs) {
                let len = input?.value?.length || 0;
                if(len < 8 || len > 20) {
                    window.alert("비밀번호는 8 ~ 20자리가 필요합니다.");
                    pass = false;
                    break;
                }
                else if(!isPwd(input.value)) {
                    window.alert("비밀번호 형식이 올바르지 않습니다.");
                    pass = false;
                    break;
                }
            }
            if(!pass) return;
            if(inputs[1].value !== inputs[2].value) return window.alert("새 비밀번호가 서로 일치하지 않습니다.");

            const response = await accountModule.changePwd({oldPwd : inputs[0].value, newPwd: inputs[1].value});
            switch(response.type) {
                case 'success' : {
                    window.alert("비밀번호가 변경되었습니다.");
                    history.replace('/home');
                    break;
                }
                case 'error' : 
                default : {
                    window.alert(response.msg || "문제가 발생하여 비밀번호 변경에 실패했습니다.")
                }
            }
        }, // chpwd()
        chInfo : async function() {
            if(!window.confirm("가입정보를 수정할까요?")) return;

            const editData = {};
            const inputs = info_ref.current.querySelectorAll("input");
            for(let input of inputs) {
                if(input.value) {
                    editData[input.name] = input.value;
                }
            }
            if(editData.ceo?.length < 2 || editData.ceo?.length > 20) return window.alert("대표자 이름은 2~20자가 필요합니다.");
            if(editData.tel.length < 8 || editData.tel.length > 30) return window.alert("연락처는 8~30자가 필요합니다.");
            if(editData?.email) {
                if(editData.email?.length < 5 || editData.email?.length > 50) return window.alert("이메일은 5~50자가 필요합니다.");
                const isEmail = ((value) => {
                    return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
                })(editData.email);
                if(!isEmail) return window.alert("이메일 형식이 일치하지 않습니다.");
            }
            if(editData.address?.length < 10 || editData.address?.length < 50) return window.alert("사업자 번호는 10~50자가 필요합니다.");
            if(editData.reg_number?.length < 5 || editData.reg_number?.length < 30) return window.alert("사업자 번호는 5~30자가 필요합니다.");
            
            const response = await accountModule.changeInfo(editData);

            switch(response.type) {
                case 'success' : {
                    window.alert("가입정보가 변경되었습니다.");
                    history.replace('/home');
                    break;
                }
                case 'error' : 
                default : {
                    window.alert(response.msg || "문제가 발생하여 가입정보 변경에 실패했습니다.")
                }
            }

        }, // chInfo()
    }; 


    if(!shopInfo) {
        return (
            <main id="account" className="edit">
                <h1>잘못된 접근입니다.</h1>
            </main>
        )
    } else {
        return (
            <main id="account" className="edit">
                <header>
                    <h1>가업정보 수정</h1>
                </header>
                <div>
                    <section>
                        <h2>비밀번호 변경</h2>
                        <div>
                            <ul ref={password_ref}>
                                <li>
                                    <h3>기존 비밀번호</h3>
                                    <input type="password" name="old_pw"/>
                                </li>
                                <li>
                                    <h3>새 비밀번호</h3>
                                    <input type="password" name="new_pw"/>
                                </li>
                                <li>
                                    <h3>새 비밀번호 재입력</h3>
                                    <input type="password" name="re_pw"/>
                                </li>
                            </ul>
                            <p>비밀번호는 영문 대,소문자와 숫자 및 특수문자를 포함한 8~20자</p>
                            <p>'비밀번호 분실 시' 카카오톡 플러스친구 @sizelity 에 문의 해주세요.</p>
                            <a href="http://pf.kakao.com/_xfvrYs">문의하기.</a>
                        </div>
                        <div className="btn-frame">
                            <button onClick={() => event.chpwd()}>비밀번호 변경</button>
                        </div>
                    </section>
                    <section>
                        <h2>쇼핑몰 정보 변경</h2>
                        <div>
                            <ul>
                                <li>
                                    <h3>쇼핑몰 명</h3>
                                    <input
                                        type="text"
                                        defaultValue={shopInfo.sname}
                                        disabled="on"/>
                                </li>
                                <li>
                                    <h3>쇼핑몰 주소</h3>
                                    <input
                                        type="text"
                                        defaultValue={shopInfo.domain}
                                        disabled="on"/>
                                </li>
                            </ul>
                            <p>'쇼핑몰 명' 또는 '쇼핑몰 주소' 변경은 카카오톡 플러스친구 @sizelity 에 문의 해주세요.</p>
                            <a href="http://pf.kakao.com/_xfvrYs">문의하기.</a>
                        </div>
                        <div ref={info_ref}>
                            <ul>
                                <li>
                                    <h3>대표자 이름</h3>
                                    <input
                                        type="text"
                                        name="ceo"
                                        defaultValue={shopInfo?.info?.ceo}
                                        placeholder="ex) 장윤희"/>
                                </li>
                                <li>
                                    <h3>연락처</h3>
                                    <input
                                        type="text"
                                        name="tel"
                                        defaultValue={shopInfo?.info?.tel}
                                        placeholder="ex) 010XXXXXXXX"/>
                                </li>
                                <li>
                                    <h3>이메일</h3>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={shopInfo?.info?.email}
                                        placeholder="ex) example@email.xyz"/>
                                </li>
                                <li>
                                    <h3>사업지 주소</h3>
                                    <input
                                        type="text"
                                        name="address"
                                        defaultValue={shopInfo?.info?.address}
                                        placeholder="ex) 서울시 XXX XXX XXX"/>
                                </li>
                                <li>
                                    <h3>사업자 번호</h3>
                                    <input
                                        type="text"
                                        name="reg_number"
                                        defaultValue={shopInfo?.info?.reg_number}
                                        placeholder="ex) XXX-XXX-XXXXX"/>
                                </li>
                            </ul>
                        </div>
                        <div className="btn-frame">
                            <button onClick={() => event.chInfo()}>쇼핑몰 정보 변경</button>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}

export default AccountEdit;