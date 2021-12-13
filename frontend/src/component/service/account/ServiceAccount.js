import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DateFormat from '../../../contents/js/DateFormat';

// Context
import { UserContext } from '../../../App';

// CSS
import '../../../contents/css/service/ServiceAccount.css';

const ServiceAccount = ({history}) => {
    console.log(history)
    // Context
    const {user} = useContext(UserContext);

    function logout() {
        if(!window.confirm("로그아웃 할까요?")) return;
        else history.push(`/${user._id}`);
    }

    return (
        <>
            <p>내 정보</p>
            <h2>{user.sname}</h2>
            <section>
                <h3>쇼핑몰 정보</h3>
                <ul>
                    <li>
                        <h4>쇼핑몰 주소</h4>
                        <p>{user.domain}</p>
                    </li>
                </ul>
                <h3>가입 정보</h3>
                <ul>
                    <li>
                        <h4>대표자 성명</h4>
                        <p>{user.info.ceo}</p>
                    </li>
                    <li>
                        <h4>연락처</h4>
                        <p>{user.info.tel}</p>
                    </li>
                    <li>
                        <h4>이메일</h4>
                        <p>{user.info.email}</p>
                    </li>
                    <li>
                        <h4>가입 날짜</h4>
                        <p>{DateFormat.transformDate(user.reg_date)}</p>
                    </li>
                    {
                        user.info?.reg_number ? (
                        <li>
                            <h4>사업자 번호</h4>
                            <p>{user.info.reg_number}</p>
                        </li>
                        ) : null
                    }
                    {
                        user.info?.address ? (
                        <li>
                            <h4>사업자 주소지</h4>
                            <p>{user.info.address}</p>
                        </li>
                        ) : null
                    }
                </ul>
                
            </section>
            <Link to="/service/account/edit">
                <p>내 정보 변경</p>
                <i className="material-icons">chevron_right</i>
            </Link>
            <Link to="/service/account/password">
                <p>비밀번호 변경</p>
                <i className="material-icons">chevron_right</i>
            </Link>
            <button className="logout" onClick={() => logout()}>
                <p>로그아웃</p>
                <i className="material-icons">chevron_right</i>
            </button>
        </>
    )
}
export default ServiceAccount;