import axios from "axios"

export default class Account {
    constructor(server) {
        this.server = server;
    }
    get() {
        return axios({
            method : 'GET',
            url : `${this.server}/account`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type:'success', data : response.data};
            else if(response.status === 204) return {type: 'error' , msg: '회원 정보를 찾을 수 없습니다.'};
            else return {type:'error', data: response.data?.error};
        }).catch(err => {
            if(err?.response?.status)  return {type: 'error', msg : err?.response?.data?.error};
            else return {type: 'error', msg : '네트워크 연결을 확인해주세요.'};
        });
    }

    changePwd({oldPwd, newPwd}) {
        return axios({
            method: 'POST',
            url: `${this.server}/account/chpwd`,
            data : {oldPwd, newPwd},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success'};
            else if(response.statsu === 204) return {type: 'error', msg : "가입정보를 찾을 수 없습니다."};
            else return {type: 'error', msg: '서버에 문제가 발생했습니다.'};
        }).catch(err => {
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'errpr', msg: '네트워크 연결을 확인하세요.'};
        });
    }
    changeInfo(data) {
        return axios({
            method: 'PATCH',
            url: `${this.server}/account`,
            data : {data},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success'};
            else if(response.statsu === 204) return {type: 'error', msg : "가입정보를 찾을 수 없습니다."};
            else return {type: 'error', msg: '서버에 문제가 발생했습니다.'};
        }).catch(err => {
            console.log(err.response);
            if(err?.response?.data?.error) return {type: 'error', msg: err.response.data.error};
            else return {type: 'errpr', msg: '네트워크 연결을 확인하세요.'};
        });
    }
}

