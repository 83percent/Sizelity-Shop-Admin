import { useRef, useState } from "react"
import SaveAccount from '../../contents/js/account/SaveAccount';


const InputID = ({history}) => {
    // State
    const [accounts, setAccounts] = useState(SaveAccount.getAccounts());

    // Ref
    const inputRef = useRef(null);
    const cautionRef = useRef(null);

    const event = {
        login : function(value) {
            if(value.length < 20) this.setCaution("잘못된 아이디 입니다.");
            else history.push(`/${value}`)
        },
        setCaution : function(text) {
            cautionRef.current.innerHTML = text;
        },
        removeAccount: function(index, id) {
            if(!window.confirm("로그인 기록을 삭제할까요?")) return;
            
            if(SaveAccount.removeAccount(index,id)) {
                setAccounts(SaveAccount.getAccounts());   
            } else {
                window.alert("문제가 발생하여 모든 로그인 기록을 삭제합니다.");
                setAccounts(null);
            }
        }
    }


    return (
        <div>
            <label>
                <p>아이디</p>
                <input type="text" ref={inputRef} onKeyUp={(e) => {if(e.key === 'Enter') event.login(e.target.value)}}/>
            </label>
            <button onClick={() => event.login(inputRef.current.value)}>로그인</button>
            <p ref={cautionRef}></p>
            {
                !accounts || accounts?.length === 0 ? null : (
                    <article>
                        <p>최근 로그인</p>
                        <ul>
                        {
                            accounts.map((element, index) => (
                                <li key={index}>
                                    <div onClick={() => event.login(element.id)}>
                                        <h4>{element.sname}</h4>
                                        <i className="material-icons">chevron_right</i>

                                    </div>
                                    <button onClick={() => event.removeAccount(index, element.id)}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </li>
                            ))
                        }
                        </ul>
                    </article>
                )
            }
        </div>
    )
}
export default InputID;