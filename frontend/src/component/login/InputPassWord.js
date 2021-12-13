import axios from 'axios';  
import { useContext, useRef } from "react";
import SaveAccount from '../../contents/js/account/SaveAccount';

// Context
import { ServerContext, UserContext } from "../../App";
import { Link } from 'react-router-dom';


const InputPassword = ({history, id}) => {
    // Ref
    const inputRef = useRef(null);
    const cautionRef = useRef(null);

    // Context
    const server = useContext(ServerContext);
    const { setUser } = useContext(UserContext);


    const event = {
        login : async function(password) {
            if(password < 8) {
                this.setCaution("비밀번호 8자리 이상 입력해주세요.");
                return;
            }
            await axios({
                method: 'POST',
                data : {
                    username : id,
                    password : password
                },
                url: server + "/login",
                withCredentials: true,
                timeout: 3500
            }).then(response => {
                if(response.status === 200) {
                    SaveAccount.setAccount(id, response.data?.sname);
                    setUser(response.data);
                    history.replace("/home");
                } else {
                    this.setCaution("문제가 발생했습니다.");
                }
            }).catch(err => {
                switch(err?.response?.status) {
                    case 401 : {
                        this.setCaution("아이디 또는 비밀번호를 확인해주세요.");
                        break;
                    }
                    case 500 :
                    default : {
                        this.setCaution("잠시 후 다시 시도해주세요.")
                        break;
                    }
                }
            })
        }, // login(password)
        setCaution : function(text) {
            cautionRef.current.innerHTML = text;
        }
    }

    return (
        <div>
            <label className="input">
                <p>비밀번호</p>
                <input type="password" ref={inputRef} onKeyUp={(e) => {if(e.key === 'Enter') event.login(e.target.value)}}/>
            </label>
            <button onClick={() => event.login(inputRef.current.value)}>로그인</button>
            <p ref={cautionRef}></p>
            <Link to="/">아아디 입력하기</Link>
            <a href="http://pf.kakao.com/_xfvrYs/chat" target="_blank" rel="noreferrer" title="파트너 채널">도움이 필요한가요?</a>
        </div>
    )
}
export default InputPassword;