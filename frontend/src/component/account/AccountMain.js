import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AccountModule from '../../contents/js/account/Account';

// Context
import { ServerContext } from '../../App';

// CSS
import '../../contents/css/account/Account.css';
import '../../contents/css/account/AccountMain.css';

const AccountMain = ({history}) => {
    const [shopInfo, setShopInfo] = useState(undefined);
    const server = useContext(ServerContext);

    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);

    // Callback
    const getShopInfo = useCallback(async () => {
        const response = await accountModule.get();
        switch(response.type) {
            case 'success' : {
                setShopInfo(response.data);
                break;
            }
            case 'error' :
            default : {
                window.alert(response.msg || "문제가 발생했습니다.");
            }
        }
    }, [accountModule])

    const event = {
        toggleWrapper : function(target) {
            for(let i=0; i<4; i++) {
                if(target.classList.contains("info-wrapper")) {
                    target.classList.toggle("on");
                    break;
                } else target = target.parentElement;
            }
        }, // toggleWrapper(target)
        editShopInfo : function() {
            if(!shopInfo) return window.alert("로그인정보가 없어 가입정보를 수정할 수 없습니다.");
            if(!window.confirm("가입정보를 수정할까요?")) return;
            
            history.push("/account/edit", {shopInfo});
        }
    } // event



    useEffect(() => {
        if(shopInfo === undefined) {
            getShopInfo();
        }
    }, [shopInfo, getShopInfo]);
    if(shopInfo === undefined) {
        return (
            <div className="loader-frame">
                <div className="loader"></div>
            </div>
        )
    } else {
        if(shopInfo === null) {
            return (
                <section id="account-main">
                    <h1>로그인 정보를 불러오는데 실패했습니다.</h1>
                </section>
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
                                <p>쇼핑몰 명 : {shopInfo.sname}</p>
                            </li>
                            <li>
                                <p>쇼핑몰 주소 : {shopInfo.domain}</p>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="info-wrapper">
                        <div onClick={(e) => event.toggleWrapper(e.target)}>
                            <h2>가입 정보</h2>
                            <i className="material-icons">expand_more</i>
                        </div>
                        <ul>
                            <li>
                                <p>대표자 명 : {shopInfo?.info?.ceo}</p>
                            </li>
                            <li>
                                <p>연락처 : {shopInfo?.info?.tel}</p>
                            </li>
                            <li>
                                <p>이메일 : {shopInfo?.info?.email}</p>
                            </li>
                            <li>
                                <p>사업자 번호 : {shopInfo?.info?.reg_number}</p>
                            </li>
                            <li>
                                <p>사업지 주소: {shopInfo?.info?.address}</p>
                            </li>
                            <li>
                                <p>가입날짜 : {new Date(shopInfo.reg_date).toString()}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-frame">
                        <button onClick={() => event.editShopInfo()}>가입정보 수정</button>
                    </div>
                </section>
            )
        }
    }
}
export default AccountMain;
