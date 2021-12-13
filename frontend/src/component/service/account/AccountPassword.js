import { useContext, useRef } from "react";
import AccountModule from '../../../contents/js/account/Account';

// Context
import { UserContext, ServerContext } from "../../../App";


const AccountPassword = ({history}) => {
    // Ref
    const password_ref = useRef(null);

    // Context
    const { user } = useContext(UserContext);
    const server = useContext(ServerContext);

    console.log(user);

    async function chpwd() {
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

        const response = await new AccountModule(server).changePwd({oldPwd : inputs[0].value, newPwd: inputs[1].value});
        switch(response.type) {
            case 'success' : {
                window.alert("비밀번호가 변경되었습니다.\n다시 로그인 해주세요.");
                history.replace(`/${user._id}`);
                break;
            }
            case 'error' : 
            default : {
                window.alert(response.msg || "문제가 발생하여 비밀번호 변경에 실패했습니다.")
            }
        }
    }
    function cancel() {
        if(!window.confirm("비밀번호 변경을 취소 할까요?")) return;
        else history.goBack();
    }
    return (
        <>
            <p>비밀번호 변경</p>
            <h2>{user.sname}</h2>
            <section ref={password_ref}>
                <ul>
                    <li>
                        <h4>기존 비밀번호</h4>
                        <input type="password" name="old_pw"/>
                    </li>
                </ul>
                <h3>변경할 비밀번호</h3>
                <ul>
                    <li>
                        <h4>새 비밀번호</h4>
                        <input type="password" name="new_pw"/>
                    </li>
                    <li>
                        <h4>새 비밀번호 확인</h4>
                        <input type="password" name="re_pw"/>
                    </li>
                </ul>
                <p>비밀번호는 영문 대,소문자와 숫자 및 특수문자를 포함한 8~20자</p>
            </section>
            <div className="button-frame">
                <button className="edit" onClick={() => chpwd()}>변경</button>
                <button className="cancel" onClick={() => cancel()}>취소</button>
            </div>
        </>
    )
}

export default AccountPassword;