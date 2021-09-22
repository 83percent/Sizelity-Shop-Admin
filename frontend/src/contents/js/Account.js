import axios from "axios"

export default class Account {
    constructor(server) {
        this.server = server;
    }
    async get() {
        return await axios({
            method : 'GET',
            url : `${this.server}/account`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type:'success', data : response.data};
            else return {type:'error', data: response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        });
    }
}

