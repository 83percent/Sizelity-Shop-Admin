import axios from "axios";

export default class RequestModule {
    constructor(server) {
        this.server = server;
    }
    async get(count) {
        return await axios({
            method: 'GET',
            url: `${this.server}/request/${count}`,
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) return {type: 'success', data : response.data};
            else return {type: "error", msg : "문제가 발생했습니다."};
        }).catch(err => {
            switch(err?.response?.status) {
                case 401 : {
                    return {type: "auth"};
                }
                case 500 : {
                    return {type: "error", msg : "문제가 발생했습니다."};
                }
                default : {
                    return {type: "error", msg : "네트워크 연결을 확인해주세요."};
                }
            }
            
            
        })
    }
    async remove(requestID) {
        return await axios({
            method: 'DELETE',
            url : `${this.server}/request`,
            data : {requestID},
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                return 200;
            }
        }).catch(err => {
            if(err?.response?.status) return err.response.status;
            else return 0
        });
    }
}