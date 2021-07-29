import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';

// Context
import { ServerContext } from '../../App';

// CSS
import '../../contents/css/account/Account.css';
import '../../contents/css/account/AccountMain.css';

const AccountMain = ({history}) => {
    const [loader, setLoader] = useState(true);
    const data = useRef(null);
    console.log(data);
    const server = useContext(ServerContext);

    const event = {
        toggleWrapper : function(target) {
            for(let i=0; i<4; i++) {
                if(target.classList.contains("info-wrapper")) break;
                else target = target.parentElement;
            }
            console.log(target)
            if(!target.classList.contains("info-wrapper")) return;
            
            target.classList.toggle("on");
        }, // toggleWrapper(target)
    } // event
    useEffect(() => {
        if(data.current === null && loader === true)
        axios({
            method: 'GET',
            url: server + '/account',
            withCredentials: true,
            timeout: 4500
        }).then(response => {
            if(response.status === 200) data.current = response.data;
        }).catch(err => {
            switch(err?.response?.status) {
                case 401 : {
                    window.alert("로그인 후 이용가능 합니다.");
                    history.replace("/")
                    break;
                }
                case 404 :
                case 500 :
                default : {
                    window.alert("문제가 발생헀습니다.");
                }
            }
        }).finally(() => {
            setTimeout(() => {setLoader(false);},500);
        });
    }, [server, history, data, loader]);
    if(loader) {
        return (
            <div className="loader-frame">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <section id="account-main">
                <div className="title">
                    <h1>가입정보</h1>
                </div>
                <div className="info-wrapper">
                    <div onClick={(e) => event.toggleWrapper(e.target)}>
                        <h2>쇼핑몰 정보</h2>
                        <i className="material-icons">expand_more</i>
                    </div>
                    <ul>
                        <li>
                            <p>쇼핑몰 명 : {data.current.sname}</p>
                        </li>
                        <li>
                            <p>쇼핑몰 주소 : {data.current.domain}</p>
                        </li>
                        <li>
                            <p>사업자 번호 : {data.current?.info?.reg_number}</p>
                        </li>
                    </ul>
                </div><div className="info-wrapper">
                    <div onClick={(e) => event.toggleWrapper(e.target)}>
                        <h2>가입 정보</h2>
                        <i className="material-icons">expand_more</i>
                    </div>
                    <ul>
                        <li>
                            <p>대표자 명 : {data.current?.info?.ceo}</p>
                        </li>
                        <li>
                            <p>연락처 : {data.current?.info?.tel}</p>
                        </li>
                        <li>
                            <p>이메일 : {data.current?.info?.email}</p>
                        </li>
                        <li>
                            <p>가입날짜 : {new Date(data.current.reg_date).toString()}</p>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
    
}
export default AccountMain;
