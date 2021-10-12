import axios from "axios";

class Notice {
    constructor(server) {
        this.server = server;
    }
    getList(count) {
        return axios({
            method: 'GET',
            url: `${this.server}/notice/list/${count}`,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data};
            else return {type: 'error', msg: "서버에 문제가 발생했습니다."};
        }).catch(error => {
            if(error?.response?.data?.error) return {type: 'error', msg: error.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."};
        });
    }

    getDetail(id) {
        return axios({
            method: 'GET',
            url: `${this.server}/notice/detail/${id}`,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data: response.data};
            else return {type: 'error', msg: "서버에 문제가 발생했습니다."};
        }).catch(error => {
            if(error?.response?.data?.error) return {type: 'error', msg: error.response.data.error};
            else return {type: 'error', msg: "네트워크 연결을 확인하세요."};
        });
    }
}

export default Notice;