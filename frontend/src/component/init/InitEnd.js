import axios from "axios";
import { useCallback, useContext, useEffect } from "react";

// Context
import { ServerContext, UserContext } from "../../App";

// CSS
import '../../contents/css/init/InitEnd.css';

const InitEnd = ({next, setting, goHome}) => {

    // Context
    const server = useContext(ServerContext);
    const { user, setUser } = useContext(UserContext);    

    const send = useCallback(async () => {
        await axios({
            method: 'POST',
            url : server + "/account/init",
            data : setting,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                const _copyUser = JSON.parse(JSON.stringify(user));
                _copyUser.state = 1;
                if(user){
                    setUser(_copyUser);
                    goHome();
                }
            }
        }).catch(error => {
            switch(error?.response?.status) {
                case 500 :
                default : {
                    window.alert("서버에 문제가 발생했습니다.\n잠시 후 다시 시도 해주세요.")
                    break;
                }
            }
        })
    }, [user, setUser, server, setting, goHome]);
    useEffect(() => {
        if(user?.state === 0) send();
    }, [user, send])

    return (
        <>
            <article>
                <div className="loader-frame">
                    <div className="loader"></div>
                    <p>설정한 내용을 적용중...</p>
                </div>
                <button onClick={() => next(-1)}>이전으로</button>
            </article>
        </>
    )
}

export default InitEnd;