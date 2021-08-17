import { createContext, useContext, useEffect, useState } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';

// Component
import ADProductMain from './ADProductMain';
import ADEventMain from './ADEventMain';
import ADPopupMain from './ADPopupMain';

// CSS
import '../../contents/css/ad/ADMain.css';

// Context
import { ServerContext } from '../../App';
export const ADUserContext = createContext(null);
const testData = {
    pay : {
        credit : 1730402,
        freetier : 200000.00
    },
    plan : {
        popup : 0,
        event : 0,
        product : 0
    }
}
const ADMain = () => {
    // State
    const [ADUser, setADUser] = useState(null);

    // Context
    const server = useContext(ServerContext);
    useEffect(() => {
        setADUser(testData);
    }, [server])
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
                                    <li>
                                        <NavLink to="/advertisement/product">
                                            <p>상품 추천</p>
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
                                <Route path="/advertisement/product" component={ADProductMain} />
                            </Switch>
                        </ADUserContext.Provider>
                        </>
                    ) : null
                }
                
        </section>
    )
}

export default ADMain;