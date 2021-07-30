import axios from 'axios';
import { useContext, useRef } from 'react';

// CSS
import '../contents/css/login/InitRouter.css';

// Context
import { ServerContext, UserContext } from '../App';


const InitRouter = ({history}) => {
    const { user } = useContext(UserContext);
    if(!user?.id || user?.status === 1) history.replace("/home");


    const server = useContext(ServerContext);
    // Ref
    const data = useRef({
        password : undefined,
        info : {
            ceo : undefined,
            tel: undefined,
            email: undefined,
            address : undefined,
            reg_number: undefined
        }
    });
    const cautionRef = useRef(null)
    const re_pwd = useRef(undefined);

    const event = {
        save : async function() {
            const {password, info} = data.current;
            const isPwd = ((value) => {
                return (/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(value);
            })(password);
            if(!isPwd) {
                this.setCaution("비밀번호 형식이 맞지 않습니다.")
                return;
            } else {
                if(re_pwd.current !== password) {
                    this.setCaution("비밀번호가 서로 일치하지 않습니다.")
                    return;
                }
            }
            if(!info.ceo || info.ceo.length < 2) {
                this.setCaution("대표자 명을 입력해주세요.");
                return;
            }
            if(info.tel < 9) {
                this.setCaution("전화번호는 9자리 이상 입력해주세요.");
                return;
            }
            const isEmail = ((value) => {
                return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
            })(info.email);
            if(!isEmail) {
                this.setCaution("이메일 형식이 맞지 않습니다.")
                return;
            }
            await axios({
                method: 'POST',
                url : server + "/account/init",
                data : data.current,
                withCredentials: true,
                timeout: 5500
            }).then(response => {
                if(response.status === 200) {
                    history.replace("/home", {status: 1});
                }
            }).catch(err => {
                switch(err?.response?.status) {
                    case 500 :
                    default : {
                        this.setCaution("잠시 후 다시 시도 해주세요.")
                        break;
                    }
                }
            })
        }, // save()
        setCaution : function(msg) {
            cautionRef.current.innerHTML = msg;
        }, // setCaution()
    }
    return (
        <main id="init">
            <header>
                <div>
                    <i className="material-icons">sell</i>
                </div>
                <h1>환영합니다.</h1>
                <p>원활한 서비스를 위해 기본 정보를 입력합니다.</p>
            </header>
            <article>
                <section className="password">
                    <h2>비밀번호 설정</h2>
                    <p>영문 대,소문자와 숫자 및 특수문자를 포함한 8~20자</p>
                    <h3>비밀번호 입력</h3>
                    <input type="password" onChange={(e) => data.current.password = e.target.value} />

                    <h3>비밀번호 확인</h3>
                    <input type="password" onChange={(e) => re_pwd.current = e.target.value} />
                </section>
                <section>
                    <h2>쇼핑몰 정보</h2>
                    <p>쇼핑몰 식별을 위한 정보를 입력합니다.</p>
                    <h3>대표자 명</h3>
                    <input type="text" onChange={(e) => data.current.info.ceo = e.target.value} />

                    <h3>연락가능한 연락처</h3>
                    <input type="number" placeholder="(-) 를 제외한 번호" onChange={(e) => data.current.info.tel = e.target.value} />

                    <h3>이메일</h3>
                    <input type="email" onChange={(e) => data.current.info.email = e.target.value} />

                    <h3>쇼핑몰 주소지</h3>
                    <input type="text" onChange={(e) => data.current.info.address = e.target.value} />

                    <h3>사업자 번호</h3>
                    <input type="text" onChange={(e) => data.current.info.reg_number = e.target.value} />
                    
                </section>
                <p ref={cautionRef}></p>
                <button onClick={() => event.save()}>시작하기</button>
            </article>
            <footer>

            </footer>
        </main>
    )
}
export default InitRouter;