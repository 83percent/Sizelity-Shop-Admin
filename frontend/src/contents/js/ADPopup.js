import axios from 'axios';

export default class ADPopup {
    constructor(server) {
        this.server = server;
    }
    async init() {

    }
    async getAll() {
        return await axios({
            method : 'GET',
            url : `${this.server}/popup`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data}
            
        }).catch(err => {

        });
    }
    
    async set(data) {
        return await axios({
            method: 'POST',
            url : `${this.server}/popup`,
            withCredentials: true,
            data : data,
            headers : {"Content-Type": "multipart/form-data"},
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type : 'success', data: response.data};
            else return {type: 'error', msg : response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        })
    }
}