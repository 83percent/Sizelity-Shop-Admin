import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import AccountModule from '../../contents/js/Account';

// Component
import ADEventMain from './Event/ADEventMain';
import ADPopupMain from './Popup/ADPopupMain';

// CSS
import '../../contents/css/ad/ADMain.css';

// Context
import { ServerContext } from '../../App';
export const ADUserContext = createContext(null);
const ADMain = () => {
    // State
    const [ADUser, setADUser] = useState(null);
    
    // Context
    const server = useContext(ServerContext);

    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);

    const event = {
        sumCredit : function ({credit=0, freetier=0}) {
            return credit + freetier;
        },
        sumPlan : function(data) {
            const result = Object.entries(data).reduce((acc,e) => {
                return acc += e[1];
            }, 0);
            return isFinite(result) ? result : 0;
        },
    }

    useEffect(() => {
        if(ADUser === null) {
            (async () => {
                const response = await accountModule.get();
                switch(response.type) {
                    case 'success' : {
                        setADUser({
                            pay : response.data.pay,
                            plan : response.data.plan
                        });
                        break;
                    }
                    case 'error' : {
                        window.alert("쇼핑몰 정보를 불러올 수 없습니다.");
                        break;
                    }
                    default : {
                        window.alert("쇼핑몰 정보를 불러올 수 없습니다.");
                    }
                }
            })();
        }
    }, [ADUser, accountModule])
    return (
        <section id="ad">
                {
                    ADUser ? (
                        <>
                        <article className="dashboard">
                            <header>
                                <h1>광고 관리</h1>
                            </header>
                            <section id="menu">
                                <div className="pay">
                                    <h2>충전 잔액</h2>
                                    <div className="money">
                                        <h3>{ADUser.pay.credit.toLocaleString()}</h3>
                                        <p>원</p>
                                    </div>
                                    <div>
                                        <Link to="/advertisement">
                                            <p>잔액 충전</p>
                                            <i className="material-icons">chevron_right</i>
                                        </Link>
                                    </div>
                                    
                                </div>
                                {
                                    ADUser.pay?.freetier ? (
                                        <div className="pay" id="freetier">
                                            <h2>프리티어 적용중<br/>남은 크레딧</h2>
                                            <div className="money">
                                                <h3>{ADUser.pay.freetier.toLocaleString()}</h3>
                                                <p>크레딧</p>
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <div className="plan">
                                    <h2>예산</h2>
                                    <ul>
                                        <li>
                                            <p>전체 잔액</p>
                                            <div className="money">
                                                <h3>{event.sumCredit(ADUser?.pay).toLocaleString()}</h3>
                                                <p>원</p>
                                            </div>
                                        </li>
                                        <li>
                                            <p>편성된 예산</p>
                                            <div className="money">
                                                <h3>{event.sumPlan(ADUser?.plan).toLocaleString()}</h3>
                                                <p>원</p>
                                            </div>
                                        </li>
                                        <li>
                                            <p>사용가능한 예산</p>
                                            <div className="money">
                                                <h3>{(event.sumCredit(ADUser?.pay)-event.sumPlan(ADUser?.plan)).toLocaleString()}</h3>
                                                <p>원</p>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <h2>목록</h2>
                                <ul>
                                    <li>
                                        <NavLink to="/advertisement/popup">
                                            <p>팝업 배너</p>
                                            <i className="material-icons">chevron_right</i>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/advertisement/event">
                                            <p>이벤트 상위 노출</p>
                                            <i className="material-icons">chevron_right</i>
                                        </NavLink>   
                                    </li>
                                </ul>
                            </section>
                        </article>
                        <div className="line"></div>
                        <ADUserContext.Provider value={{ADUser, setADUser}}>
                            <Switch>
                                <Route path="/advertisement/popup" component={ADPopupMain} />
                                <Route path="/advertisement/event" component={ADEventMain} />
                            </Switch>
                        </ADUserContext.Provider>
                        </>
                    ) : null
                }
                
        </section>
    )
}

export default ADMain;