import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';

// CSS
import '../contents/css/login/LoginRouter.css';

// Context
import { ServerContext, UserContext } from '../App';
const LoginRouter = ({history, match}) => {
    // Ref
    const cautionRef = useRef(null);
    const inputRef = useRef(null);

    // Context
    const server = useContext(ServerContext)
    const { setUser } = useContext(UserContext);

    // Field
    const __id = match.params.id;
    if(__id.length < 20) history.replace("/wrong");
    

    const event = {
        login : async function(password) {
            if(password < 8) {
                this.setCaution("비밀번호 8자리 이상 입력해주세요.");
                return;
            }
            await axios({
                method: 'POST',
                data : {
                    username : __id,
                    password : password
                },
                url: server + "/login",
                withCredentials: true,
                timeout: 3500
            }).then(response => {
                if(response.status === 200) {
                    setUser({id: response.data._id, sname: response.data.sname, status: response.data.state, domain: response.data.domain});
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
    useEffect(() => {
        const article = document.querySelector('article');
        setTimeout(() => {
            if(article) {
                article.classList.add("on");
                setTimeout(() => {
                    article.classList.add("move");
                }, 1000);
            }
        }, 1000);
    })
    return (
        <main id="login">
            <article>
                <i className="material-icons">sell</i>
                <h1>반가워요!</h1>
            </article>
            <section>
                <div>
                    <label className="input">
                        <p>비밀번호</p>
                        <input type="password" ref={inputRef} onKeyUp={(e) => {if(e.key === 'Enter') event.login(e.target.value)}}/>
                    </label>
                    <button onClick={() => event.login(inputRef.current.value)}>로그인</button>
                    <p ref={cautionRef}></p>
                    <a href="http://pf.kakao.com/_xfvrYs/chat" target="_blank" rel="noreferrer" title="파트너 채널">도움이 필요한가요?</a>
                </div>
            </section>
            {/* <header>
                <div>
                    <i className="material-icons">sell</i>
                </div>
            </header>
            <article>
                <label className="input">
                    <p>비밀번호</p>
                    <input type="password" ref={inputRef} onKeyUp={(e) => {if(e.key === 'Enter') event.login(e.target.value)}}/>
                </label>
                <button onClick={() => event.login(inputRef.current.value)}>로그인</button>
                <p ref={cautionRef}></p>
            </article>
            <footer>
                <a href="http://pf.kakao.com/_xfvrYs/chat" target="_blank" title="파트너 채널">도움이 필요한가요?</a>
            </footer> */}
        </main>
    )
}
export default LoginRouter;