import { useCallback, useContext, useRef } from "react";
import AccountModule from '../../../contents/js/account/Account';


// Context
import { UserContext, ServerContext } from "../../../App";



const AccountEdit = ({history}) => {
    console.log(history)
    //Context
    const {user, setUser} = useContext(UserContext);
    const server = useContext(ServerContext);

    // Ref
    const editInputWrapper = useRef(null);

    const chInfo = useCallback(async () => {
        if(!window.confirm("내 정보를 변경할까요?")) return;

        const editData = {};
        const inputs = editInputWrapper.current.querySelectorAll("input");
        for(let input of inputs) {
            if(input.value) {
                editData[input.name] = input.value;
            }
        }
        
        if(!editData.ceo || editData.ceo?.length < 2 || editData.ceo?.length > 20) return window.alert("대표자 이름은 2~20자가 필요합니다.");
        if(!editData.tel || editData.tel.length < 8 || editData.tel.length > 30) return window.alert("연락처는 8~30자가 필요합니다.");
        if(!editData.email || editData.email?.length < 5 || editData.email?.length > 50) return window.alert("이메일은 5~50자가 필요합니다.");
        const isEmail = ((value) => {
            return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
        })(editData.email);
        if(!isEmail) return window.alert("이메일 형식이 일치하지 않습니다.");
        if(editData.reg_number?.length < 5 || editData.reg_number?.length < 30) return window.alert("사업자 번호는 5~30자가 필요합니다.");
        if(editData.address?.length < 10 || editData.address?.length < 50) return window.alert("사업자 주소자는 10~50자가 필요합니다.");

        const response = await new AccountModule(server).changeInfo(editData);

        switch(response.type) {
            case 'success' : {
                window.alert("내 정보가 변경되었습니다.");
                user.info = editData;
                setUser(user);
                history.goBack();
                break;
            }
            case 'error' : 
            default : {
                window.alert(response.msg || "문제가 발생하여 내 정보 변경에 실패했습니다.")
            }
        }
    }, [user, setUser,editInputWrapper, server, history]);

    function cancel() {
        if(!window.confirm("내 정보 변경을 취소 할까요?")) return;
        else history.goBack();
    }
    return (
        <>
            <p>내 정보 변경</p>
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
                <ul ref={editInputWrapper}>
                    <li>
                        <h4>대표자 성명</h4>
                        <input type="text" name="ceo" defaultValue={user.info.ceo} autoComplete="off" placeholder="(필수)"/>
                    </li>
                    <li>
                        <h4>연락처</h4>
                        <input type="number" name="tel" defaultValue={user.info.tel} autoComplete="off" placeholder="(필수)"/>

                    </li>
                    <li>
                        <h4>이메일</h4>
                        <input type="email" name="email" defaultValue={user.info.email} autoComplete="off" placeholder="(필수)"/>
                    </li>
                    <li>
                        <h4>사업자 번호</h4>
                        <input type="text" name="reg_number" defaultValue={user.info?.reg_number} autoComplete="off" placeholder="(선택)"/>
                    </li>
                    <li>
                        <h4>사업자 주소지</h4>
                        <input type="text" name="address" defaultValue={user.info?.address} autoComplete="off" placeholder="(선택)"/>
                    </li>
                </ul>
            </section>
            <div className="button-frame">
                <button className="edit" onClick={() => chInfo()}>변경</button>
                <button className="cancel" onClick={() => cancel()}>취소</button>
            </div>
        </>
    )
}
export default AccountEdit;