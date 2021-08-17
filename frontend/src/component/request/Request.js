import { useCallback, useContext, useEffect, useState } from 'react';
import RequestModule from '../../contents/js/RequestModule';

// Context
import { ServerContext } from '../../App';

// CSS
import '../../contents/css/request/Request.css';

let requestModule = null;
const Request = ({history}) => {
    // State
    const [data, setData] = useState(null);
    // Context
    const server = useContext(ServerContext);

    const getData = useCallback( async (count) => {
        if(!requestModule) requestModule = new RequestModule(server);
        const response = await requestModule.get(count);
        switch(response?.type) {
            case 'success' : {
                setData(response.data);
                break;
            }
            case 'error' : {
                window.alert(response.msg);
                break;
            }
            case 'auth' : {
                window.alert("로그인 후 이용해주세요.");
                    break;
            }
            default : {
                break;
            }
        }
    }, [server]);


    const event = {
        delete : async function(index, id) {
            if(!window.confirm("요청을 삭제하겠습니까?")) return;
            if(!requestModule) requestModule = new RequestModule(server);
            const response = await requestModule.remove(id);
            switch(response) {
                case 200 : {
                    setData(data.filter((_, i) => i !== index));        
                    break;
                }
                case 0 : {
                    window.alert("인터넷 연결을 확인하세요.");
                    break;
                }
                case 401 : {
                    window.alert("로그인 후 이용해주세요.");
                    history.replace("/");
                    break;
                }
                case 400 :
                case 500 :
                default : {
                    window.alert("문제가 발생했습니다. \n 잠시후 시도해주세요.");
                }
                
            }
            
        }, // delete(index, id)
        add : function(url) {
            history.push({
                pathname: '/product/add',
                state : {
                    url : `http://${url}`
                }
            })
        },
        open : function(url) {
            if(!window.confirm("요청 주소를 열겠습니까?")) return;
            
            window.open(`http://${url}`);
        }
    }

    useEffect(() => {
        if(data === null) {
            getData(0)
        }
    }, [data, getData])
    return (
        <section id="request">
            <header>
                <h1>요청 상품</h1>
                <p>Sizelity 사용자가 사이즈 비교를 위해 검색하였지만</p>
                <p>상품에 대한 정보가 없어서 이용하지 못했던 기록이에요.</p>
                <p>원활한 이용을 위해 상품 정보를 입력해주세요.</p>
            </header>
            <article>
                <ul>
                    <li>
                        <p style={{fontWeight : "bold"}}>no.</p>
                        <h3 style={{textAlign: "center",fontWeight : "bold", fontSize : "1.1rem"}}>요청 주소</h3>
                        <div style={{fontWeight : "bold"}}>옵션</div>
                    </li>
                    {
                        data?.map((element, index) => (
                            <li key={index}>
                                <p>{index+1}</p>
                                <h3>
                                    <p onClick={() => event.open(element.full)}>{element.full}</p>
                                </h3>
                                <div>
                                    <button title="상품 추가" onClick={() => event.add(element.full)}>
                                        <i className="material-icons">add</i>
                                    </button>
                                    <button title="요청 확인" onClick={() => event.open(element.full)}>
                                        <i className="material-icons">open_in_new</i>
                                    </button>
                                    <button title="요청 삭제" onClick={() => event.delete(index, element._id)}>
                                        <i className="material-icons">close</i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </article>
        </section>
    )
}
export default Request;