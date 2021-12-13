import { useMemo } from "react";
import { Link } from 'react-router-dom';
// CSS
import '../../contents/css/connect/ConnectTestResult.css';

 const  ConnectResult = ({location}) => {
    const result = useMemo(() => location.state?.result, [location]);
    if(result) {
        return (
            <Success />
        )   
    } else {
        return (
            <Fail />
        )
    }
}



const Success = () => {
    return (
        <main id="connect" className="result">
            <header>
                <i className="material-icons">mood</i>
                <h1>지동연결을 지원하는 형식의 쇼핑몰입니다.</h1>
                <Link to="/connect/start">
                    <p>자동연결 시작하기</p>
                    <i className="material-icons">arrow_forward_ios</i>
                </Link>
            </header>
        </main>
    )
}

const Fail = () => {
    return (
        <main id="connect" className="result">
            <header>
                <i className="material-icons">mood_bad</i>
                <h1>아직 자동연결을 지원하지 않는 형식의 쇼핑몰이에요.</h1>
                <p>고객님의 쇼핑몰이 자동연결을 지원하게 되는 경우 바로 알려드릴게요</p>
                <Link to="/connect/other">
                    <p>다른 연결 방법 알아보기</p>
                    <i className="material-icons">arrow_forward_ios</i>
                </Link>
            </header>
        </main>
    )
}
export default ConnectResult;