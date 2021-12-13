const SAVE_LOCAL_NAME = 'Sizelity_Account_List';

function setAccount(id, sname) {
    if(!id && !sname) return false;

    try {
        const accounts = getAccounts();
        if(!accounts) {
            localStorage.setItem(SAVE_LOCAL_NAME, JSON.stringify([{id, sname}]))
        } else {
            let exist = (() => {
                let _r = false;
                for(let account of accounts) {
                    if(id === account.id) {
                        _r = true;
                        break;
                    }
                }

                return _r;
            })();

            if(exist) return true;
            else {
                if(accounts.length > 5) {
                    accounts.shift();
                }
                accounts.push({id, sname});
                localStorage.setItem(SAVE_LOCAL_NAME, JSON.stringify(accounts));
            }
            
        }
        return true;
    } catch {
        return false;
    }
}
function getAccounts() {
    return JSON.parse(localStorage.getItem(SAVE_LOCAL_NAME));
}
function removeAccount(index, id) {
    const accounts = getAccounts();
    try {
        if(accounts[index].id !== id) {
            // 일치하지 않아 index 값 찾아줘야함
            let i;
            for(i in accounts) {
                if(accounts[i].id === id) break;
            }
            if(index === i) {
                // index  못찾음
                return false;
            } else index = i;
        }
        accounts.splice(index, 1);
        localStorage.setItem(SAVE_LOCAL_NAME, JSON.stringify(accounts));
        return true;
    } catch {
        return false;
    }
}
export default {
    getAccounts,
    setAccount,
    removeAccount
}