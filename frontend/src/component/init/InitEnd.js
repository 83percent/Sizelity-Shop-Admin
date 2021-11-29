import axios from "axios";
import { Link } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState, useRef } from "react";

// Context
import { ServerContext, UserContext } from "../../App";

// CSS
import '../../contents/css/init/InitEnd.css';

const InitEnd = ({setting}) => {
    // State
    const [loader, setLoader] = useState(true);
    
    // Ref
    const resultWrapper = useRef(null);

    // Context
    const server = useContext(ServerContext);
    const { user, setUser } = useContext(UserContext);

    function anim() {
        const loaderFrame = resultWrapper.current.querySelector('.loader-frame')
        
        loaderFrame.classList.add("off");
        setTimeout(function() {
            setLoader(false);
            setTimeout(function() {
                resultWrapper.current.querySelector('.success-frame').classList.add("on");
            }, 200)
        }, 600);
    }

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
                _copyUser.status = 1;
                if(user) setUser(_copyUser);
                anim();
            }
        }).catch(error => {
            console.log(error);
            switch(error?.response?.status) {
                case 500 :
                default : {
                    //this.setCaution("서버에 문제가 발생했습니다.\n잠시 후 다시 시도 해주세요.")
                    break;
                }
            }
        })
    }, [server, setting]);
    useEffect(() => {
        send();
    }, [send])

    if(loader) {
        return (
            <>
                <article ref={resultWrapper}>
                    <div className="loader-frame">
                        <div className="loader"></div>
                        <p>설정한 내용을 적용중...</p>
                    </div>
                </article>
            </>
        )
    } else {
        return (
            <>
                <article ref={resultWrapper}>
                    <div className="success-frame">
                        <h1>적용 완료</h1>
                        <Link to="/home">
                            <p>홈으로</p>
                            <i className="material-icons">arrow_forward</i>
                        </Link>
                    </div>
                </article>
            </>
        )
    }
}

export default InitEnd;